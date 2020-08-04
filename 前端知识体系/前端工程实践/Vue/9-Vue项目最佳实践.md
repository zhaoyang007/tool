## 项目最佳实践

最佳实践有：代码规范，项目配置，权限，导航，数据 mock，环境变量，测试，优化、告警、发布和部署等。

Vue 社区里一个比较成功的项目 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)，里面有很多项目的最佳实践，做项目的方式，能够给我们提供一些做项目的特性和思路。



## 项目配置策略

在项目的根目录创建 vue.config.js，这里的代码时一些 nodejs 代码，最终导出一个配置对象，会被 vue-cli 去解析，并且在这里还可以和 webpack、devServer 去打交道。因为 vue-cli3 中我们不能直接接触到 webpack 了。

### 项目本身的基础配置：指定应用上下文、开发服务器等。

```js
const port = 7070;

module.exports = { 
  publicPath: '/best-practice', // 部署时的上下文路径，基本URL
  devServer: { 
    port,
  } 
};
```

### 基础的 webpack 配置： configureWebpack

底层是用了 webpack-merge 把我们在 configureWebpack 里的配置解析成 webpack 的配置项并且跟 vue-cli 原有的配置合并起来。所有的 webpack 的配置项在这里都是可以配置的。

```js
const title = "vue项目最佳实践"; 

module.exports = { 
  configureWebpack: { 
    name: title, // 向index.html注入标题
  } 
};
```

最终使用的是 lodash template 的插值语法，./public/index.html，webpack 打包的时候，会把我们设置的这些值动态的添加到这里。我们想要一些配置的环境变量就可以用这种方式做。

```html
<title><%= webpackConfig.name %></title>
```

### 高级的链式 webpack 配置：chainWebpack

webpack-chain 称为链式操作，可以更细粒度控制 webpack 内部配置。可以修改已经存在的配置，也可以添加新的配置。

查看当前 webpack 配置：vue inspect 输出全部配置，vue inspect --rule 输出所有 rule，vue inspect --rule svg 查看 svg 规则的具体配置。

```js
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

chainWebpack(config) {
  // 修改当前项目默认的svg配置：排除icons目录
  config.module.rule('svg')
    .exclude.add(resolve('./src/icons'))
	// 新增一个rule：用svg-sprite-loader处理icons里面的svg
  config.module.rule('icons')
    .test(/\.svg$/)
    .include.add(resolve('./src/icons')).end()
    .use('svg-sprite-loader')
    	.loader('svg-sprite-loader')
    	.options({ symbolId: 'icon-[name]' })

}
```



## 权限控制

页面权限：就是根据是否登录和用户角色信息来动态设置相应路由。

按钮权限。

导航菜单生成：导航菜单是根据路由信息并结合权限判断而动态生成的。它需要对应路由的多级嵌套，所以要用到递归组件。组件里面还使用了自己。

递归：自己里面调用自己，有条件跳出。



## 数据交互

axios 请求 => 本地 mock / 线上 mock / 服务器 api

### 封装 request

对 axios 做一次封装，统一处理配置、请求和响应拦截。

封装请求：@/utils/request.js

```js
import Axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";

// 创建axios实例
const axios = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url基础地址，解决不同数据源url变化问题。vue-cli3里就给我们加了一个模式的东西，我们可以利用模式配置一批环境变量，它可以根据当前环境的不同动态的切换，解决我们请求时的url的变化的问题，在根目录下创建一个叫.env.development的文件，这个文件就是模式，默认有三种模式development,production,test 分别对应在package.json里面的dev,build,test这三个命令，可以在这个模式文件中定义环境变量。也可以在打包命令中使用--mode xxx结合.env.xxx模式文件，就可以使用该文件中的配置了，其实这个就是一个环境变量的参数。
  // withCredentials: true, // 跨域时若要发送cookies需设置该选项
  timeout: 5000 // 超时
});

// 请求拦截，对请求头做一些处理，令牌的追加等
axios.interceptors.request.use(
  config => {
    // do something
    const token = localStorage.getItem('token')
    if (token) {
      // 设置令牌请求头
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    // 请求错误预处理
    //console.log(error) // for debug
    return Promise.reject(error);
  }
);

// 响应拦截，做一些错误处理
// 1.通过响应的状态判断请求成功与否，比如400,500
// 2.不管对错服务端都是以状态200返回，根据返回的code值判断请求是否成功
axios.interceptors.response.use(
  // 通过自定义code判定响应状态，也可以通过HTTP状态码判定
  response => {
    // 仅返回数据部分
    const res = response.data;

    // code不为1则判定为一个错误
    if (res.code !== 1) {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000
      });

      // 假设：10008-非法令牌; 10012-其他客户端已登录; 10014-令牌过期;
      if (res.code === 10008 || res.code === 10012 || res.code === 10014) {
        // 重新登录
        MessageBox.confirm(
          "登录状态异常，请重新登录",
          "确认登录信息",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    //console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default axios;
```

.env.development

```
# axios base api
VUE_APP_BASE_API = '/dev-api'
```

请求列表：@/api/user.js

```js
import axios from '@/utils/request'

export function login(data) {
  return axios.post('/user/login', data)
}

export function getInfo() {
  return axios.get('/user/info')
}
```

使用请求：@/store/user.js

```js
import {login, getInfo} from '@/api/user';

const actions = {
  // 模拟用户登录
  login({ commit }, userInfo) {
    return login(userInfo).then((res) => {
      
    });
  },
  getInfo({ commit, state }) {
    return getInfo(state.token).then(({data: roles}) => {
      
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
```

### 数据 mock

本地 mock：利用 webpack-dev-server 提供的 before 钩子可以访问 express 实例，从而定义接口。修改 vue.confifig.js，给 devServer 添加相关代码。本地 mock 的问题是需要了解 express，还有就是接口代码太多了。

线上 easy-mock：诸如 easy-mock 这类线上 mock 工具优点是使用简单，mock 工具库也比较强大，还能根据 swagger 规范生成接口。

### 解决跨域

添加开发服务器代理配置，vue.confifig.js



## 项目测试

单元测试

e2e 测试

组件测试