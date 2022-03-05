/** Item32: 优选接口的联合，而不是联合的接口，Prefer Unions of Interfaces to Interfaces of Unions */

//Things to Remember
//• Interfaces with multiple properties that are union types are often a mistake
//because they obscure the relationships between these properties.
//• Unions of interfaces are more precise and can be understood by TypeScript.
//• Consider adding a “tag” to your structure to facilitate TypeScript’s control flow
//analysis. Because they are so well supported, tagged unions are ubiquitous in TypeScript code.
