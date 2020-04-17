<template>
  <div>
    <!-- label -->
    <label v-if="label">{{label}}</label>

    <slot></slot>

    <!-- 校验信息显示 -->
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
// Asyc-validator
import Schema from "async-validator";
import emitter from '@/mixins/emitter'

export default {
  name: 'KFormItem', // name就跟vue框架本身有关系。比如在做路由缓存的时候，这个名字就很关键。
  componentName: 'KFormItem', // 自定义的选项，没有什么实际价值，纯粹是为了当前这个功能服务的。跟vue框架本身没有关系。
  mixins: [emitter],
  inject: ["form"],
  data() {
    return {
      error: "" // error是空说明校验通过
    };
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
    }
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
    // 挂载的时候，老爹就肯定是存在的了。
    // 派发事件通知KForm，新增一个KFormItem实例。
    if (this.prop) {
      this.$dispatch('KForm', 'kkb.form.addField', [this])
    }
  },
  methods: {
    validate() {
      // 规则
      const rules = this.form.rules[this.prop];
      // 当前值
      const value = this.form.model[this.prop];

      // 校验描述对象
      const desc = { [this.prop]: rules };
      // 创建Schema实例
      const schema = new Schema(desc);
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          // 校验通过
          this.error = "";
        }
      });
    }
  }
};
</script>

<style scoped>
</style>