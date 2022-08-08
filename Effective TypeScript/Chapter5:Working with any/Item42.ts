/** Item42: 对未知类型的值使用unknown而不是any，Use unknown Instead of  any for Values with an Unknown Type */

// any:
//• Any type is assignable to the any type.
//• The any type is assignable to any other type.
// unknown:
//• Any type is assignable to unknown.
//• Unknown is only assignable to unknown and, of course, any
// never:
//• Can be assigned to any other type.
//• Nothing can be assigned to never

// {}:
//• Consists of all values except null and undefined.
// object:
//• Consists of all non-primitive types. This doesn’t include true or 12 or "foo" but does include objects and arrays.

//Things to Remember
//• The unknown type is a type-safe alternative to any. Use it when you know you have a value but do not know what its type is.
//• Use unknown to force your users to use a type assertion or do type checking.
//• Understand the difference between {}, object, and unknown.
