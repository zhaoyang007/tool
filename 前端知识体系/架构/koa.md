```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'hello world';
  ctx; // is the Context
  ctx.request; // is a koa Request
  ctx.response; // is a koa Response
});

app.listen(3000);
```

