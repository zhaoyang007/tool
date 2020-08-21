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
  transition-property: width; /* 动画属性 */
  transition-duration: 3s; /* 动画时间 */
  /* 用来指定动画的时间和进度的关系。除了css内置的属性，还可以自己指定贝塞尔曲线 */ 
  transition-timing-function: ease;  /* 速度曲线 */
  transition-delay: 1s; /* 延迟时间 */
  transition: width 3s ease 1s; /* property duration timing-function delay */
}
```

支持多个属性同时变动：

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
  animation-timing-function: ease-in; /* 速度曲线 */
  animation-delay: 1s; /* 延迟时间 */
  animation-iteration-count: 2; /* 动画播放次数 */
  animation-direction: reverse; /* 指定是否应该轮流反向播放动画 */
  animation-fill-mode: both; /* 当动画不播放时，要应用到元素的样式 */
  animation-play-state: paused; /* 指定动画是否正在运行或已暂停 */
  animation-name: run; /* 关键帧动画名称 */
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

### 逐帧动画

每一帧都是关键帧，中间没有补间的过程。它属于关键帧动画特殊的用法，适用于无法补间计算的动画。因为每一帧都是一个单独的表现，所以资源会比较大，一般需要很多图片来实现逐帧动画。因为关键帧动画中间默认是有补间过度的，所以使用 animation-timing-function: steps(1); 使它在每个关键帧的时间静止，不要有中间的过度。steps() 是指定关键帧之间要有几个过度画面，不想有补间过度就设置 1。



## CSS 动画与交互

在 CSS 属性中，有这么一类属性，它负责的不是静态的展现，而是根据用户行为产生交互。

首先我们先从属性说起，CSS 中跟动画相关的属性有两个：animation 和 transition。

### animation 属性和 transition 属性

我们先来看下 animation 的示例，通过示例来了解一下 animation 属性的基本用法:

```css
@keyframes mykf
{
  from {background: red;}
  to {background: yellow;}
}

div
{
    animation:mykf 5s infinite;
}
```

这里展示了 animation 的基本用法，实际上 animation 分成六个部分：

* animation-name 动画的名称，这是一个 keyframes 类型的值（我们在第 9 讲“CSS 语法：除了属性和选择器，你还需要知道这些带 @的规则”讲到过，keyframes 产生一种数据，用于定义动画关键帧）；
* animation-duration 动画的时长；
* animation-timing-function	动画的时间曲线；
* animation-delay	动画开始前的延迟；
* animation-iteration-count	动画的播放次数；
* animation-direction	动画的方向。

我们先来看 animation-name，这个是一个 keyframes 类型，需要配合 @规则来使用。

比如，我们前面的示例中，就必须配合定义 mymove 这个 keyframes。keyframes 的主体结构是一个名称和花括号中的定义，它按照百分比来规定数值，例如：

```css
@keyframes mykf {
  0% { top: 0; }
  50% { top: 30px; }
  75% { top: 10px; }
  100% { top: 0; }
}
```

这里我们可以规定在开始时把 top 值设为 0，在 50% 是设为 30px，在 75% 时设为 10px，到 100% 时重新设为 0，这样，动画执行时就会按照我们指定的关键帧来变换数值。

这里，0% 和 100% 可以写成 from 和 to，不过一般不会混用，画风会变得很奇怪，比如：

```css
@keyframes mykf {
  from { top: 0; }
  50% { top: 30px; }
  75% { top: 10px; }
  to { top: 0; }
}
```

这里关键帧之间，是使用 animation-timing-function 作为时间曲线的，稍后我会详细介绍时间曲线。

接下来我们来介绍一下 transition。transition 与 animation 相比来说，是简单得多的一个属性。

它有四个部分：

* transition-property 要变换的属性；
* transition-duration 变换的时长；
* transition-timing-function 时间曲线；
* transition-delay 延迟。

这里的四个部分，可以重复多次，指定多个属性的变换规则。

实际上，有时候我们会把 transition 和 animation 组合，抛弃 animation 的 timing-function，以编排不同段用不同的曲线。

```css
@keyframes mykf {
  from { top: 0; transition:top ease}
  50% { top: 30px;transition:top ease-in }
  75% { top: 10px;transition:top ease-out }
  to { top: 0; transition:top linear}
}
```

在这个例子中，在 keyframes 中定义了 transition 属性，以达到各段曲线都不同的效果。

接下来，我们就来详细讲讲刚才提到的 timing-function，动画的时间曲线。



### 三次贝塞尔曲线

我想，你能从很多 CSS 的资料中都找到了贝塞尔曲线，但是为什么 CSS 的时间曲线要选用（三次）贝塞尔曲线呢？

我们在这里首先要了解一下贝塞尔曲线，贝塞尔曲线是一种插值曲线，它描述了两个点之间差值来形成连续的曲线形状的规则。

一个量（可以是任何矢量或者标量）从一个值到变化到另一个值，如果我们希望它按照一定时间平滑地过渡，就必须要对它进行插值。

最基本的情况，我们认为这个变化是按照时间均匀进行的，这个时候，我们称其为线性插值。而实际上，线性插值不大能满足我们的需要，因此数学上出现了很多其它的插值算法，其中贝塞尔插值法是非常典型的一种。它根据一些变换中的控制点来决定值与时间的关系。

贝塞尔曲线是一种被工业生产验证了很多年的曲线，它最大的特点就是“平滑”。时间曲线平滑，意味着较少突兀的变化，这是一般动画设计所追求的。

贝塞尔曲线用于建筑设计和工业设计都有很多年历史了，它最初的应用是汽车工业用贝塞尔曲线来设计车型。

K 次贝塞尔插值算法需要 k+1 个控制点，最简单的一次贝塞尔插值就是线性插值，将时间表示为 0 到 1 的区间，一次贝塞尔插值公式是：

![一次贝塞尔插值公式](/Users/zhaoyang/tool/images/前端知识体系/html和css/一次贝塞尔插值公式.png)

“二次贝塞尔插值”有 3 个控制点，相当于对 P0 和 P1，P1 和 P2 分别做贝塞尔插值，再对结果做一次贝塞尔插值计算

![一次贝塞尔插值公式](/Users/zhaoyang/tool/images/前端知识体系/html和css/二次贝塞尔插值公式.png)

“三次贝塞尔插值”则是“两次‘二次贝塞尔插值’的结果，再做一次贝塞尔插值”：

![一次贝塞尔插值公式](/Users/zhaoyang/tool/images/前端知识体系/html和css/三次贝塞尔插值公式.png)

贝塞尔曲线的定义中带有一个参数 t，但是这个 t 并非真正的时间，实际上贝塞尔曲线的一个点 (x, y)，这里的 x 轴才代表时间。

这就造成了一个问题，如果我们使用贝塞尔曲线的直接定义，是没办法直接根据时间来计算出数值的，因此，浏览器中一般都采用了数值算法，其中公认做有效的是牛顿积分，我们可以看下 JavaScript 版本的代码：

```js
function generate(p1x, p1y, p2x, p2y) {
    const ZERO_LIMIT = 1e-6;
    // Calculate the polynomial coefficients,
    // implicit first and last control points are (0,0) and (1,1).
    const ax = 3 * p1x - 3 * p2x + 1;
    const bx = 3 * p2x - 6 * p1x;
    const cx = 3 * p1x;

    const ay = 3 * p1y - 3 * p2y + 1;
    const by = 3 * p2y - 6 * p1y;
    const cy = 3 * p1y;

    function sampleCurveDerivativeX(t) {
        // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.
        return (3 * ax * t + 2 * bx) * t + cx;
    }

    function sampleCurveX(t) {
        return ((ax * t + bx) * t + cx ) * t;
    }

    function sampleCurveY(t) {
        return ((ay * t + by) * t + cy ) * t;
    }

    // Given an x value, find a parametric value it came from.
    function solveCurveX(x) {
        var t2 = x;
        var derivative;
        var x2;

        // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
        // First try a few iterations of Newton's method -- normally very fast.
        // http://en.wikipedia.org/wiki/Newton's_method
        for (let i = 0; i < 8; i++) {
            // f(t)-x=0
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            derivative = sampleCurveDerivativeX(t2);
            // == 0, failure
            /* istanbul ignore if */
            if (Math.abs(derivative) < ZERO_LIMIT) {
                break;
            }
            t2 -= x2 / derivative;
        }

        // Fall back to the bisection method for reliability.
        // bisection
        // http://en.wikipedia.org/wiki/Bisection_method
        var t1 = 1;
        /* istanbul ignore next */
        var t0 = 0;

        /* istanbul ignore next */
        t2 = x;
        /* istanbul ignore next */
        while (t1 > t0) {
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            if (x2 > 0) {
                t1 = t2;
            } else {
                t0 = t2;
            }
            t2 = (t1 + t0) / 2;
        }

        // Failure
        return t2;
    }

    function solve(x) {
        return sampleCurveY(solveCurveX(x));
    }

    return solve;
}

```

这段代码其实完全翻译自 WebKit 的 C++ 代码，牛顿积分的具体原理请参考相关数学著作，注释中也有相关的链接。

这个 JavaScript 版本的三次贝塞尔曲线可以用于实现跟 CSS 一模一样的动画。



### 贝塞尔曲线拟合

理论上，贝塞尔曲线可以通过分段的方式拟合任意曲线，但是有一些特殊的曲线，是可以用贝塞尔曲线完美拟合的，比如抛物线。

这里我做了一个示例，用于模拟抛物线：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Simulation</title>
  <style>
    .ball {
      width:10px;
      height:10px;
      background-color:black;
      border-radius:5px;
      position:absolute;
      left:0;
      top:0;
      transform:translateY(180px);
    }
  </style>
</head>
<body>
  <label>运动时间：<input value="3.6" type="number" id="t" />s</label><br/>
  <label>初速度：<input value="-21" type="number" id="vy" /> px/s</label><br/>
  <label>水平速度：<input value="21" type="number" id="vx" /> px/s</label><br/>
  <label>重力：<input value="10" type="number" id="g" /> px/s²</label><br/>
  <button onclick="createBall()">来一个球</button>
</body>
</html>
```

```js
function generateCubicBezier (v, g, t){
    var a = v / g;
    var b = t + v / g;

    return [[(a / 3 + (a + b) / 3 - a) / (b - a), (a * a / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)],
        [(b / 3 + (a + b) / 3 - a) / (b - a), (b * b / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)]];
}

function createBall() {
  var ball = document.createElement("div");
  var t = Number(document.getElementById("t").value);
  var vx = Number(document.getElementById("vx").value);
  var vy = Number(document.getElementById("vy").value);
  var g = Number(document.getElementById("g").value);
  ball.className = "ball";
  document.body.appendChild(ball)
  ball.style.transition = `left linear ${t}s, top cubic-bezier(${generateCubicBezier(vy, g, t)}) ${t}s`;
  setTimeout(function(){ 
    ball.style.left = `${vx * t}px`; 
    ball.style.top = `${vy * t + 0.5 * g * t * t}px`; 
  }, 100);
  setTimeout(function(){ document.body.removeChild(ball); }, t * 1000);
}

```

这段代码中，我实现了抛物线运动的小球，其中核心代码就是 generateCubicBezier 函数。

这个公式完全来自于一篇论文，推理过程我也不清楚，但是不论如何，它确实能够用于模拟抛物线。

实际上，我们日常工作中，如果需要用贝塞尔曲线拟合任何曲线，都可以找到相应的论文，我们只要取它的结论即可。













