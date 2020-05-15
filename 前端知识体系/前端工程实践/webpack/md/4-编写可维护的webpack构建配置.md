## 构建配置包设计

把之前 webpack 的用法做到更加通用，让其他的业务项目都能够用，把构建包做到更加的通用。

### 构建配置抽离成npm包的意义

#### 通用性
业务开发者无需关注构建配置，创建好一个项目就可以马上使用把项目run起来，极大的提升开发效率。

统一团队构建脚本。

#### 可维护性

构建配置合理的拆分，做到更加的通用，易于维护，比如增加或修改一个新功能，能方便的从构建包里找到相应的位置进行修改。如果把所有的配置放到一个文件里面，非常难改，改一个地方可能影响其他的环境配置。

README 文档、ChangeLog 文档等，告诉开发者怎么使用这个构建包。

#### 构建质量

冒烟测试、单元测试、测试覆盖率

持续集成

### 构建配置管理的可选方案

* 通过多个配置文件管理不同环境的构建，webpack --config参数进行控制。

* 将构建配置设计成一个库，用的时候直接使用这个库。比如hjs-webpack Neutrino webpack-blocks。

* 抽成一个工具进行管理，通过命令行工具来管理构建配置。比如：create-react-app kyt nwb。

* 将所有的构建配置放到一个文件，通过--env参数控制分支选择。

### 构建配置包设计

#### 通过多个配置文件管理不同环境的webpack配置

基础配置：webpack.base.js

开发环境：webpack.dev.js

生产环境：webpack.prod.js

ssr环境：webpack.ssr.js

#### 抽离成一个npm包统一管理

规范：要遵循这些规范 git commit 日志、readme、eslint规范、semver规范

质量：冒烟测试、单元测试、测试覆盖率和CI

做好了规范和质量这两块，基本上可以保证构建配置它长期的可维护性和质量保证。

#### 通过webpack merge组合配置

```js
const merge = require('webpack-merge')
module.exports = merge(baseConfig, devConfig)
```



## 功能模块设计和目录结构

### 功能模块设计

![构建包功能模块设计](/Users/zhaoyang/tool/前端知识体系/前端工程实践/webpack/images/构建包功能模块设计.png)

### 目录结构设计

test   // 测试代码：冒烟测试，单元测试

lib     // 包的源代码

​    webpack.base.js

​    webpack.dev.js

​    webpack.prod.js

​    webpack.ssr.js

README.md

CHANGELOG.md

.eslintrc.js

package.json

index.js  // 入口文件



## 使用 ESLint 规范构建脚本

使用eslint-config-airbnb-base

eslint --fix 可以自动处理空格

.eslintrc.js

```js
module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb-base",
  "env": {
    "browser": true,
    "node": true
  }
}
```



## 冒烟测试介绍和实际运用

### 冒烟测试 (smoke testing) 

冒烟测试是指对提交测试的软件在进行详细深入的测试之前而进行的预测试，就是软件开发人员在提交测试之前，会自己检查一下基本的功能是否可用，这种预测试的主要目的是暴露导致软件需要重新发布的基本功能失效等严重问题。

### 构建配置包冒烟测试需要做的事情

构建是否成功。

每次构建完成的build目录是否有内容输出

* 是否有js css等静态资源文件
*  是否有html文件

测试的步骤，如果每次发版之前，去找一个项目手动的去运行，比较繁琐，所以我们也是通过一些测试工具去运行上面的步骤，每次发版之前运行一下 npm run test，它会先把这个构建包进行 webpack 打包，看看是否有报错，同时生成一些产物，如果这两步都是ok的，那就说明我们这一次冒烟测试进行的是比较顺利的。

### 判断构建是否成功 

在事例项目里面运行构建，看看是否有报错。

将编写的 webpack 配置传给 webpack 函数，webpack函数执行构建，执行完之后，在它的回调函数里面有一个err 和 stats，err 是单次构建有没有报错，有报错说明我们这次构建是不成功的，没有报错说明这次构建没问题，没有问题我们可以把基本的一些统计信息输出出来，比如构建的速度，相关的构建资源列表等。

```js
const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const Mocha = require('mocha')

const mocha = new Mocha({
  timeout: '10000ms'
})

process.chdir(path.join(__dirname, 'template'))

rimraf('./dist', () => {
  const prodConfig = require('../../lib/webpack.prod.js')
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err)
      process.exit(2)
    }
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false,
      // chunks: false,
      // chunkModules: false
    }))

    console.log('webpack build success, begin run test.')

    mocha.addFile(path.join(__dirname, 'html-test.js'))
    mocha.addFile(path.join(__dirname, 'css-js-test.js'))

    mocha.run()
  })
})
```

### 判断基本功能是否正常

编写mocha测试用例

* 是否有js css等静态资源文件
* 是否有html文件

./smoke/html-test.js

```js
const glob = require('glob-all')

describe('Checking generated html files', () => {
  it('should generate html files', done => {
    const files = glob.sync([
      './dist/index.html',
      './dist/search.html'
    ])
    if (files.length > 0) {
      done()
    } else {
      throw new Error('no html files generated')
    }
  })
})
```

./smoke/css-js-test.js

```js
const glob = require('glob-all')

describe('Checking generated css js files', () => {
  it('should generate css js files', done => {
    const files = glob.sync([
      './dist/index.*.js',
      './dist/index.*.css',
      './dist/search.*.js',
      './dist/search.*.css'
    ])
    if (files.length > 0) {
      done()
    } else {
      throw new Error('no css js files generated')
    }
  })
})
```



## 单元测试和测试覆盖率

### 市面上，比较流行的单元测试的方式。

单纯的测试框架，需要断言库

​    测试框架：mocha, ava

​    断言库：.chai .should.js .expect .bsetter-assert

集成框架，开箱即用

​    jasmine  jest

极简API

### 编写单元测试用例

技术选型：mocha + chai

测试代码：describe it except

测试命令：mocha add.test.js

add.test.js 

```js
const expect = require('chai').expect
const add = require('../src/add')

describe('use expect: src/add.js', () => {
  it('add(1, 2) === 3', () => {
    expect(add(1, 2).to.equal(3))
  })
})
```

### 单元测试接入

安装mocha + chai

```bash
npm i mocha chai -D
```

新建test目录，并增加xxx.test.js测试文件

在package.json中的scripts字段增加test命令

```json
 "scripts": {
   "test": "./node_modules/.bin/_mocha"
 }
```

执行测试命令

```bash
 npm run test
```

### 测试覆盖率

推荐使用gotwarlost/istanbul

```bash
npm i istanbul -D
```

使用

```bash
istanbul cover test.js
```



## 持续集成和Travis CI

### 持续集成的作用

#### 快速发现错误

每次 git commit 的时候都会自动的去持续集成，如果这次提交对功能有影响，可以通过持续集成的方式快速的告诉你这次提交的代码是有问题的，你就可以及时的修复这个问题。

#### 防止分支大幅偏离主干

持续集成能让我们的产品快速迭代，同时保证质量。

核心措施是，代码集成到主干之前，必须通过自动化测试，只要有一个测试用例失败，就不能集成。

### github 最流行的 CI

![github-ci](/Users/zhaoyang/tool/前端知识体系/前端工程实践/webpack/images/github-ci.png)

## 接入 Travis CI

1. https://trivis-ci.org/ 使用github账号登录

2. 在https://trivis-ci.org/account/repositories 为项目开启权限

3. 项目根目录下新增.travis.yml配置文件 

   每次git commit的时候会自动的触发CI的功能，它会运行这个配置文件中定义的脚本 

## .travis.yml 文件内容

```yaml
language: node_js

sudo: false

cache:
  apt: true
  directories:
    - node_modules

node_js: stable

install:
    - npm install -D # 安装构建器依赖
    - cd ./test/smoke/template
    - npm install -D # 安装模版项目依赖
    - cd ../../../
  
script:
  - npm test
```

### 实际项目接入travis CI的流程

1. 在githb中创建一个项目

2. 在travis-ci中激活该项目，这时我们的项目就接入travis-ci了。

3. clone项目

4. 把之前构建包的代码挪过来

5. 项目根目录下新增.travis.yml配置文件 

6. 上传代码



## 发布构建包到npm社区

先到npm搜索要发布的包名有没有被别人用到

### 添加用户：

```bash
npm adduser
```

### 登录npm账户：

```bash
npm login
```

### 升级版本：

升级补丁版本号：npm version patch

升级小版本号：npm version minor

升级大版本号：npm version major

升级版本前需要提交 git

运行相应的命令会自动的更新对应的版本号。它会自动 git 提交一次版本号的更新。

每次发布版本之前需要打个 git tag：git tap v1.0.1。运行 npm version 它也会自动的帮你打这个 tag 。

提交远程：git push origin master

### 生成这个包当前版本的changelog

### 发布版本：

```bash
npm publish
```



## Git Commit 规范和 changelog 生成

基础包良好的commit规范有助于我们后续维护代码。

### 良好的git commit规范优势：

* 加快 code review 的流程。

* 根据规范的 git commit 的元数据可以快速的生成 changelog 文档，这样就避免手动的编写 changelog 消耗的时间。

* 后续维护者可以知道 feature 被修改的原因。

### 技术方案

![gitcommit规范技术方案](/Users/zhaoyang/tool/前端知识体系/前端工程实践/webpack/images/gitcommit规范技术方案.png)

### 提交格式要求

<img src="/Users/zhaoyang/tool/前端知识体系/前端工程实践/webpack/images/git提交格式.png" alt="git提交格式" style="zoom:150%;" />

#### 格式说明如下：

##### 头部：

type: 代表某次提交的类型

​    feat: 新增特性

​    fix: 修改 bug

​    docs: 文档修改

​    style: 代码格式修改，空格、缩进、逗号等，不改变代码逻辑

​    refactor: 代码重构，没有增加新功能 feature 或修复 bug

​    pref: 优化相关，如性能提升，体验优化等

​    test: 测试用例修改，包括单元测试，集成测试等

​    chore: 改变构建流程，或增加依赖库、工具等

​    revert: 回滚到上一个版本

scope: 作用域, commit 影响的范围, 比如: route, component, utils, build...

subject: commit 的概述, 目的的简短描述, 建议符合 50/72 formatting

##### 内容：
正常情况下写这个头部就已经符合一个标注的 git commit 规范的要求。不过有时候某一次提交可能影响很大，或做的事情很多，这时通过 subject 还不能很好的描述这一次提交做的事情，这时候可以在 body 里面分为几行去写，做了什么事情都可以详细的写在这里。

body: commit 具体修改内容, 可以分为多行, 建议符合 50/72 formatting

##### 尾部：

比如这次提交是修复了一个 bug，可以贴上 bug 单的链接。或者修复一个 issue，可以贴上 issue 的链接，把issue close 掉。

footer: 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接。

### 本地开发阶段增加precommit钩子

#### 安装husky

```bash
npm i husky -D
```

#### 通过commitmsg钩子校验信息

```bash
npm i vilidate-commit-msg conventional-changelog-cli -D
```

```json
"scripts": {
  "commitmsg": "vilidate-commit-msg",
  "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
}
```

vilidate-commit-msg 也是尊从 angularjs 提交规范，每次 git commit 的时候，就会通过 vilidate-commit-msg 去检查这一次提交 git 的格式，如果是符合规范的，它就会允许你提交上去，不符合规范，就会提交失败。

每次发布版本的时候可以运行 changelog 这个命令，可以很方便的生成一个 changelog 文档出来，这个版本信息就会全部的生成出来，包括两块内容，一个是 bugfix，对应于 fix；一个是 feature，对应于 feat。



## 语义化版本（Semantic Versioning）规范格式

### 开源项目版本信息案例（react）

软件的版本通常由三位组成，形如：X.Y.Z

版本是严格递增的，此处是：16.2.0 -> 16.3.0 -> 16.3.1

在发布重要版本时，可以发布 alpha，beta，rc 等先行版本

alpha 和 rc 等修饰版本的关键字后面可 以带上次数和 meta 信息

![react版本信息](/Users/zhaoyang/tool/前端知识体系/前端工程实践/webpack/images/react版本信息.png)

### 遵守 semver 规范的优势

semver 规范是 github 提出来，当时也是为了解决软件开发领域里面依赖地狱的问题，主要是用来规范依赖的软件包，在日常的开发过程中，会依赖各种各样的依赖，这个依赖它也会依赖其他的依赖，这是就很容易形成一个依赖地狱，如果一旦依赖的版本号，没有一个很好的规范，很容易出现一些循环依赖，或者依赖之间会有一些冲突，尊从 semver 这个规范就能避免这个问题。

优势：

	* 避免出现循环依赖
	* 依赖冲入减少

### 语义化版本（Semantic Versioning）规范格式

主版本号：当你做了不兼容的API修改

次版本号：当你做了向下兼容的功能性新增

修订号：当你做了向下兼容的问题修复

### 先行版本号

先行版本号可以作为发布正式版之前的版本，格式是在修订版本号后面加上一个连接号（-），再加上一连串以点（.）分割的标识符，标识符可以由英文数字和连接号（[0-9A-Za-z-]）组成。

* alpha：是内部测试版，一般不向外发布，会有很多bug。一般只有测试人员使用。

* beta：是外部小范围的测试版，这个阶段的版本会一直加入新的功能。在alhpa版之后推出。

* rc：Release Candidate，公测，系统平台上就是发行候选版本。rc版不会再加入新的功能，主要着重于除错。