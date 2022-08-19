export function deepClone(obj:unknown|Record<keyof any,unknown>|unknown[]):typeof obj{
  if(typeof obj !== 'object'  || obj == null) return obj;

  let result:Record<keyof any,unknown>|unknown[];

  if(obj instanceof Array){
    result = [];
  } else {
    result = {};
  }

  for(const key in obj){
    // eslint-disable-next-line no-prototype-builtins
    if(obj.hasOwnProperty(key)){
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    result[key] = deepClone(obj[key]);
    }
  }

  return result;
}

