# 代码上线方案

1. 手动部署
   * 纯手动scp上传代码
   * 纯手动登录服务器，git pull，然后再打包构建
   * 纯手动xftp上传代码
2. 自动部署
   1. 执行脚本命令
   2. CICD

# 创建gitlab私有仓库

1. 安装GitLab

2. 配置GitLab
3. 创建私有仓库
4. 管理访问权限

# CICD

## gitlab-runner

### 安装gitlab-runner

### 创建.gitlab-ci.yml

#### 基础结构

1. **stages(阶段)**:

   - 定义流水线中的阶段（stage）。每个阶段包含一个或多个作业（job）。
   - 示例：`stages: [build, test, deploy]`

2. **job(作业)**:

   - 定义流水线中的作业。作业是流水线的基本组成部分，每个作业都属于一个阶段。

   - 示例：

     ```yml
     yamlCopy code
     build_job:
       stage: build
       script:
         - echo "Building the project"
     ```

#### 作业配置

1. **script**:
   - 定义在作业运行时要执行的命令序列。
   - 示例：`script: [npm install, npm run build]`
2. **only/except**:
   - 控制作业执行的分支或标签的条件。
   - 示例：`only: [master]`，`except: [develop]`
3. **tags**:
   - 为作业分配标签，以决定哪个 Runner 应该执行该作业。
   - 示例：`tags: [linux, docker]`
4. **image**:
   - 指定用于作业的 Docker 镜像。
   - 示例：`image: node:latest`
5. **cache**:
   - 定义要在作业间缓存的文件或目录。
   - 示例：`cache: { paths: [node_modules/] }`
6. **artifacts**:
   - 指定作业完成后要保存的文件或目录。
   - 示例：`artifacts: { paths: [build/] }`

#### 高级配置

1. **before_script/after_script**:

   - 在每个作业的 `script` 执行前/后运行的命令。
   - 示例：`before_script: [echo "Prepare the environment"]`

2. **variables**:

   - 定义作业中可用的环境变量。
   - 示例：`variables: { NODE_ENV: "production" }`

3. **include**:

   - 引入外部 YAML 文件以重用配置。
   - 示例：`include: 'common_definitions.yml'`

4. **stages**:

   - 定义在流水线中使用的阶段。
   - 示例：`stages: [build, test, deploy]`

5. **when**:

   - 控制作业执行的时机（例如：always, on_success, on_failure）。
   - 示例：`when: on_failure`

6. **environment**:

   - 为部署作业定义环境（如 staging, production）。
   - 示例：`environment: production`

7. **extends**:

   - 允许作业继承其他作业的配置。
   - 示例：`extends: .base_template`

8. **rules**:

   - 更复杂的方式来控制作业的执行条件。

   - 示例：

     ```yml
     yamlCopy code
     rules:
       - if: '$CI_COMMIT_BRANCH == "master"'
       - when: manual
     ```

这些是 `.gitlab-ci.yml` 文件中常用的一些关键语法。GitLab CI/CD 提供了大量的配置选项，可用于创建复杂和高度定制化的流水线。更完整和详细的语法和选项可以在 GitLab 的官方文档中找到。

### 定义流水线

## jenkins

安装java

安装jenkins

jenkins使用和配置

