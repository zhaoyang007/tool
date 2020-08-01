/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(type => {
    //zy Vue['component'] = function(id, def) {}
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        //zy Vue.component('comp', {template, data() {}})
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        //zy def是对象
        if (type === 'component' && isPlainObject(definition)) {
          //zy 定义组件name
          definition.name = definition.name || id
          //zy 创建组件的构造函数，def变成了构造函数
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        //zy 注册 this.options[‘components'][comp] = Ctor
        this.options[type + 's'][id] = definition
        return definition
      }
    } 
  })
}
