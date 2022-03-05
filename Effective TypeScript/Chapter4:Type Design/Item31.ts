/** Item31: 将空值推到你的类型边界上，Push Null Values to The Perimeter of Your Types */

//Calculate the min and max of a list of numbers:
function extent(nums: number[]) {
  let min, max;
  for (const num of nums) {
    if (!min) {
      min = num;
    } else if (!max) {
      max = num;
    } else {
      min = Math.min(min, num);
      max = Math.max(max, num);
    }
  }

  return [min, max];
}

const range = extent([0, 1, 2]);
if (range) {
  const [min, max] = range;
  // const span = max - min;
}

//better solution:
function betterExtent(nums: number[]) {
  let result: [number, number] | null = null;

  for (const num of nums) {
    if (!result) {
      result = [num, num];
    } else {
      result = [Math.min(num, result[0]), Math.max(num, result[1])];
    }
  }

  return result;
}

const betterRange = betterExtent([0, 1, 2]);
if (betterRange) {
  const [betterMin, betterMax] = betterRange;
  const betterSpan = betterMax - betterMin;
}

//A class that represents both a user and their posts on a forum:
interface UserInfo {
  name: string;
}
interface Post {}
function fetchUser(userId: string): UserInfo | PromiseLike<UserInfo> {
  throw new Error('Function not implemented.');
}
function fetchPostsForUser(userId: string): Post[] | PromiseLike<Post[]> {
  throw new Error('Function not implemented.');
}

class UserPosts {
  user: UserInfo | null;
  posts: Post[] | null;

  constructor() {
    this.user = null;
    this.posts = null;
  }

  async init(userId: string) {
    return Promise.all([
      async () => (this.user = await fetchUser(userId)),
      async () => (this.posts = await fetchPostsForUser(userId)),
    ]);
  }

  getUserName() {}
}

//better solution:
class BetterUserPosts {
  user: UserInfo;
  posts: Post[];

  constructor(user: UserInfo, posts: Post[]) {
    this.user = user;
    this.posts = posts;
  }

  static async init(userId: string): Promise<BetterUserPosts> {
    const [posts, user] = await Promise.all([fetchUser(userId), fetchPostsForUser(userId)]);

    return new BetterUserPosts(posts, user);
  }

  getUserName() {
    return this.user.name;
  }
}

//Things to Remember
//• Avoid designs in which one value being null or not null is implicitly related to another value being null or not null.
//• Push null values to the perimeter of your API by making larger objects either
//null or fully non-null. This will make code clearer both for human readers and for the type checker.
//• Consider creating a fully non-null class and constructing it when all values are available.
//• While strictNullChecks may flag many issues in your code, it’s indispensable
//for surfacing the behavior of functions with respect to null values.
