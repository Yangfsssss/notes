// 引入css
import './style/style1.css';
import './style/style2.less';

import { sum } from './math';

const a = 10;
const b = 10;
console.log(sum(a, b));

Promise.resolve(3);

[1, 2, 3].includes(7);

// 增加，开启热更新之后的代码逻辑
// if (module.hot) {
//   module.hot.accept(['./math.ts'], function () {
//     const sum2 = sum(10, 20);
//     console.log('sum2 in hot', sum2);
//   });
// }

// ------------------------------------------------------

// import moment from 'moment';
// import 'moment/locale/zh-cn'; // 手动引入中文语言包
// moment.locale('zh-cn'); // 设置语言为中文
// console.log('locale', moment.locale());
// console.log('date', moment().format('ll')); // 2022年xx月xx日
