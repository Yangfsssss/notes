/** Item18: 使用映射类型来保持值的同步*/
//使用映射类型来保持相关值和类型的同步。
//在向接口添加新属性时，考虑使用映射类型强行选择。
interface ScatterProps {
  xs: number[];
  ys: number[];

  xRange: [number, number];
  yRange: [number, number];
  color: string;
  // size: number;

  onClick: (x: number, y: number, index: number) => void;
}

// function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
//   let k: keyof ScatterProps;

//   for (k in oldProps) {
//     if (oldProps[k] !== newProps[k]) {
//       if (k !== 'onClick') {
//         return true;
//       }
//     }

//     return false;
//   }
// }

// function shouldUpdate1(oldProps: ScatterProps, newProps: ScatterProps) {
//   return (
//     oldProps.xs !== newProps.xs ||
//     oldProps.ys !== newProps.ys ||
//     oldProps.xRange !== newProps.xRange ||
//     oldProps.yRange !== newProps.yRange ||
//     oldProps.color !== newProps.color
//   );
// }

const REQUIRES_UPDATE: { [k in keyof ScatterProps]: boolean } = {
  xs: true,
  ys: true,
  xRange: true,
  yRange: true,
  color: true,
  onClick: true,
};

function shouldUpdate2(oldProps: ScatterProps, newProps: ScatterProps) {
  let k: keyof ScatterProps;

  for (k in oldProps) {
    if (oldProps[k] !== newProps[k] && REQUIRES_UPDATE[k]) {
      return true;
    }
  }

  return false;
}

//Things to Remember
//• Use mapped types to keep related values and types synchronized.
//• Consider using mapped types to force choices when adding new properties to an interface.
