### box-shadow

盒子的阴影

* 营造层次感（立体感）
* 充当没有宽度的边框，它不会占据布局空间
* 特殊效果，无限投影的方式做一些图案

```css
div {
	width: 200px;
  height: 200px;
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, .2); /* x方向偏移 y方向偏移 模糊区域 扩展区域 颜色 */
  box-shadow: inset 5px 5px 10px 0 rgba(0, 0, 0, .2); /* 内阴影 */
}
```

### text-shadow

文本的阴影

* 立体感
* 印刷品质感

```css
div {
	text-shadow: 1px 1px 0 #ddd; /* x方向偏移 y方向偏移 模糊区域 颜色 */
}
```

### border-radius

* 圆角矩形
* 圆形
* 半圆/扇形（分别设置四个角）
* 一些奇怪的角角（分别设置半径）

### background

* 纹理、图案
* 渐变
* 雪碧图动画
* 背景图尺寸适应

### clip-path 

按路径进行裁剪

* 对容器进行裁剪
* 常见几何图形
* 自定义路径
* 可以和 svg 一同使用完成裁剪。

### transform

变换 transform

* translate 位移
* scale 缩放
* skew 斜切
* rotate 旋转

3D 变换

在 3D 空间中进行变换
