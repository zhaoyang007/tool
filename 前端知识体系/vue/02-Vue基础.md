### class 与 style 绑定

##### class

对象语法

```vue
<!-- 对象语法 -->
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
data {
  isActive: true,
  hasError: false
}
<!-- 数据对象放在 data 中 -->
<div v-bind:class="classObject"></div>
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
<!-- 数据对象放在计算属性 -->
<div v-bind:class="classObject"></div>
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

数组语法

```vue
<!-- 数组语法 -->
<div v-bind:class="[activeClass, errorClass]"></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
<!-- 三元表达式 -->
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
<!-- 数组语法中也可以使用对象语法 -->
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

##### style

对象语法

```vue
<!-- 对象语法 -->
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
<!-- 数据对象放在 data 中。也可以放在 computed 中。 -->
<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
<!-- 三元表达式 -->
<div v-bind:style="{cursor: scatterHasData?'pointer':'not-allowed'}"></div>
```

数组语法

```vue
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```
