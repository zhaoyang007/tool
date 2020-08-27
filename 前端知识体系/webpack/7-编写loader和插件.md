## loader

编写 loader 的过程是比较简单的。

loader 是处理模块（文件）的。

loader 就是一个函数，而且是声明式函数，不能用箭头函数，因为它要使用 this 使用 loader 的 API。

loader 做的事情就是拿到源代码，作进⼀步的修饰处理，再返回处理后的源码就可以了。

### loader 的链式调用与执行顺讯

多个 loader 串行执行，顺序是从后到前。

一个 loader 处理完了 source 之后，把结果传递给下一个 loader，下一个 loader 接收上一个 loader 的结果作为它的输入去处理。

### 为什么是这样的顺序执行的

函数组合的两种情况：

* 类似 unix 中的 pipeline，这个顺序是从左往右

* Compose（webpack 采取的），这个顺序是从右往左

  ```js
  compose = (f, g) => (...args) => f(g(...args))
  ```

### 一个最简单的 loader 代码结构

定义：loader 只是一个导出为函数的 JavaScript 模块。意思是我们如果要写一个 loader，其实只需要写一个 JS 模块，然后把这个模块导出来就可以了。

最简单的一个 loader：

接受一个输入 source 当前的源码，输出是 return 一个 source 出来。这里什么都没有做，正常的情况下 loader 的作用就是，输入一串代码，经过 loader 处理，然后返回一个新代码。

```js
module.exports = function(source) {
	return source
}
```

### 使用 loader-runner 高效进行 loader 的调试

定义：loader-runner 允许你在不安装 webpack 的情况下运行 loaders。它给 loader 提供了一个独立的运行环境。

作用：作为 webpack 的依赖，webpack 中使用它执行 loader。高效快捷的进行 loader 的开发和调试。

loader-runner 的使用：

```js
import { runLoaders } from "loader-runner"; 
runLoaders({ 
  resource: “/abs/path/to/file.txt?query”, // String: 资源的绝对路径(可以增加查询字符串) 
  loaders: [“/abs/path/to/loader.js?query”], // String[]: loader 的绝对路径(可以增加查询字符串) 		
  context: { minimize: true }, // 基础上下文之外的额外 loader 上下文 
  readResource: fs.readFile.bind(fs) // 读取资源的函数 
}, function(err, result) { 
  // err: Error? 
  // result.result: Buffer | String 
})
```

### 开发一个 raw-loader

要开发一个 loader，首先要知道它的功能。

raw-loader 的功能是将一个文件的内容转换成一个 string。

loaders/raw-loader.js:

```js
module.exports = function(source) { 
  const json = JSON.stringify(source)
  	.replace(/\u2028/g, '\\u2028') // 为了安全起见, ES6模板字符串的问题 
    .replace(/\u2029/g, '\\u2029'); 
  
  return `export default ${json}`; 
};
```

src/demo.txt:

```txt
foobar
```

这个 loader 开发完成之后，需要看一下这个 loader 处理的结果有没有生效，功能是不是符合预期。

使用 loader-runner 调试 loader，在这里对 loader 的功能做一个运行。

run-loader.js:

```js
const fs = require("fs"); 
const path = require("path"); 
const { runLoaders } = require("loader-runner"); 

runLoaders( 
  { 
    resource: "./demo.txt", 
    loaders: [path.resolve(__dirname, "./loaders/raw-loader")], 
    readResource: fs.readFile.bind(fs), 
	}, 
  (err, result) => (err ? console.error(err) : console.log(result)) 
);
```

运行查看结果：

```bash
node run-loader.js
```

![raw-loader执行结果](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/webpack/raw-loader执行结果.png)

### 更复杂的 loader 开发场景

#### loader 的参数获取

传参是设置 loader 的时候，把要传的参数放到 options 对象里面。

loader 里通过 loader-utils 的 getOptions 方法获取传过来的参数。

raw-loader.js:

```js
const loaderUtils = require("loader-utils");

module.exports = function(source) { 
  const { name } = loaderUtils.getOptions(this);
  // console.log(name)
  
  const json = JSON.stringify(source)
  	.replace(/\u2028/g, '\\u2028') // 为了安全起见, ES6模板字符串的问题 
    .replace(/\u2029/g, '\\u2029'); 
  
  return `export default ${json}`; 
};
```

run-loader.js:

```js
const fs = require("fs"); 
const path = require("path"); 
const { runLoaders } = require("loader-runner"); 

runLoaders( 
  { 
    resource: "./demo.txt", 
    loaders: [
      {
      	loader: path.resolve(__dirname, "./loaders/raw-loader"),
        options: {
					name: 'test'
        }
      }
    ], 
    readResource: fs.readFile.bind(fs), 
	}, 
  (err, result) => (err ? console.error(err) : console.log(result)) 
);
```

#### loader 异常处理

同步的 loader 的异常处理有两种方式。

1.loader 内直接 throw 一个 Error 对象出来。

2.通过 this.callback 把错误传递出来

返回结果除了上面的直接 return 的方式，也可以使用 this.callback 来做结果的返回，它可以返回多个值。

raw-loader.js:

```js
module.exports = function(source) { 
  const json = JSON.stringify(source)
  	.replace(/\u2028/g, '\\u2028') // 为了安全起见, ES6模板字符串的问题 
    .replace(/\u2029/g, '\\u2029'); 
  
  // throw new Error('Error')
  
  // return `export default ${json}`; 
  this.callback(null, json, 2, 3, 4)
};
```

#### loader 的异步处理（开发一个异步的 loader）

同步 loader 对内容的处理是同步的，异步 loader 处理的任务是一个耗时的任务，它可能需要执行一段时间，比如文件的读写，我们要处理内容的时候要先去读取一个文件，获取到文件的值之后，再去对传递进来的 source 进行处理，这就是一个异步的任务。异步任务完成之后再返回结果。

针对异步处理的场景的做法也比较简单，通过 this,async 来返回一个异步函数 ，第一个参数是 Error，第二个参数是处理的结果，它的用法跟 this.callback 是差不多的。

async.txt

```txt
async
```

raw-loader.js:

```js
const path = require('path');
const fs = require('fs')

module.exports = function(source) { 
  const callback = this.async();
  
  const json = JSON.stringify(source)
  	.replace(/\u2028/g, '\\u2028') // 为了安全起见, ES6模板字符串的问题 
    .replace(/\u2029/g, '\\u2029'); 
  	
  fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data) => {
    if (err) {
      callback(err, '');
    }
    callback(null, data);
  });
  
};
```

#### 在 loader 中使用缓存 

webpack 中默认开启 loader 缓存，可以使用 this.cacheable(false) 关掉缓存。

缓存生效条件： loader 的结果在相同的输入下有确定的输出。

有依赖的 loader 无法使用缓存。

```js
module.exports = function(source) { 
  this.cacheable(false)
  
  const json = JSON.stringify(source)
  	.replace(/\u2028/g, '\\u2028') // 为了安全起见, ES6模板字符串的问题 
    .replace(/\u2029/g, '\\u2029'); 
  
  return `export default ${json}`; 
};
```

#### loader 如何进行文件输出？

通过 this.emitFile 把内容输出到指定的位置，进行文件写入。

a-loader.js:

```js
const loaderUtils = require("loader-utils");

module.exports = function(source) { 
  const url = loaderUtils.interpolateName(this, "[name].[ext]", { 
    source, 
  });
  console.log(url)
  
  this.emitFile(url, source);
  
  return source; 
};
```

### 实战开发一个自动合成雪碧图的 loader

雪碧图在日常开发中使用的非常广泛，它是我们小图片的请求尽量的减少，平时使用雪碧图可能是从网上找一个在线的工具，将多张图片合成一个雪碧图，我们可以通过构建工具让这个事情更加的自动化，我们可以开发一个雪碧图的 loader。

#### 支持的语法：

background: url('a.png?__sprite')

​                                           						           -----》						background: url('sprite.png')

background: url('b.png?__sprite')

#### 准备知识：如何将两张图片合成一张图片？

使用 spritesmith (https://www.npmjs.com/package/spritesmith) 

验证 spritesmith 功能是不是正常的 test.js:

```js
const path = require('path')
const fs = require('fs')
const Spritesmith = require('spritesmith')

const sprites = ['./loaders/image/1.jpg', './loaders/image/2.jpg']

// 合成图片
Spritesmith.run({src: sprites}, (err, result) => {
  console.log(result.image)
  console.log(result.coordinates)
  console.log(result.properties)
  // 把合成后的图片内容输出到磁盘
  fs.writeFileSync(path.join(__dirname, 'dist/sprite.jpg'), result.image)
})
```

#### 开发 sprite-loader

run-loader.js:

```js
const fs = require("fs"); 
const path = require("path"); 
const { runLoaders } = require("loader-runner"); 

runLoaders( 
  { 
    resource: "./loaders/index.css", 
    loaders: [path.resolve(__dirname, "./loaders/sprite-loader")], 
    readResource: fs.readFile.bind(fs), 
	}, 
  (err, result) => (err ? console.error(err) : null) 
);
```

index.css:

```css
.img1 {
	background: url(./images/1.jpg?__sprite);
}
.img2 {
	background: url(./images/2.jpg?__sprite);
}
```

sprite-loader.js:

```js
const path = require('path')
const fs = require('fs')
const Spritesmith = require('spritesmith')

module.exports = function (source) {
  const callback = this.async()
  const imgs = source.match(/url\((\S*)\?__sprite/g)
  const matchedImgs = []
  
  for (let i = 0; i < imgs.length; i++) {
   	const img = imgs[i].match(/url\((\S*)\?__sprite/)[1]
    matchedImgs.push(path.join(__dirname, img))
  }
  
  Spritesmith.run({
    src: matchedImgs
  }, (err, result) => {
    // 正常开发是使用this.emitFile输出文件，但是loader-runner没有这个方法，所以这里用fs代替
    fs.writeFileSync(path.join(process.cwd(), 'dist/sprite.jpg'), result.image)
    source = source.replace(/url\((\S*)\?__sprite/g, match => {
      return `url("dist/sprite.jpg")`
    })
    fs.writeFileSync(path.join(process.cwd(), 'dist/index.css'), source)
    callback(null, source)
  })
}
```



## plugin

webpack 怎么样编写一个插件，它的基本结构是什么样子的。

loader 的作用是用来处理各种各样的静态资源，插件的功能是更加强大的，插件是伴随整个 webpack 从初始化到最终的资源生成的过程，整个过程都可以有插件的。loader 没法做的事情都是可以通过插件来做的。

插件没有像 loader 那样的独立运行环境，只能在 webpack 里面运行。

### 插件的基本结构 

插件是一个类，有一个 apply 方法。

webpack 执行插件的时候会运行每一个插件上面的 apply 方法，同时把 webpack 的 compiler 对象传递给插件，这样插件就具备监听 compiler hooks 的能力，通过 compiler.hooks 在不同的阶段可以做相应的事情。hooks 包括 compiler 和 compilation 的。

```js
class MyPlugin { 															// 插件名称
  apply(compiler) { 													// 插件上的apply方法
    compiler.hooks.done.tap(' My Plugin', ( 	// 插件的hooks
      stats /* stats is passed as argument when done hook is tapped. */ 
    ) => { 
      console.log('Hello World!'); 						// 插件处理逻辑
    }); 
  } 
}

module.exports = MyPlugin;
```

插件使用，添加到 webpack 配置文件中：

```js
const MyPlugin = require('my-plugin')

module.exports = {
	plugins: [
		new MyPlugin()
	]
}
```

### 搭建插件的运行环境

使用 webpack 配置文件。

### 开发一个最简单的插件

plugins/demo-plugin.js:

```js
module.exports = class DemoPlugin { 
  constructor(options) { 
    this.options = options; 
  }
  apply(compiler) { 
    console.log("options", this.options); 
  } 
};
```

加入到 webpack 配置中:

```js
const DemoPlugin = require('./plugins/demo-plugin')

module.exports = {
	plugins: [
		new DemoPlugin({
			name: 'demo'
		})
	]
}
```

### 更复杂的插件开发场景

#### 插件中如何获取传递的参数？

通过插件的构造函数进行获取。

```js
module.exports = class MyPlugin { 
  constructor(options) { 
    this.options = options; 
  }
  apply(compiler) { 
    console.log("apply", this.options); 
  } 
};
```

#### 插件的错误处理

参数校验阶段，比如在接收参数的时候，我们需要对参数的数据类型，参数的名称和参数的其他内容进行校验，参数不符合要求，可以直接通过 throw 的方式把错误抛出出来。

```js
throw new Error(“ Error Message”)
```

如果已经进入到 hook 里面去，通过 compilation 对象的 warnings 和 errors 接收。

```js
compilation.warnings.push("warning"); 
compilation.errors.push("error");
```

#### 通过 Compilation 进行文件写入 

Compilation 上的 assets 可以用于文件写入。

webpack 的构建流程的文件生成是在 emit 阶段，所以在插件里监听 compiler emit 这个 hooks，监听到这个 hook 之后我们可以获取到 compilation 这个对象，然后只需要将最终要输出的内容设置到 compilation.assets 对象上面去就可以了，之后在最终 webpack 生成文件的时候触发了 emit 之后，它就会去读取 compilation.assets 这个对象，然后把它输出到磁盘目录。

文件写入需要使用 webpack-sources (https://www.npmjs.com/package/webpack-sources)。

```js
const { RawSource } = require("webpack-sources"); // 将一段代码输出到文件里面就可以用 RawSource
module.exports = class DemoPlugin { 
  constructor(options) { 
    this.options = options; 
  }
  apply(compiler) { 
    const { name } = this.options; 
    compiler.hooks.emit.tapAsync("emit", (compilation, cb) => { 
      compilation.assets[name] = new RawSource("demo"); 
      cb(); 
    }); 
  } 
};
```

#### 插件扩展：编写插件的插件

 webpack 的插件是特别的强大的，除了通过插件来扩展 webpack 的能力，插件自身也可以通过暴露 hooks 的方式进行自身扩展。

以 html-webpack-plugin 为例： 

* html-webpack-plugin-alter-chunks (Sync) 
* html-webpack-plugin-before-html-generation (Async) 
* html-webpack-plugin-alter-asset-tags (Async) 
* html-webpack-plugin-after-html-processing (Async) 
* html-webpack-plugin-after-emit (Async)

### 编写一个压缩构建资源为 zip 包的插件

要求：

* 生成的 zip 包文件名称可以通过插件传入。
* 需要使用 compiler 对象上的特定 hooks 进行资源的生成。

#### 准备知识：Node.js 里面将文件压缩为 zip 包

使用 jszip (https://www.npmjs.com/package/jszip)

jszip 使用示例

```js
var zip = new JSZip(); 

zip.file("Hello.txt", "Hello World\n"); 

var img = zip.folder("images"); 
img.file("smile.gif", imgData, {base64: true}); 

zip.generateAsync({type:"blob"}).then(function(content) { 
	// see FileSaver.js 
	saveAs(content, "example.zip"); 
});
```

#### 复习：Compiler 上负责文件生成的 hooks

Hooks 是 emit，是一个异步的 hook (AsyncSeriesHook) 。

emit 生成文件阶段，读取的是 compilation.assets 对象的值，将 zip 资源包设置到 compilation.assets 对象上。

#### 开发 zip-plugin

zip-plugin.js:

```js
const JSZip = require('jszip');
const path = require('path');
const RawSource = require('webpack-sources').RawSource;

const zip = new JSZip();

module.exports = class ZipPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
            const folder = zip.folder(this.options.filename);

            for (let filename in compilation.assets) {
                const source = compilation.assets[filename].source();
                folder.file(filename, source);
            }

            zip.generateAsync({
                type: 'nodebuffer'
            }).then((content) => {
                const outputPath = path.join(
                    compilation.options.output.path, 
                    this.options.filename + '.zip'
                );

                const outputRelativePath = path.relative(
                    compilation.options.output.path,
                    outputPath
                );
                compilation.assets[outputRelativePath] = new RawSource(content);

                callback();
            });
        });
    }
}
```