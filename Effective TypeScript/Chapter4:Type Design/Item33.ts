/** Item33: 选择更精确的字符串类型的替代类型，Prefer More Precise Alternatives To String Types */
interface Album {
  artist: string;
  title: string;
  releaseDate: Date;
  recordingType: 'studio' | 'live';
}

const albums: Album[] = [
  {
    artist: 'A',
    title: 'A',
    releaseDate: new Date(),
    recordingType: 'studio',
  },
  {
    artist: 'B',
    title: 'B',
    releaseDate: new Date(),
    recordingType: 'live',
  },
];

function pluck<T, K extends keyof T>(record: T[], key: K): T[K][] {
  return record.map((r) => r[key]);
}

const artist = pluck(albums, 'artist');
const title = pluck(albums, 'title');
const releaseDates = pluck(albums, 'releaseDate');
const recordingType = pluck(albums, 'recordingType');

//Things to Remember
//• Avoid “stringly typed” code. Prefer more appropriate types where not every string is a possibility.
//• Prefer a union of string literal types to string if that more accurately describes
//the domain of a variable. You’ll get stricter type checking and improve the development experience.
//• Prefer keyof T to string for function parameters that are expected to be properties of an object.
