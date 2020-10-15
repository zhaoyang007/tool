el-table 结构

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



el-table 默认样式

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



常用属性

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



常用事件

```js
@row-click="rowClick" // 当某一行被点击时会触发该事件，参数会收到 row, column, event
@sort-change="sortChange" // 当表格的排序条件发生变化的时候会触发该事件，参数会收到 { column, prop, order }
```



常用方法

```js
this.$refs.myTable.setCurrentRow(tableData[0]) // 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。
```



列常用属性

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



改变 table 滚动条样式

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



在 <el-table> 上加的 class 和 style 等属性，最终会加到 div.el-table 身上。

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



禁用 table 横向滚动条

```css
.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden;
}
```



设置 table 行高度

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



将 el-table 滚动到某一行的位置

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



自定义表头 render-header

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

