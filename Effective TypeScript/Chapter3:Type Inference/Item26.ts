/** Item26: 了解类型推断中如何使用上下文，Understand How Context Is Used in Type Inference*/

//see also Item21;
//Ways to narrowing the type inference:
//string:type declaration/const;
//tuple/object:type declaration/as const;
//callbacks:type annotations to the parameters/type declaration to the entire function expression;

//Things to Remember
//• Be aware of how context is used in type inference.
//• If factoring out a variable introduces a type error, consider adding a type declaration.
//• If the variable is truly a constant, use a const assertion (as const). But be aware that this may result in errors surfacing at use, rather than definition.
