#!/usr/bin/env bash
npm config get registry # 检查npm仓库
npm config set registry=https://registry.npmjs.org
echo '请进行登录相关操作'
npm login
echo '-------publishing-------'
npm publish
# npm config set registry=https://registry.npm.taobao.org
echo '发布完成'
exit