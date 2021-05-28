##### transition 补间动画

两个状态的切换之间的动画。有开头有结尾，中间的过程是补出来的。

给出两点的状态，它会去算中间的过程，不能算所有的属性，比如 dispaly: block; 和 display: none; 是有和没有的区别，它中间的渐变是没法算的，所以只能计算一部分属性。

* 位置 - 平移（left/right/margin/transform）
* 方位 - 旋转（transform）
* 大小 - 缩放（transform）
* 透明度（opacity）
* 其他 - 线性变换（transform）

```css
div {
  /* 要变换的动画属性 */
  transition-property: width; 
  /* 动画的时长 */
  transition-duration: 3s; 
  /* 速度时间曲线，用来指定动画的时间和进度的关系。除了css内置的属性，还可以自己指定贝塞尔曲线，贝塞尔曲线的作用就是让变化平滑的度过 */
  transition-timing-function: ease;  
  /* 延迟时间 */
  transition-delay: 1s; 
  /* 组合写法 */
  /* property duration timing-function delay */
  transition: width 3s ease 1s; 
}
```

transition 可以重复多次，指定多个属性的变换规则。

```css
div {
  transition: width 1s, background 3s; 
  transition: all 1s; /* 该元素所有能够补间动画的属性都加上动画 */
}
```

##### keyframes 动画

动画的部分还是补间动画，区别是它可以有很多个关键帧。

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
  /* 组合写法 */
 	/* duration timing-function delay iteration-count direction fill-mode play-state name */
	animation: 3s ease-in 1s 2 reverse both paused run; 
}

@keyframes run {
  0% {
		width: 100px;
  }
  100% {
		width: 800px;
  }
}
```

transition 和 animation 组合使用，抛弃 animation 的 timing-function，以编排不同段用不同的曲线。

在这个例子中，在 keyframes 中定义了 transition 属性，以达到各段曲线都不同的效果。

```js
@keyframes mykf {
  from { top: 0; transition:top ease}
  50% { top: 30px; transition:top ease-in }
  75% { top: 10px; transition:top ease-out }
  to { top: 0; transition:top linear}
}
```

##### 逐帧动画

在关键帧动画的基础上可以做逐帧动画，中间是没有补间的，就是没有计算出来的画面。有的只是从第一个跳到第二个的画面。

每一帧都是关键帧，中间没有补间的过程。它属于关键帧动画特殊的用法，适用于无法补间计算的动画。因为每一帧都是一个单独的表现，所以资源会比较大，一般需要很多图片来实现逐帧动画。因为关键帧动画中间默认是有补间过度的，所以使用 animation-timing-function: steps(1); 使它在每个关键帧的时间静止，不要有中间的过度。steps() 是指定关键帧之间要有几个过度画面，不想有补间过度就设置 1。
