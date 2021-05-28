### css-modules

通过编译将你写的 class 名都改掉，css-loader 的 modules 设置为 true 就会将我们写的 class 改掉，然后当你引入 css 文件模块的时候，它会给你返回一个 class 的列表，这个列表就是原来的 class 跟编译之后的 class 名字的对应关系，然后我们在 html 中使用这个对应关系中的原始类名就可以了。

```js
import styles from "./style.css";
// import { className } from "./style.css";

element.innerHTML = '<div class="' + styles.className + '">';
```



### 框架中的 css

##### shadowDOM

看到的是一个 DOM，事实上内部有更多的结构，如 \<video>。在浏览器控制台中打开显示 shadowDOM 选项之后，就能看到它的内部结构。shadowDOM 是一种很好的封装页面组件的方法。

* 逻辑上的一个 DOM
* 结构上存在子集结构

##### scoped css

scoped css 是跟 shadowDOM 同时代提出来的东西，因为 shadowDOM 是有内部结构的，但是对外这个结构又是不能暴露的，那结构的样式怎么办呢，既然不能对外暴露就不能通过外部样式给它写样式，所以样式只能写在 shadowDOM 的内部，不对外暴露，所以你内部的样式也不可以影响外部的。

* 限定了范围的 css
* 无法影响外部元素
* 外部样式一般不影响内部
* 可以通过 /deep/ 或 >>> 穿透：在 shadowDOM 最后定稿的时候，留了一些余地，可以通过这样的方式去做选择器的穿透，在这种情况下，外部样式是可以影响内部样式的。

##### 模拟 scoped css

因为 shadowDOM 和 scoped css 的兼容性都不是很理想，所以想要达到组件样式封装的效果可能还是通过模拟的方式。模拟 scoped css 主要是模拟它的特性，就是内部和外部样式尽量隔离，互相不影响。

* 方案一：随机选择器（css modules的形式）
* 方案二：随机属性
  * \<div abcdefg> 
  * div[abcdefg] { }

