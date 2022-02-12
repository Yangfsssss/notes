import { Key, pathToRegexp, TokensToRegexpOptions, ParseOptions } from 'path-to-regexp';
import { Match } from '../type';

type PathCache = {
  [key: string]: Record<
    string,
    {
      regexp?: RegExp;
      keys?: Key[];
    }
  >;
};

const cache: PathCache = {};
const cacheLimit = 10000;
let cacheCount = 0;

type CompilePathOptions = TokensToRegexpOptions & ParseOptions;

function compilePath(path: string, options: CompilePathOptions) {
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
  const pathCache = cache[cacheKey] || (cache[cacheKey] = {});

  if (pathCache[path]) return pathCache[path];

  const keys = [] as Key[];
  const regexp = pathToRegexp(path, keys, options);
  const result = { regexp, keys };

  if (cacheCount < cacheLimit) {
    pathCache[path] = result;
    cacheCount++;
  }

  return result;
}

type MatchPathOptions = {
  path?: string;
  exact?: boolean;
  strict?: boolean;
  sensitive?: boolean;
};

/**
 * Public API for matching a URL pathname to a path.
 */
function matchPath(pathname: string, options: MatchPathOptions = {}): Match | null {
  // if (typeof options === 'string' || Array.isArray(options)) {
  //   options = { path: options };
  // }

  const { path, exact = false, strict = false, sensitive = false } = options;

  const paths = [].concat(path);

  return paths.reduce((matched, path) => {
    if (!path && path !== '') return null;
    if (matched) return matched;

    const { regexp, keys } = compilePath(path, {
      end: exact,
      strict,
      sensitive,
    });
    const match = regexp.exec(pathname);

    if (!match) return null;

    const [url, ...values] = match;
    const isExact = pathname === url;

    if (exact && !isExact) return null;

    return {
      path, // the path used to match
      url: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
      isExact, // whether or not we matched exactly
      params: keys.reduce((memo: Record<string | number, string>, key, index) => {
        memo[key.name] = values[index];
        return memo;
      }, {}),
    };
  }, null);
}

export default matchPath;
