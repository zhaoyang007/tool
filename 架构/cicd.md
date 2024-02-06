# 上线方案

1. 手动部署
   * 纯手动scp上传代码
   * 纯手动登录服务器，git pull，然后再打包构建
   * 纯手动xftp上传代码
2. 自动部署
   1. 执行脚本命令
   2. CICD

# GitLab私有仓库

1. 安装GitLab

2. 配置GitLab
3. 创建私有仓库
4. 管理访问权限

# GitLab CI/CD

CI/CD 是一种持续的软件开发方法，您可以在其中持续构建、测试、部署和监视迭代代码更改。

## 常用术语

* .gitlab-ci.yml
* gitlab-runner
* 管道：由作业和阶段组成
  - **作业**定义了你想做什么。例如，测试代码更改或部署到暂存环境。
    - 每个作业都包含一个脚本部分并属于一个阶段
  - 工作分为**多个阶段**。每个阶段至少包含一项工作。典型的阶段可能是`build`、、`test`和`deploy`。

## .gitlab-ci.yml

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

## gitlab-runner

gitlab-runner是运行你的工作的代理。这些代理可以在物理机或虚拟实例上运行。在您的`.gitlab-ci.yml`文件中，您可以指定运行作业时要使用的容器映像。运行程序加载图像，克隆您的项目并在本地或容器中运行作业。

GitLab Runner 是一个与 GitLab CI/CD 配合使用以在管道中运行作业的应用程序。

### 安装runner

出于兼容性原因，GitLab Runner主要.次要版本应与 GitLab 主要和次要版本保持同步。

### 注册runner

注册Runner是将Runner与GitLab实例关联的过程。

**1.获取 GitLab 实例的 URL 和注册令牌**：

- 在 GitLab 网站中，导航到您的项目的 **Settings > CI/CD**。
- 展开 **Runners** 部分，您会找到注册令牌。

**创建个人访问令牌**

1. 在左侧边栏上，选择您的头像。
2. 选择**编辑个人资料**。
3. 在左侧边栏上，选择**访问令牌**。
4. 选择**添加新令牌**。
5. 输入令牌的名称和到期日期。
   - 该令牌将于该日期午夜 UTC 到期。
   - 如果您不输入到期日期，到期日期将自动设置为当前日期之后 365 天。
   - 默认情况下，该日期最多可以晚于当前日期 365 天。
6. 在**选择范围**部分中，选中**create_runner**复选框。
7. 选择**创建个人访问令牌**。

**2.在服务器上注册 Runner**

在具有 GitLab Runner 的服务器上，运行命令`gitlab-runner register`开始注册过程：

- 当提示时输入您的 GitLab 实例 URL。
  - 如果您的项目托管在 上`gitlab.example.com/yourname/yourproject`，则您的 GitLab 实例 URL 为`https://gitlab.example.com`。
  - 如果您的项目托管在 GitLab.com 上，则 URL 为`https://gitlab.com`。
- 输入之前获取的注册令牌。
- 输入此 Runner 的描述（例如 `my-runner`）。
- 输入标签（逗号分隔），标签用于选择特定的 Runner 来运行作业。
- 选择执行器（例如 `shell`、`docker` 等）。
  - 对于`executor`，因为您的运行程序将直接在主机上运行，所以输入`shell`。执行器是运行器执行作业的环境。当您注册跑步者时，必须选择一个执行器。执行器通常在安装了 GitLab Runner 的同一台机器上处理作业。执行器决定每个作业运行的环境。

要在同一主机上注册多个运行程序（每个运行程序具有不同的配置），请重复该`register`命令。要在多台主机上注册相同的配置，请为每个运行器注册使用相同的运行器身份验证令牌。有关更多信息，请参阅[重用运行器配置](https://docs.gitlab.com/runner/fleet_scaling/index.html#reusing-a-runner-configuration)。

您还可以使用[非交互模式](https://docs.gitlab.com/runner/commands/index.html#non-interactive-registration)使用附加参数来注册运行器：

```bash
sudo gitlab-runner register \
  --non-interactive \
  --url "https://gitlab.com/" \
  --token "$RUNNER_TOKEN" \
  --executor "docker" \
  --docker-image alpine:latest \
  --description "docker-runner"
```



### 配置和使用 Runner

1. **配置 `.gitlab-ci.yml`**：
   - 在您的项目根目录中创建或修改 `.gitlab-ci.yml` 文件，定义您的 CI/CD 流水线。
2. **使用标签运行特定 Runner**：
   - 如果您在注册 Runner 时指定了标签，您可以在 `.gitlab-ci.yml` 中的作业定义中使用这些标签来选择特定的 Runner。
3. **监控和管理 Runner**：
   - 在 GitLab 网站的 **Settings > CI/CD** 下的 **Runners** 部分，您可以看到所有注册的 Runner。
   - 您可以在这里启用/禁用 Runner 或查看其状态。

可以使用`config.toml`来定义更[高级的运行器配置](https://docs.gitlab.com/runner/configuration/advanced-configuration.html)。

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

重新加载配置：`gitlab-runner restart`

### 维护和更新 Runner

- 定期检查更新并根据 GitLab Runner 文档更新您的 Runner。
- 监控 Runner 的性能和日志，确保它正常运行。

### 谁有权在GitLab UI中访问运行器(runner)

根据您想要访问的对象，runner分为三种类型：

- [共享运行器](https://docs.gitlab.com/ee/ci/runners/runners_scope.html#shared-runners)可供所有项目使用
- [团体赛](https://docs.gitlab.com/ee/ci/runners/runners_scope.html#group-runners)适用于团体中的所有项目和子团体
- [项目运行者](https://docs.gitlab.com/ee/ci/runners/runners_scope.html#project-runners)适用于单个项目

runner的范围是在注册期间定义的。这就是跑步者如何知道它可用于哪些项目的方式。

### 标签

当您注册跑步者时，您可以为其 添加[**标签。**](https://docs.gitlab.com/ee/ci/yaml/index.html#tags)

**使用标签运行特定 Runner**：

- 如果您在注册 Runner 时指定了标签，您可以在 `.gitlab-ci.yml` 中的作业定义中使用这些标签来选择特定的 Runner。

当 CI/CD 作业运行时，它通过查看分配的标签知道要使用哪个运行器。标签是过滤作业可用运行者列表的唯一方法。

例如，如果跑步者具有标签`ruby`，您可以将此代码添加到项目的`.gitlab-ci.yml`文件中：

```
job:
  tags:
    - ruby
```

当作业运行时，它使用带有`ruby`标签的运行器。

### 配置runner

您可以通过编辑文件来[**配置**](https://docs.gitlab.com/runner/configuration/advanced-configuration.html) 运行器`config.toml`。这是在运行程序安装过程中安装的文件。

在此文件中，您可以编辑特定跑步者或所有跑步者的设置。

您可以指定日志记录和缓存等设置。您可以设置并发、内存、CPU 限制等。

### 监控runner

您可以使用 Prometheus 来[**监控**](https://docs.gitlab.com/runner/monitoring/index.html)您的跑步者。您可以查看当前正在运行的作业数量以及运行程序使用的 CPU 数量等信息。

在 GitLab 网站的 **Settings > CI/CD** 下的 **Runners** 部分，您可以看到所有注册的 Runner。

您可以在这里启用/禁用 Runner 或查看其状态。

### 使用runner来运行作业

配置运行程序并将其可用于您的项目后，您的 [CI/CD](https://docs.gitlab.com/ee/ci/index.html)作业就可以使用该运行程序。

## CICD步骤

### 创建.gitlab-ci.yml

#### 基础结构

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
     rules:
       - if: '$CI_COMMIT_BRANCH == "master"'
       - when: manual
     ```

这些是 `.gitlab-ci.yml` 文件中常用的一些关键语法。GitLab CI/CD 提供了大量的配置选项，可用于创建复杂和高度定制化的流水线。更完整和详细的语法和选项可以在 GitLab 的官方文档中找到。

### 定义流水线

1. **定义构建阶段**:
   - 指定如何构建项目。例如，您可以添加一个阶段来编译代码或创建 Docker 镜像。
2. **定义测试阶段**:
   - 设置自动化测试来验证代码的质量。这可能包括单元测试、集成测试等。
3. **定义部署阶段**:
   - 定义如何将代码部署到生产或预发布环境。

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

### 使用GitLab Runner

### 提交并观察

1. 提交代码变更
   - 当您向仓库提交更改时，GitLab 会自动根据 `.gitlab-ci.yml` 文件中定义的规则来执行 CI/CD 流程。
2. 监控流水线状态
   - 在 GitLab 的 UI 中，您可以监控流水线的状态，查看每个阶段和作业的执行情况。

以便您可以查看运行程序执行作业。

1. 在左侧边栏上，选择**“搜索”或转到**并查找您的项目。
2. 选择**“构建”>“管道”**。
3. 选择**运行管道**。
4. 选择一个作业以查看作业日志。输出应类似于此示例

### 调整和优化

您可以通过修改 `.gitlab-ci.yml` 文件来调整流程，添加更多阶段，或优化现有作业。

# jenkins

安装java

安装jenkins

jenkins使用和配置

