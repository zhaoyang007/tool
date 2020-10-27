工程化的本质就是在一个工程或项目中，怎么让这个项目更好的跑起来，所以针对不同的公司和项目，工程化有很多不同的做法，所以没有标准的答案，什么叫做工程化，做到哪些事情叫做工程化，笼统来说，工程化会关注这样几件事情：

* 组织：代码的组织，把代码分成怎样的目录，怎样的模块才方便大家去合作。
* 优化
* 构建：代码写完后需要经过哪些处理步骤，有可能需要优化，有可能需要压缩，再去上线，上线本身也可能属于构建过程的一部分。
* 维护

### postcss

css 工程化中非常有利的一个工具。post 是后的意思，它跟预处理器的概念是相对的，预处理器是把一个不是 css 的语音经过处理之后变成 css，就是先有预处理语言，再有 css。postcss 的过程是把 css 变成 css，是先有 css，再去对 css 代码进行处理。postcss 现在无所谓前置还是后置，它们都是把一段代码进行转换得到最终的 css。预处理器和 postcss 现在本质上没有太大的区别，都是做一些代码解析转换的工作。

过程就是 css 经过 postcss 的解析转换，最后变成 css。 这个解析转换的过程中我们可以做很多事情：

* 模块化：可以对 css 的模块化进行一些处理，解析出来之后把它们的模块做一些合并。
* 加前缀
* 兼容性
* ......

#### postcss 能做什么

* postcss 本身只有解析的能力：就是将一段 css 代码解析成一段结构化的 css。它会告诉你这个地方有一个选择器，选择器里面又一些样式，样式有这样一些属性，它的值是什么。
* 那些变换的能力全部是来自于插件。
* 目前至少有 200 多个插件。

#### 常见的 postcss 插件

* import 模块合并
* autoprefixer 自动加前缀
* cssnano 压缩代码
* cssnext 使用 css 新特性
* precss 变量、mixin、循环等

#### postcss 支持的构建工具

postcss 作为一个 css 处理工具，它本身并不十分擅长构建工作，因此它可以跟其他的构建工具合作使用。基本上不管使用什么构建工具，都可以把 postcss 非常方便的集成进去。

* postcss 自带的 cli 命令行工具
* webpack postcss-loader
* gulp gulp-postcss
* grunt grunt-postcss
* rollup rollup-postcss
* ......

### css-modules

一个组件如何封装好自己的样式，不干扰别人，也不接受别人的干扰。

之所以可能会发生样式冲突，是因为我们定义的 class 等 css 选择器有可能被其他人使用，就是命名冲突，产生互相干扰的问题。所以我们自然就会有一个想法，就是让这些 class 不跟别人的重复。

早期的解决方案就是加前缀名，但是不利于开发。所以我们想能不能照样按照我们方式去写，写完之后产生一个不跟别人冲突的 class，css modules 就是实现了这个的一个方案，就是通过编译将你写的 class 名都改掉，css-loader 的 modules 设置为 true 就会将我们写的 class 改掉，然后当你引入 css 文件模块的时候，它会给你返回一个 class 的列表，这个列表就是原来的 class 跟编译之后的 class 名字的对应关系，然后我们在 html 中使用这个对应关系中的原始类名就可以了。

```js
import styles from "./style.css";
// import { className } from "./style.css";

element.innerHTML = '<div class="' + styles.className + '">';
```

### webpack 和 css

webpack 给 css 提供了相当多的能力和处理方式。

* css-loader 将 css 变成 js
* style-loader 将 js 样式插入 head
* ExtractTextWebpackPlugin 将 css 从 js 中提取出来
* css modules 解决 css 命名冲突的问题
* less-loader sass-loader 等各类预处理器
* postcss-loader postcss处理

### 为什么使用 js 来引用、加载 css

* js 作为入口，管理资源有天然的优势
* 将组件的结构、样式、行为封装到一起，增强内聚
* 可以做更多的灵活处理（webpack）

这些都是使用 js 来管理加载 css 的优势，这也是前端工程化发展的一个重要方向，css 会越来越多的出现在 js 的文件中，作为 js 的依赖而出现，通过编译来实现。

