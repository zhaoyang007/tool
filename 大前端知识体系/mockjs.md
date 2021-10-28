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

