##### koa-middleware

每收到一个 http 请求，koa 就会调用 `app.use()` 注册的 async 函数，并传入 `ctx` 和 `next` 参数。

每个 async 函数就是一个中间件，可以做一些自己的事情，然后用 `await next()` 来调用下一个 async 函数。

形成一个洋葱圈模式（顺序模式中的责任链模式）。形成切面，中间件之前和之后都可以做一些事情。

```js
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});
```

如果一个 middleware 没有调用 `await next()`，后续的 middleware 将不再执行。这种情况也很常见，例如，一个检测用户权限的 middleware 可以决定是否继续处理请求，还是直接返回 403 错误：

```js
app.use(async (ctx, next) => {
    if (await checkUserPermission(ctx)) {
        await next();
    } else {
        ctx.response.status = 403;
    }
});
```

##### koa-router

`koa-router` 这个 middleware，负责处理 URL 映射。

```js
const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();

router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});
router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');
```

处理 post 请求：

用 post 请求处理 URL 时，我们会遇到一个问题：post 请求通常会发送一个表单，或者 JSON，它作为 request 的 body 发送，但无论是 Node.js 提供的原始 request 对象，还是 koa 提供的 request 对象，都不提供解析 request 的 body 的功能！

所以，我们又需要引入另一个 middleware 来解析原始 request 请求，然后，把解析后的参数，绑定到 `ctx.request.body` 中。

##### koa-bodyparser

`koa-bodyparser ` 用于解析 post 请求的参数。

 `koa-bodyparser` 必须在使用 `router ` 之前注册。

```js
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());
```

由于 middleware 的顺序很重要，这个 `koa-bodyparser` 必须在 `router `之前被注册到 `app `对象上。

现在我们就可以处理 post 请求了。写一个简单的登录表单：

```js
router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    let name = ctx.request.body.name || '';
    let password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1><p><a href="/">Try again</a></p>`;
    }
});
```
