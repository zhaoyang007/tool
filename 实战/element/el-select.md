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

