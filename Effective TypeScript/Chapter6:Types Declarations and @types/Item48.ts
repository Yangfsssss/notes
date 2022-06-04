/** Item48: 使用TSDoc来编写API注释，Use TSDoc for API Comments*/

//TSDoc是使用Markdown进行格式化的：
/**
 * This _interface_ has **three** properties:
 * 1. x
 * 2. y
 * 3. z
 */
export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

/** A measurement performed at a time and place. */
interface Measurement {
  /** Where was the measurement made? */
  position: Vector3D;
  /** When was the measurement made? In seconds since epoch. */
  time: number;
  /** Observed momentum */
  momentum: Vector3D;
}

//尽量避免在你的文档中长篇大论：最好的注释是短小精悍的。

//JSDoc包含了一些用于特定类型信息的约定，避免使用它们，而使用TypeScript类型。

//Things to Remember
//使用JSDoc/TSDoc风格的注释来为导出的函数、类和类型生成文档。这有助于编辑器在遇到相关内容时为使用者提供信息。
//使用@param、@returns和Markdown进行格式化。
//避免在文档中包含类型信息。
