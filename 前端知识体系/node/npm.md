##### 重新安装项目所有依赖

```bash
npm reinstall
```

或

```bash
rm -rf node_modules && npm cache clean && npm install
```

##### 重新安装某个依赖：先卸载，再安装

```bash
npm uninstall ant-design-vue
```

```bash
npm install ant-design-vue@1.4.11
```

##### 依赖更新到最新版本

```bash
npm update ant-design-vue
```

