# 数据 mock

## 前端开发环境

**数据mock**

json-server

**请求环境分类**

* 本地mock
* 本地联调
* 测试
* 生产

**请求环境实现**

如果只涉及本地：

* 使用devserver，设置不同的proxy（手动）
*  或者使用环境变量 + axios基地址+devserver proxy（自动）

如果涉及服务器：

* 需要使用环境变量和axios基地址。

## json-server

## koa + mockjs 起本地 mock 服务器

1. 我们可以使用 json 文件来模拟后台数据，但比较局限，无法模拟数据的增删改查。

2. 使用 json-server 模拟，但不能随机生成所需数据。

3. 使用 mockjs 模拟后端接口，可随机生成所需数据，可模拟对数据的增删改查。

4. mockjs示例

   ```js
   const mockjs = require('mockjs');
   const resData = mockjs.mock({
     respCode: '00',
     respMsg: 'success!',
     result: {
       pageSize: 10,
       pageNo: 1,
       total: 32,
       'resultList|32': [
         {
           // 自增id
           // 'id|+1': 1,
           id() {
             return mockjs.Random.id();
           },
           // 随机数字
           'subjectId|10': '@integer(0, 9)',
           // 随机中文名
           // cname: '@cname(2,3)'
           cname() {
             return mockjs.Random.cname(2，3);
           },
           // 随机中文
           // cword: '@cword(5,7)'
           cword() {
             return mockjs.Random.cword(5, 7)
           },
           // 随机英文
           // // "word": '@word(5,7)'
           word() {
             return mockjs.Random.word(5, 7)
           },
           // 随机选一个
           // 'pick|1': ['0', '1', '2', '3', '4', '5'],
   				pick() {
             return mockjs.Random.pick(['0', '1', '2', '3', '4', '5']);
           },
           // 随机日期
           // date: @date('yyyy-MM-dd')
           date() {
             return mockjs.Random.date('yyyy-MM-dd');
           },
           // 随机日期时间
           // dateTime: @datetime('yyyy-MM-dd HH:mm:ss')
           dateTime() {
             return mockjs.Random.datetime('yyyy-MM-dd HH:mm:ss')
           },
           // 随机中文title
           // ctitle: '@ctitle(4, 8)',
           ctitle() {
             return mockjs.Random.ctitle(4, 8);
           },
           // 随机email
           // email: '@email()'
           email() {
             return mockjs.Random.email();
           },
           // 随机地址
           // address: "@county(true)",
           address: () => {
             return mockjs.Random.county(true);
           },
           // 随机手机号
           phone: /^1[385][1-9]\d{8}/,
         }
       ]
     }
   });
   module.exports = [
     {
   		path: '/api/get/userInfo',
       resData
     }
   ];
   ```

