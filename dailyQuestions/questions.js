//第 162 题：实现对象的 Map 函数类似 Array.prototype.map

Object.prototype.map = function (callback, thisArg) {
  const obj = Object.assign({}, thisArg || this);

  const keysArray = Object.keys(thisArg || this);

  for (key of keysArray) {
    obj[key] = callback(obj[key], keysArray.indexOf(key));
  }

  return obj;
};


const obj1 = {
    key1:'value1',
    key2:'value2'
}

const obj2 = {
    anotherKey1:'anotherValue1',
    anotherKey2:'anotherValue2'
}

const result = obj1.map((item,index)=>item+'maped'+index,obj2)

console.log(result);

//----------------------------------------------------------------------------------------

