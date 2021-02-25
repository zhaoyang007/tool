### el-table

##### el-table 结构

```scss
div.el-table {
  div.el-table__header-wrapper {
    table.el-table__header {
      thead {
        tr {
          th {
            div.cell {
              
            }
          }
        }
      }
    }
  }
  div.el-table__body-wrapper {
    table.el-table__body {
      tbody {
        tr.el-table__row {
          td {
            div.cell {
						
            }
          }
        }
      }
    }
  }
}
```

##### el-table 默认样式

```scss
// el-table中的元素都是用的：box-sizing: border-box;
table {
  box-sizing: border-box;
}
// th和td有默认的上下12px的padding
.el-table th, .el-table td {
  padding: 12px 0;
}
// div.cell有默认的左右10px的padding，line-height: 23px;
.el-table .cell {
  padding-left: 10px;
  padding-right: 10px;
  line-height: 23px;
}
// 表格的th和td都有一个下边框
.el-table td, .el-table th.is-leaf {
	border-bottom: 1px solid #ebeef5;
}
// border表格的div.el-table上会加上一个class .el-table-border 上面有一个左边框和上边框
.el-table--border {
  border: 1px solid #ebeef5;
  border-right: none;
  border-bottom: none;
}
// border表格的th和td都有一个右边框
.el-table--border th, .el-table--border td {
  border-right: 1px solid #ebeef5;
}
```

##### 常用属性

```js
data // 要显示的数据列表
ref // 该el-table组件实例
border // 带边框的表格
stripe // 斑马线表格
highlight-current-row // 设置高亮必须加这个属性
:row-class-name="rowClassName" // 每一行的className的回调方法，rowClassName方法返回的字符串会添加到该行的tr上。也可以使用字符串为所有行设置一个固定的 className。rowClassName
empty-text // 空数据时显示的文本内容
show-header	// 是否显示表头
```

##### 常用事件

```js
@row-click="rowClick" // 当某一行被点击时会触发该事件，参数会收到 row, column, event
@sort-change="sortChange" // 当表格的排序条件发生变化的时候会触发该事件，参数会收到 { column, prop, order }
```

##### 常用方法

```js
this.$refs.myTable.setCurrentRow(tableData[0]) // 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。
```

##### 列常用属性

```js
label	// 显示的标题
prop	// 对应列内容的字段名
width	// 对应列的宽度
min-width // 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列
align	// 对齐方式
header-align // 表头对齐方式，若不设置该项，则使用表格的对齐方式
resizable	// 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
sortable // 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
fixed	// 列是否固定在左侧或者右侧
render-header // 列标题 Label 区域渲染使用的 Function
```

##### 改变 table 滚动条样式

```scss
.el-table__body-wrapper {
  /* 滚动条整体：定义高宽及背景，高宽分别对应横竖滚动条的尺寸*/
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
  }
  /* 滚动条轨道：定义内阴影，圆角，背景 */
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 3px;
    background-color: transparent;
  }
  /* 滚动条滑块：定义内阴影，圆角，背景 */
  &::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    border-radius: 3px;
    background-color: #5D6585;
  }
  /* 边角，即两个滚动条的交汇处 */
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  /* 滚动条的轨道的两端按钮 */
  ::-webkit-scrollbar-button {
    
  }
  /* 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件 */
  ::-webkit-resizer {

  }
}
```

##### 在 <el-table> 上加的 class 和 style 等属性，最终会加到 div.el-table 身上。

```vue
<!-- el-table中的height等属性写法：height="100" :height="100" height="100px" :height="100+'px'"都可以 -->
<el-table
	class="my-table"
  style="width: 100%;"
  height="100"
  max-height="200"
>
</el-table>

<!-- 编译后的html -->
<div class="my-table" style="width: 100%;height: 100px;max-height: 200px;">
</div>
```

##### 禁用 table 横向滚动条

```css
.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden;
}
```

##### 设置 table 行高度

```css
.el-table__header tr, .el-table__header th {
  padding: 0;
  height: 40px;
}
.el-table__body tr, .el-table__body td {
  padding: 0;
  height: 40px;
}
```

##### 将 el-table 滚动到某一行的位置

思路：

1. 计算出行高度 itemHeight
2. 遍历表格数据，找到传入的要到的那行的位置 i
3. 将 table-body 元素滚动 itemHeight * i 这么高的距离

```js
function scrollOneRow(row) {
	// 拿到行元素
  const tableRowEl = this.$refs.myTable.$el.getElementsByClassName('el-table__row')[0]
  if (tableRowEl) {
    // 计算行高度
    const itemHeight = parseInt(tableRowEl.offsetHeight)
    if (this.tableData && this.tableData.length > 0) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].dataDate === row.dataDate) {
          const scrollHeight = itemHeight * i
          document.getElementsByClassName('my-table')[0].getElementsByClassName('el-table__body-wrapper')[0].scrollTop = scrollHeight
          break;
        }
      }
    }
  }
}
```

##### 自定义表头 render-header

渲染的内容会放到 .cell 中。

```vue
<template>
	<el-table
    class="my-table"
    style="width: 100%;"
    height="100"
    max-height="200"
  >
    <el-table-column
  		v-for="(item, index) in tableArr"
      :key="index"
      :prop="item.prop"
      :render-header="labelHead"
    ></el-table-column>
  </el-table>
</template>

<script>
export default {
  methods: {
    labelHead(h, { column, $index }) {
      let obj = this.tableArr[$index]
      return h('div',{ class: 'right_text' }, [
        h('div', { class: 'box_sec' }, [
          h('div', { class: 'box_wax' }, [
            h('p', {}, [
              obj.label
            ])
          ])
        ]),
        h('div', { class: 'plate_sec' }, [
          h('i', { class: 'iconfont icon-triangle-top icon_sort icon_top_sec',
            on: {
              click: () => this.sortChange({prop: obj.prop,order: 'ascending'})
            }
          }),
          h('i', { class: 'iconfont icon-triangle icon_sort icon_bottom_sec',
            on: {
              click: () => this.sortChange({prop: obj.prop, order: 'descending'})
            }
          })
        ])
      ])
    },
  }
}
</script>
```

效果：

![render-header](/Users/zhaoyang/tool/images/工具/render-header.jpg)

##### 自适应列宽

```vue
<el-table-column prop="name" :width="flexColumnWidth('name',tableData)" label="名称" align="center" />
```

```js
// 自适应表格列宽
flexColumnWidth(str, tableData, flag = 'max') {
  // str为该列的字段名(传字符串);tableData为该表格的数据源(传变量);
  // flag为可选值，可不传该参数,传参时可选'max'或'equal',默认为'max'
  // flag为'max'则设置列宽适配该列中最长的内容,flag为'equal'则设置列宽适配该列中第一行内容的长度。
  str = str + ''
  let columnContent = ''
  if (!tableData || !tableData.length || tableData.length === 0 || tableData === undefined) 	{
    return
  }
  if (!str || !str.length || str.length === 0 || str === undefined) {
    return
  }
  if (flag === 'equal') {
    // 获取该列中第一个不为空的数据(内容)
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i][str].length > 0) {
        // console.log('该列数据[0]:', tableData[0][str])
        columnContent = tableData[i][str]
        break
      }
    }
  } else {
    // 获取该列中最长的数据(内容)
    let index = 0
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i][str] === null) {
        return
      }
      const now_temp = tableData[i][str] + ''
      const max_temp = tableData[index][str] + ''
      if (now_temp.length > max_temp.length) {
        index = i
      }
    }
    columnContent = tableData[index][str]
  }
  // console.log('该列数据[i]:', columnContent)
  // 以下分配的单位长度可根据实际需求进行调整
  let flexWidth = 0
  for (const char of columnContent) {
    if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
      // 如果是英文字符，为字符分配8个单位宽度
      flexWidth += 8
    } else if (char >= '\u4e00' && char <= '\u9fa5') {
      // 如果是中文字符，为字符分配15个单位宽度
      flexWidth += 15
    } else {
      // 其他种类字符，为字符分配8个单位宽度
      flexWidth += 8
    }
  }
  // 设置最小宽度
  if (flexWidth < 80) {
    flexWidth = 80
  }
  // 设置最大宽度
  if (flexWidth > 250) {
    flexWidth = 250
  }
  return flexWidth + 'px'
}
```

##### 合并单元格

```vue
<template>
  <div style="padding:20px">
    <el-table :data="tableData6" :span-method="objectSpanMethod" border >
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="amount1" label="数值 1（元）"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      spanArr: [],//用于存放每一行记录的合并数
      tableData6: [
        {
          id: "1",
          name: "王小虎",
          amount1: "234"
        },
        {
          id: "1",
          name: "王小虎",
          amount1: "165"
        },
        {
          id: "2",
          name: "王小虎",
          amount1: "324"
        },
        {
          id: "2",
          name: "王小虎",
          amount1: "621"
        },
        {
          id: "2",
          name: "王小虎",
          amount1: "539"
        }
      ]
    };
  },
  mounted: function() {
    this.getSpanArr(this.tableData6);
  },
  methods: {
    getSpanArr(data) {
        // data就是我们从后台拿到的数据
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].id === data[i - 1].id) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
        console.log(this.spanArr);
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        console.log(`rowspan:${_row} colspan:${_col}`);
        return {
          // [0,0] 表示这一行不显示， [2,1]表示行的合并数
          rowspan: _row,
          colspan: _col
        };
      }
    }
  }
};
</script>
```



### el-select

```vue
<el-table :data="tableList">
  <el-table-column prop="tableName"></el-table-column>
	<el-table-column>
    <template scope-slot="scope">
    	<el-select v-model="scope.row.value" @change="handleChange(scope)">
        <el-option
          v-for="(item, index) in selectList" :key="index"
          :label="item.selectName+item.version" :value="item.value">
        </el-option>
      </el-select>
    </template>
  </el-table-column>
  <el-table-column>
    <template scope-slot="scope">
    	<el-select v-model="scope.row.subValue" @change="handleSubChange(scope)">
        <el-option
          v-for="(item, index) in subSelectList" :key="index"
          :label="item.selectName+item.version" :value="item.subValue">
        </el-option>
      </el-select>
    </template>
  </el-table-column>
</el-table>

<script>
export default {
  data() {
    return {
      tableList: [
        { tableName: 'tableName1', value: 1, subValue: 11 },
        { tableName: 'tableName2', value: 2, subValue: 21 },
        { tableName: 'tableName3', value: 3, subValue: 31 },
      ],
      selectList: [
        { value: 1, selectName: 'selectName1', version: 'v1' },
        { value: 2, selectName: 'selectName2', version: 'v2' },
        { value: 3, selectName: 'selectName3', version: 'v3' },
      ],
      subSelectList: [
        { subValue: 11, selectName: 'subSelectName1', version: 'v1' },
        { subValue: 21, selectName: 'subSelectName2', version: 'v2' },
        { subValue: 31, selectName: 'subSelectName3', version: 'v3' },
      ]
    }
  },
  methods: {
    handleChange(scope) {
      // 修改这个值，该行的subSelect就会回显21对应的o ption的信息。
      this.tableList[scope.$index].subValue = 21; 
    },
    handleSubChange(scope) {
      
    }
  }
}
</script>
```

select 绑定的 v-model 的值是和 option 绑定的 value 值所对应的。有对应的时候根据 v-model 对应的 option 项做回显，没有对应的直接显示当前 v-model 的值。

切换 select 的时候，可以通过 scope 拿到当前行的 table 数据，然后可以修改该行其他的 select 绑定的 v-model 的值，从而改变该 select 的回显信息。



### el-scrollbar

* 设置 el-scrollbar 父级为固定高度
* 设置 el-scrollbar 的高度设为100%，就是等于父级的固定高度
* el-scrollbar 的内容为自由的超出父级的高度

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

##### el-scrollbar 的属性

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

##### el-scrollbar 默认是隐藏的，需要设置未默认显示，颜色，宽度可以自行 DIY。

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

##### 只显示纵向滚动条

```css
.el-scrollbar__wrap{
	overflow-x: hidden;
}
.el-scrollbar__bar.is-horizontal {
	display: none;
}
```

##### 只显示横向滚动条

```css
.el-scrollbar__wrap{
	overflow-y: hidden;
}
.el-scrollbar__bar.is-vertical {
	display: none;
}
```

##### 滚动条置底

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

##### el-table 中使用 el-scrollbar

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









