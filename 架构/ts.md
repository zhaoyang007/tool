# 装饰器

装饰器：以声明性的方式附加元数据和修改类及其成员的行为，增强代码的可读性和可维护性。

typescript中，装饰器本身就是一个函数。这些函数可以接收一到多个参数，具体取决于装饰的位置和类型。

装饰器的执行顺序：是由底层（参数）到顶层（类）的，这意味着参数装饰器先执行，然后是访问器、属性、方法和类装饰器。

需要给装饰器传递参数时，要在装饰器内部返回一个函数。

```ts
// 类装饰器
function ClassDecorator(target: Function) {
  // target 是被装饰的类的构造函数
}
// 方法装饰器
function MethodDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  // target 是被装饰的类的原型
  // key 是被装饰的方法的名称
  // descriptor 是该方法的属性描述符
}
// 属性装饰器
function PropertyDecorator(target: any, key: string) {
  // target 是被装饰的类的原型
  // key 是被装饰的属性的名称
}
// 访问器装饰器
function AccessorDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  // target 是被装饰的类的原型
  // key 是被装饰的访问器的名称
  // descriptor 是该访问器的属性描述符
}
// 参数装饰器
function ParameterDecorator(target: any, key: string, parameterIndex: number) {
  // target 是被装饰的类的原型
  // key 是被装饰的方法的名称
  // parameterIndex 是被装饰的参数的索引
}

// 应用装饰器
@ClassDecorator
class MyClass {
  @PropertyDecorator
  myProperty: string;

  @AccessorDecorator
  get myAccessor() {
    return this.myProperty;
  }

  @MethodDecorator
  myMethod(@ParameterDecorator param: string) {
    console.log(param);
  }
}
```

