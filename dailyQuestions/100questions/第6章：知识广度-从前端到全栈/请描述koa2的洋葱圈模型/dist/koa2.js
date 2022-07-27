"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const app = new koa_1.default();
// logger
app.use(async (ctx, next) => {
    await next(); // 先执行下一步，下一步执行完再继续执行
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});
// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next(); // 先执行下一步，下一步执行完再继续执行
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});
// response
app.use(async (ctx) => {
    ctx.body = 'Hello World';
});
app.listen(3000);
