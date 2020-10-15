* 组件外部

  * 传入遍历数据
    * 表单的类型
    * label 
    * 是否展示 label
    * 当前表单需要绑定的 v-model 变量名
    * model 的默认值（非必须）
    * 一些其他属性的传递
  * 绑定所有表单对应的 v-model 对象集合
  * 接收内部触发出来的事件

  ```vue
  <template>
    <div>
      <div class="searchHeader">
        <sel-header-component
          :sel-header-list="search.selHeaderList"
          v-model="search.selHeaderModelObj"
          @submit="searchResult"
        />
      </div>
    </div>
  </template>
  <script>
  import SelHeaderComponent from '@/components/configSelHeader'
  
  export default {
    components: {
      SelHeaderComponent
    },
    data () {
      return {
        // 查询条件
        search: {
          selHeaderList: [ // header可选项的初始化list
            {
              key: 'nameCn',
              label: '请输入目录的中文名称',
              showLabel: false,
              selType: 'input',
              width: 300
            },
            {
              key: 'nameEn',
              label: '请输入目录的英文名称',
              showLabel: false,
              selType: 'input',
              width: 300
            },
            {
              key: 'creator',
              label: '请输入创建人',
              showLabel: false,
              selType: 'input',
              width: 300
            }
          ],
          selHeaderModelObj: {} // model
        }
      }
    },
    created() {
      const obj = {}
      this.search.selHeaderList.forEach(td => {
        if (td.defaultValue) {
          obj[td.key] = td.defaultValue
        } else {
          obj[td.key] = ''
        }
      })
      this.selHeaderModelObj = obj
    }
  }
  </script>
  ```

* 组件内部

  * 根据数据遍历出所有表单
    * 将所有表单类型写出来，根据传入的数据判断哪个显示
    * 是否展示 label
    * 当前表单需要绑定的 v-model 变量名
    * 一些其他属性的传递
  * 表单上绑定的事件，使用 $emit 触发出来
  * v-model 的处理
    * 使用 prop value 接收传进来的 v-model 对象集合，并绑定到每个表单元素上。
    * 当值变化时，触发 @input 事件把组件上 v-model 对象集合传出去
      * 可以使用 @input 事件
      * 使用 watch
      * 使用 computed se

  ```vue
  <template>
    <div class="selHeaderWrap">
      <el-form :inline="true">
        <el-form-item
          v-for="(item,index) in selHeaderList"
          :key="index"
          :label="item.showLabel ? item.label : ''"
        >
          <el-input
            v-if="item.selType==='input'"
            v-model="value[item.key]"
            :placeholder="item.label"
            size="small"
            clearable
            @keyup.enter.native="submit"
            @clear="submit"
            :style="{width: item.width+'px'}"
            @input="input($event, item.key)"
          >
            <i slot="prefix" class="el-input__icon el-icon-search" />
          </el-input>
        </el-form-item>
      </el-form>
    </div>
  </template>
  <script>
  export default {
    props: {
      selHeaderList: {
        type: Array,
        default: () => []
      },
      value: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
      submit (val) {
        this.$emit('submit', val)
      },
      input(e, key) {
        this.value[key] = e
        this.$emit('input', this.value)
      }
    }
  }
  </script>
  ```

select 的 options 的数据可以放在每个数据中，也可以像 modelObj 一样做一个映射。