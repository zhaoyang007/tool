### 概念

* 弹性父容器   
* 弹性子元素   
* 主轴（默认水平）
* 侧轴（默认垂直） 
* 主轴开始点和结束点  
* 侧轴开始点和结束点



### 弹性父容器

```js
// 设置在弹性父元素身上，子元素的布局方式就会按照flex的方式去排版
display: flex; 

// 设置主轴方向
flex-direction: row;            // 主轴为水平轴，从左到右。默认值
flex-direction: row-reverse;    // 主轴为水平轴，从右到左
flex-direction: column;         // 主轴为垂直轴，从上到下
flex-direction: column-reverse; // 主轴为垂直轴，从下到上

// 当弹性子元素超出弹性容器范围时是否换行
flex-wrap: nowrap;       // 不换行，超出的话，每个子元素都会缩小。默认值。
flex-wrap: wrap;         // 换行
flex-wrap: wrap-reverse; // 换行，且侧轴的起始和结束位置互换

// flex-direction和flex-wrap的复合属性
flex-flow: row nowrap;

// 设置子元素在主轴方向上的排列方式
justify-content: flex-start;    // 从主轴开始点位置开始排列。默认值。
justify-content: flex-end;      // 从主轴结束点位置开始排列
justify-content: center;        // 从中间位置开始排列
justify-content: space-between; // 把主轴上的剩余空间分成n-1份（n是一行子元素的个数）然后插入到子元素中间
justify-content: space-around;  // 把主轴上的剩余空间分成2n份（n是一行子元素的个数）然后在每一个子元素两侧都分配一份

// 设置子元素在侧轴方向上的排列方式
// 一般用于一行元素侧轴排列方式，使元素位于行中
align-items: flex-start; // 从侧轴开始点位置开始排列。默认值。
align-items: flex-end; 	 // 从侧轴结束点位置开始排列
align-items: center;     // 从中间位置开始排列
align-items: stretch;    // 当子元素不设置侧轴方向的宽高属性的时候，会自动去侵占剩余空间
align-items: baseline;   // 子元素会以内容区域去互相对齐
// 一般用于多行元素侧轴排列方式，使行位于容器中
align-content: flex-start;    // 从侧轴开始点位置开始排列。默认值。
align-content: flex-end;      // 从侧轴结束点位置开始排列
align-content: center;        // 从中间位置开始排列
align-content: space-between; // 把侧轴上的剩余空间分成n-1份（n是一行子元素的个数）然后插入到子元素中间
align-content: space-around;  // 把主轴上的剩余空间分成2n份（n是一行子元素的个数）然后在每一个子元素两侧都分配一份
```



### 弹性子元素

```js
// 设置弹性子元素的扩展比率
// 可以控制子元素侵占主轴方向上的剩余空间，把剩余空间按照子元素的flex-grow去分割，然后按需分配
flex-grow: 0; // 默认值0

// 设置弹性子元素的收缩比率
// 可以控制在超出并且不换行的子元素主轴方向上的收缩，把需要空出来的空间按照子元素的flex-shrink去分割，然后按需分配
flex-shrink: 1; // 默认值1

// 分配剩余空间前，决定弹性子元素在主轴方向上的大小
// max-width/min-width > flex-basis > width
// 当flex-item宽度和大于flex容器宽度，不管通过哪个属性设置的宽度，flex-item宽度要根据flex-shrink值缩小。
flex-basis: auto;  // 如果未指定宽度，则宽度将根据内容决定。默认值。
flex-basis: 100px; // 固定宽度
flex-basis: 10%;   // 占弹性容器的百分比

// flex-grow, flex-shrink和flex-basis的复合属性
flex: 0 1 100px;

// 控制弹性子元素的顺序
// 如果子元素的order值相同，按照文档里的顺序去排列。如果子元素的order值不同，按照order值从小到大排列
order: 0; // 默认值0

// 允许独立的弹性子元素覆盖弹性容器的默认对齐设置(align-items)
align-self: flex-start; // 从侧轴开始点位置开始排列。默认值。
align-self: flex-end; 	// 从侧轴结束点位置开始排列
align-self: center;     // 从中间位置开始排列
align-self: stretch;    // 当子元素不设置侧轴方向的宽高属性的时候，会自动去侵占剩余空间
align-self: baseline;   // 子元素会以内容区域去互相对齐
```



### 应用

垂直居中：

思路是创建一个只有一行的 flexbox，然后用 align-items:center; 和 align-content:center; 来保证行位于容器中，元素位于行中。

```html
<div id="parent">
  <div id="child">
  </div>
</div>
```

```css
#parent {
  display:flex;
  width:300px;
  height:300px;
  outline:solid 1px;
  justify-content:center;
  align-content:center;
  align-items:center;
}
#child {
  width:100px;
  height:100px;
  outline:solid 1px;
}
```

两列等高：

思路是创建一个只有一行的 flexbox，然后用 stretch 属性让每个元素高度都等于行高。

```html
<div class="parent">
  <div class="child" style="height:300px;">
  </div>
  <div class="child">
  </div>
</div>
<br/>
<div class="parent">
  <div class="child" >
  </div>
  <div class="child" style="height:300px;">
  </div>
</div>
```

```css
.parent {
  display:flex;
  width:300px;
  justify-content:center;
  align-content:center;
  align-items:stretch;
}
.child {
  width:100px;
  outline:solid 1px;
}
```

自适应宽：

这个就是 Flex 设计的基本能力了，给要自适应的元素添加 flex 属性即可。

```html
<div class="parent">
  <div class="child1">
  </div>
  <div class="child2">
  </div>
</div>
```

```css
.parent {
  display:flex;
  width:300px;
  height:200px;
  background-color:pink;
}
.child1 {
  width:100px;
  background-color:lightblue;
}
.child2 {
  width:100px;
  flex:1;
  outline:solid 1px;
}
```



### 弹性盒演示工具 flexbox-playground

codepen: https://codepen.io/peiqun/pen/WYzzYX

https://github.com/randyviandaputra/flexbox-playground