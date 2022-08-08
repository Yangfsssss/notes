/** Item51: 反映类型以切断依赖，Mirror Types to Sever Dependencies */

function parseCSV(contents: string | CsvBuffer): { [column: string]: string }[] {
  if (typeof contents === 'object') {
    return parseCSV(contents.toString('utf-8'));
  }

  return [] as { [column: string]: string }[];
}

//与其使用@types/node中的Buffer声明，不如自己写一个只包含你所需方法和属性的声明。
interface CsvBuffer {
  toString(encoding?: string): string;
}

parseCSV(new Buffer('column1,column2\nvalue1,value2', 'utf-8'));

//如果你的库只依赖于另一个库的类型，而不是它的实现，可以考虑只把你需要的声明反映到自己的代码中。
//这将在为你的TypeScript用户带来类似体验的同时，也为其他所有人带来更好的体验。

//如果你仅仅依赖一个库的实现，你可能仍然能够应用同样的技巧来避免依赖它的类型。
//但随着依赖变得越来越多、越来越重要，这种技巧就越来越困难。
//如果要从一个库中复制出很大一部分类型声明，你可能还是想通过明确的@types依赖来正式确定这种关系。

//这种技术也有助于切断单元测试和生产系统之间的依赖。参见Item4中的getAuthors事例。

//Things to Remember
//使用结构类型来切断非必要的依赖。
//不要强迫JavaScript用户依赖@types；不要强迫Web开发者依赖NodeJS。
