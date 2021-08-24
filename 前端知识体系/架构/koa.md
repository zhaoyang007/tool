##### koa

```js
const Koa = require('koa');
const app = new Koa();

app.listen(3000, () => {
	console.log('server is listening on http://localhost:3000');
});
```

##### koa-router

```js
const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
  ctx.type = 'html';
  ctx.body = '<h1>hello world!</h1>';
});

app.use(router.routes()).use(router.allowedMethods());
```

