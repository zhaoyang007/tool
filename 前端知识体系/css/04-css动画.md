### 动画的原理

* 视觉暂留作用：我们看到的任何画面在我们的脑海中都是会保留一段时间的。在看到一系列差别不大的画面的时候，就会把它想象成连续的动画。
* 画面逐渐变化来产生动画，每秒钟多少个画面，持续不断的呈现。
* 这两点就能产生一个动画。



### 动画的作用

* 愉悦感
* 引起注意
* 反馈
* 掩饰



### css 中的动画类型

* transition 补间动画：两个状态的切换之间的动画。有开头有结尾，中间的过程是补出来的。
* keyframe 关键帧动画：动画的部分还是补间动画，区别是它可以有很多个关键帧，每一种状态之间都可以有一个动画。你指定的每一个状态就是一个关键帧。 
* 逐帧动画：在关键帧动画的基础上可以做逐帧动画，中间是没有补间的，就是没有计算出来的画面。有的只是从第一个跳到第二个的画面。



### transition 补间动画

给出两点的状态，它会去算中间的过程，不能算所有的属性，比如 dispaly: block; 和 display: none; 是有和没有的区别，它中间的渐变是没法算的，所以只能计算一部分属性。

* 位置 - 平移（left/right/margin/transform）
* 方位 - 旋转（transform）
* 大小 - 缩放（transform）
* 透明度（opacity）
* 其他 - 线性变换（transform）

```css
div {
  transition-property: width; /* 要变换的动画属性 */
  transition-duration: 3s; /* 动画的时长 */
  transition-timing-function: ease;  /* 速度时间曲线，用来指定动画的时间和进度的关系。除了css内置的属性，还可以自己指定贝塞尔曲线，贝塞尔曲线的作用就是让变化平滑的度过 */
  transition-delay: 1s; /* 延迟时间 */
  
  transition: width 3s ease 1s; /* property duration timing-function delay */
}
```

transition 可以重复多次，指定多个属性的变换规则。

```css
div {
  transition: width 1s, background 3s; 
  transition: all 1s; /* 该元素所有能够补间动画的属性都加上动画 */
}
```

贝塞尔曲线调试：https://matthewlein.com/tools/ceaser



### keyframes 动画

动画的过程相当于多个补间动画组合到一起，有多个状态之间的变更。它跟过度动画最大的区别是过度动画要求元素的状态得有变化才能有动画，比如 hover 或给它加一个 class。关键帧动画不要求元素的状态有变化，可以给元素指定播放某个动画。定义更加灵活，能控制的更多。

```css
div {
  animation-duration: 3s; /* 动画时间 */
  animation-timing-function: ease-in; /* 动画的速度时间曲线 */
  animation-delay: 1s; /* 动画开始前的延迟时间 */
  animation-iteration-count: 2; /* 动画播放次数 */
  animation-direction: reverse; /* 指定是否应该轮流反向播放动画 */
  animation-fill-mode: both; /* 当动画不播放时，要应用到元素的样式 */
  animation-play-state: paused; /* 指定动画是否正在运行或已暂停 */
  animation-name: run; /* 关键帧动画名称 */
 
	animation: 3s ease-in 1s 2 reverse both paused run; /* duration timing-function delay iteration-count direction fill-mode play-state name */
}
/* keyframes 的主体结构是一个名称和花括号中的定义，它按照百分比来规定数值 */
@keyframes run {
  0% {
		width: 100px;
  }
  100% {
		width: 800px;
  }
}
```

有时候我们会把 transition 和 animation 组合，抛弃 animation 的 timing-function，以编排不同段用不同的曲线。

在这个例子中，在 keyframes 中定义了 transition 属性，以达到各段曲线都不同的效果。

```js
@keyframes mykf {
  from { top: 0; transition:top ease}
  50% { top: 30px;transition:top ease-in }
  75% { top: 10px;transition:top ease-out }
  to { top: 0; transition:top linear}
}
```



### 逐帧动画

每一帧都是关键帧，中间没有补间的过程。它属于关键帧动画特殊的用法，适用于无法补间计算的动画。因为每一帧都是一个单独的表现，所以资源会比较大，一般需要很多图片来实现逐帧动画。因为关键帧动画中间默认是有补间过度的，所以使用 animation-timing-function: steps(1); 使它在每个关键帧的时间静止，不要有中间的过度。steps() 是指定关键帧之间要有几个过度画面，不想有补间过度就设置 1。



### 过渡和动画的区别

使用：通过js或者hover之后，改变dom元素的状态，可以用transition来添加过渡，防止突兀的变化

在做复杂的动画效果的时候可以用animation

transition需要手动触发

animation只要设置了之后就7会马上执行，不需要触发