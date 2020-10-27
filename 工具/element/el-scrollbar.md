设置 el-scrollbar 父级为固定高度，设置 el-scrollbar 的高度为100%，el-scrollbar 的高度为自由高度。

```vue
<template>
  <div style="height:600px;">
    <el-scrollbar style="height:100%">
      <div style="width:700px;height:700px;border:solid;" >
        .......
      </div>
    </el-scrollbar>
  </div>
</template>

<style>
.el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>
```



el-scrollbar 的属性

```vue
<template>
 <div>
  <el-scrollbar :native="false" wrapStyle="" wrapClass="" viewClass="" viewStyle="" noresize="false" tag="section">
   <div>
    <p v-for="(item, index) in 200" :key="index">{{index}} 这里是一些文本。</p>
   </div>
  <el-scrollbar>
 </div>
</template>

<script>
export default {
  props: {
    native: Boolean, // 是否使用本地，设为true则不会启用element-ui自定义的滚动条
    wrapStyle: {}, // 包裹层自定义样式
    wrapClass: {}, // 包裹层自定义样式类
    viewClass: {}, // 可滚动部分自定义样式类
    viewStyle: {}, // 可滚动部分自定义样式
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: { // 生成的标签类型，默认使用 `div`标签包裹
      type: String,
      default: 'div'
    }
  }
}
</script>
```



el-scrollbar 默认是隐藏的，需要设置未默认显示，颜色，宽度可以自行 DIY。

```vue
<template>
	<el-scrollbar style="height:300px;width:200px;">
    <div style="height:500px">
      你好，同学！！！
    </div>
  </el-scrollbar>
</template>

<style>
/* css设置默认显示滚动条 */
.el-scrollbar__bar {
  opacity: 1;
}
</style>
```



只显示纵向滚动条

```css
.el-scrollbar__wrap{
	overflow-x: hidden;
}
.el-scrollbar__bar.is-horizontal {
	display: none;
}
```

只显示横向滚动条

```css
.el-scrollbar__wrap{
	overflow-y: hidden;
}
.el-scrollbar__bar.is-vertical {
	display: none;
}
```



滚动条置底

```vue
<template>
	<el-scrollbar ref="selfScrollbar"  style="height: 600px"></el-scrollbar>
</template>

<script>
export default {
  methods: {
    selfScrollDown() {
      this.$refs['selfScrollbar'].wrap.scrollTop =this.$refs['myScrollbar'].wrap.scrollHeight;
 		}
  },
  // 页面渲染结束时调用，或者自己加延时
  updated: function() {
    this.selfScrollDown()
  }
}
</script>
```



el-table 中使用 el-scrollbar

思路：写两个 el-table，一个当作头，一个当作体。第二个 table 使用 :show-header="false" 隐藏头部，用 el-scrollbar 将第二个 table 整个包起来。

```vue
<template>
  <div class="table-wrapper">
    <el-table
      class="table-head"
      style="width: 100%"
      ref="tableHead"
      :data="sortTableData"
    >
      <el-table-column
        v-for="(item, index) in tableArr"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
        :render-header="labelHead"
        :width="item.width"
      ></el-table-column>
    </el-table>
    <div class="scroll-table-wrapper" :class="needBorder ? 'border-bottom' : ''">
      <el-scrollbar style="height: 100%;" :class="!needBorder ? 'has-bottom' : ''">
        <el-table
          class="trend-table"
          style="width: 100%"
          ref="trendTable"
          :data="sortTableData"
          :show-header="false"
          @row-click="rowClick"
          @sort-change="sortChange">
          <el-table-column
            v-for="(item, index) in tableArr"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :align="item.align"
            :render-header="labelHead"
            :width="item.width"
          >
            <template slot-scope="scope">
              <div v-if="item.prop==='dealNum'">
                <span>{{scope.row[item.prop]}}</span>
                <i class="seedetail-btn iconfont icon-arrowright" style="cursor:pointer;" @click.stop="seeDetail(scope.row.dataDate)" v-if="tabs !== 3"></i>
              </div>
              <div v-else>
                <span>{{scope.row[item.prop]}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </div>
  </div>
</template>
```









