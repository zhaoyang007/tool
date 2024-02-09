# 上线方案

1. 手动部署
   * 纯手动scp上传代码
   * 纯手动登录服务器，git pull，然后再打包构建
   * 纯手动xftp上传代码
2. 自动部署
   1. 执行脚本命令
   2. CICD

# GitLab

[gitlab官方中文文档](https://docs.gitlab.cn/jh/index.html)

搭建gitlab及其cicd主要涉及：

* 私有仓库（gitlab）
* CICD
  * gitlab-runner
  * 流水线

## 私有仓库（gitlab）

**基础步骤**

1. 安装GitLab

   ```bash
   #安装依赖
   sudo yum install -y curl policycoreutils-python openssh-server perl
   #添加GitLab官方仓库
   curl -sS https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | sudo bash
   #安装GitLab
   sudo yum install -y gitlab-ce
   ```

2. 检查版本

   ```bash
   cat /opt/gitlab/embedded/service/gitlab-rails/VERSION
   ```

3. 修改gitlab访问地址

   ```bash
   vim /etc/gitlab/gitlab.rb
   修改该行external_url 'http://123.57.18.20:9001'
   ```

4. 更新配置

   ```bash
   gitlab-ctl reconfigure
   ```

5. 启动gitlab

   ```bash
   gitlab-ctl start
   ```

6. 访问gitlab web页面

   用户名：`root`

   密码：`cat /etc/gitlab/initial_root_password`

7. 修改密码

   web页面：编辑用户给用户设置密码

8. 创建项目

9. 添加用户

   web页面：左下角Admin Area > Users > New user > 填写name username(登录用户名) email

10. 修改密码（root和其他成员一致）

    web页面：编辑用户给用户设置密码，然后发送给成员 > 用户登录成功后，系统会提示修改密码

11. 在项目中，拉取成员

    web页面：选择项目 > Manage > Members > Invite members > 选择成员及角色

**常用命令**

```bash
#启动
gitlab-ctl start
#停止
gitlab-ctl stop
#重启
gitlab-ctl restart
#查看状态
gitlab-ctl status
#更新配置
gitlab-ctl reconfigure
#查看日志
gitlab-ctl tail
#删除gitlab数据，重新白手起家
gitlab-ctl cleanse 
#查看所有服务配置文件信息
gitlab-ctl show-config 
#列举所有启动服务
gitlab-ctl service-list 
#备份数据
gitlab-rake gitlab:backup:create
#恢复数据
gitlab-rake gitlab:backup:restore


#系统服务
#启动GitLab
systemctl enable gitlab-runsvdir
systemctl start gitlab-runsvdir
```

**卸载**

```bash
#停止gitlab，删除用户和组
sudo gitlab-ctl stop && sudo gitlab-ctl remove-accounts
#删除所有数据
sudo gitlab-ctl cleanse && sudo rm -r /opt/gitlab
sudo rm -rf /etc/gitlab /opt/gitlab /var/opt/gitlab /var/log/gitlab
#停止gitlab服务
sudo systemctl stop gitlab-runsvdir
sudo systemctl disable gitlab-runsvdir
#卸载
sudo gitlab-ctl uninstall
sudo yum remove gitlab-ce
```

## CICD

CI/CD 是一种持续的软件开发方法，您可以在其中持续构建、测试、部署和监视迭代代码更改。

### gitlab-runner

**基础步骤**

1. 安装gitlab-runner

   GitLab Runner是一个与 GitLab CI/CD 配合使用以在管道中运行作业的应用程序。

   ```bash
   #添加GitLab Runner仓库
   curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh | sudo bash
   
   #安装最新版本
   sudo yum install -y gitlab-runner
   #安装指定版本
   sudo yum install gitlab-runner-16.5.0-1
   ```

2. 获取注册令牌

   设置 > CI/CD > Runner 展开 > 新建项目runner > 选择一个平台 > 可选。输入runner配置（标签、描述等） > 提交

   标签作用：可以在 `.gitlab-ci.yml` 中的作业定义中使用这些标签来选择特定的 Runner。

3. 注册gitlab-runner：`gitlab-runner register`

   注册Runner是将Runner与GitLab实例关联的过程。

   1. 实例URL：https://gitlab.com

      * 如果您的项目托管在`gitlab.example.com/yourname/yourproject`上，则实例URL为`https://gitlab.example.com`。

      * 如果您的项目托管在`GitLab.com`上，则 URL 为`https://gitlab.com`。

   2. 令牌

   3. runner名称

   4. 执行器（例如 `shell`、`docker` 等）

   示例：

   ```bash
   gitlab-runner register
   gitlab-runner register  --url http://123.57.18.20:9001  --token glrt-K9xxC9vk2JuVSNfWZ19y
   ```

   使用[非交互模式](https://docs.gitlab.cn/runner/commands/index.html#non-interactive-registration)附加参数来注册运行器：

   ```bash
   sudo gitlab-runner register \
     --non-interactive \
     --url "https://gitlab.com/" \
     --token "$RUNNER_TOKEN" \
     --executor "docker" \
     --docker-image alpine:latest \
     --description "docker-runner"
   ```

4. 可以使用`config.toml`来定义更[高级的运行器配置](https://docs.gitlab.cn/runner/configuration/advanced-configuration.html)。

   ```ini
   [[runners]]
   name = "my-project-runner1"
   url = "http://127.0.0.1:3000"
   id = 38
   token = "glrt-TOKEN"
   token_obtained_at = 2023-07-05T08:56:33Z
   token_expires_at = 0001-01-01T00:00:00Z
   executor = "shell"
   ```

5. Runner范围

   - [共享 runners](https://docs.gitlab.cn/ee/ci/runners/runners_scope.html#shared-runners)，可用于极狐GitLab 实例中的所有群组和项目。
   - [群组 runners](https://docs.gitlab.cn/ee/ci/runners/runners_scope.html#group-runners)，可用于群组中的所有项目和子组。
   - [项目 runners](https://docs.gitlab.cn/ee/ci/runners/runners_scope.html#project-runners) 与特定项目相关联。通常，项目 runner 只用于一个项目。

   runner的范围是在注册期间定义的。这就是runner如何知道它可用于哪些项目的方式。

6. 运行gitlab-runner：`gitlab-runner run`

7. 准备gitlab远程项目

8. 定义流水线

   ```yml
   stages:
     - build
     - test
     - deploy
   
   build_job:
     stage: build
     script:
       - echo "Building the project..."
       # 添加构建项目的命令
     tags: 
       - shared
   
   test_job:
     stage: test
     script:
       - echo "Running tests..."
       # 添加运行测试的命令
   	tags: 
       - shared
   
   deploy_job:
     stage: deploy
     script:
       - echo "Deploying to production..."
       # 添加部署到生产环境的命令
     tags: 
       - shared
   ```

9. 提交并观察

   1. 提交代码变更：当您向仓库提交更改时，GitLab 会自动根据 `.gitlab-ci.yml` 文件中定义的规则来执行 CI/CD 流程。
   2. 监控流水线状态：在 GitLab 的 UI 中，您可以监控流水线的状态，查看每个阶段和作业的执行情况。
      1. 在左侧边栏上，选择**“搜索”或转到**并查找您的项目。
      2. 选择**“构建”>“流水线”**。
      3. 选择**运行管道**。

**gitlab-runner常用命令**

```bash
#注册
gitlab-runner register
#注销
gitlab-runner unregister --name <Runner名称>
#启动
gitlab-runner start
#停止
gitlab-runner stop
#重启
gitlab-runner restart
#查看状态
gitlab-runner status
#查看是否可用
gitlab-runner verify
#列出已注册的Runner
gitlab-runner list
#卸载Runner
gitlab-runner uninstall
#更新Runner
gitlab-runner exec shell git pull
#查看日志
gitlab-runner logs
#执行单个作业
gitlab-runner exec shell <job_name>
```

### 流水线

文档：https://docs.gitlab.com/ee/ci/yaml/

要使用 GitLab CI/CD，您需要从项目根目录下的一个文件开始，其中包含 CI/CD 管道的配置。该文件遵循 YAML 格式并具有自己的语法。

您可以将此文件命名为任何您想要的名称，但这`.gitlab-ci.yml`是最常见的名称。

在该`.gitlab-ci.yml`文件中，您可以定义：

- 您想要完成的任务，例如测试和部署应用程序。
- 您想要包含的其他配置文件和模板。
- 依赖项和缓存。
- 您想要按顺序运行的命令和想要并行运行的命令。
- 将应用程序部署到的位置。
- 您是要自动运行脚本还是手动触发其中的任何脚本。

**基础结构**

1. **stages(阶段)**:

   - 定义流水线中的阶段（stage）。每个阶段包含一个或多个作业（job）。
   - 示例：`stages: [build, test, deploy]`

2. **job(作业)**:

   - 定义流水线中的作业。作业是流水线的基本组成部分，每个作业都属于一个阶段。

   - 示例：

     ```yml
     build_job:
       stage: build
       script:
         - echo "Building the project"
     ```

**作业配置**

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

**高级配置**

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
     rules:
       - if: '$CI_COMMIT_BRANCH == "master"'
       - when: manual
     ```

这些是 `.gitlab-ci.yml` 文件中常用的一些关键语法。GitLab CI/CD 提供了大量的配置选项，可用于创建复杂和高度定制化的流水线。更完整和详细的语法和选项可以在 GitLab 的官方文档中找到。

**基础配置示例**

1. **定义构建阶段**：指定如何构建项目。例如，您可以添加一个阶段来编译代码或创建 Docker 镜像。
2. **定义测试阶段**：设置自动化测试来验证代码的质量。这可能包括单元测试、集成测试等。
3. **定义部署阶段**：定义如何将代码部署到生产或预发布环境。

```yml
stages:
  - build
  - test
  - deploy

build_job:
  stage: build
  script:
    - echo "Building the project..."
    # 添加构建项目的命令

test_job:
  stage: test
  script:
    - echo "Running tests..."
    # 添加运行测试的命令

deploy_job:
  stage: deploy
  script:
    - echo "Deploying to production..."
    # 添加部署到生产环境的命令
```

# jenkins

安装java

安装jenkins

jenkins使用和配置
