# nginx简介

nginx是一个高性能的HTTP和反向代理Web服务器，也可以做邮件代理服务器，优点是占用内存小，高性能，高并发。

市面常见服务器：

* IIS：微软提供的基于windows系统的服务器，windows服务器在性能上和稳定性上都不如类UNIX操作系统，因此需要高性能web服务器的场合，不合适。
* Tomcat：是一个重量级的Web服务器，对静态文件和高并发的处理比较弱。

nginx优点：

* 速度更快，并发更高（采用了多进程和IO多路复用）：无论单词请求还是高并发请求，nginx都比其他web服务器响应速度更快。
* 配置简单，扩展性强：nginx的设计极具扩展性，可以通过配置文件来天津有很多官方模块和第三方模块。
* 高可靠性：nginx的多进程有一个master主进程和多个worker进程，主进程可以再某一个worker进程出错时，会快速拉起新的worker进程提供服务。
* 热部署：可以再对nginx不停止的情况下，对nginx进行文件升级，更新配置和跟换日志文件等功能。
* 成本低、BSD许可：nginx是使用的BSD开源许可证。免费、可修改源码、无版权说明。所以nginx可以应用在商业领域，并修改源码定制需求。如：OpenRestry[nginx + lua]   Tengine[淘宝定制的nginx]。

nginx功能特性：

* 基本http服务
  * 静态资源部署、处理索引文件以及支持自动索引
  * 反向代理，并可以使用缓存加上反向代理，同时完成负载均衡和容错
  * 提供对FastCGI、memcached等服务的缓存机制，同时完成负载均衡和容错
  * 使用nginx的模块化特性提供过滤器功能，nginx基本过滤器包括gzip压缩、ranges支持、chunked响应、XSLT、SSI以及图像缩放等，其中针对包含多个SSI的页面，经由FastCGI或反向代理，SSI过滤器可以并行处理。
  * 支持HTTP下的安全套接层安全协议SSL
  * 支持基于加权和依赖的优先权的HTTP/2
* 高级http服务
  * 支持基于名字和IP的虚拟主机设置
  * 支持HTTP/1.0中的KEEP-Alive模式和管线（PipeLined）模型连接
  * 字段有访问日志格式、带缓存的日志写操作以及快速日志轮转
  * 提供3xx-5xx错误代码重定向功能
  * 支持重写（Rewrite）模块扩展
  * 支持重新加载配置以及在线升级时无需终端正在处理的请求
  * 支持网络监控
  * 支持FLV和MP4流媒体传输
* 邮件服务（不常见）
  * 支持IMPA/POP3代理服务功能
  * 支持内部SMTP代理服务功能

nginx常用功能：

* 静态资源部署
* Rewrite地址重写（正则表达式）
* 反向代理
* 负载均衡（算法：轮询、加权轮询、ip_hash、url_hash、fair）
* web缓存
* 环境部署（搭建高可用的环境）
* 用户认证模块
* ...

nginx核心组成：

* 二进制可执行文件（启动、重新加载、关闭nginx）
* nginx.conf配置文件
* error.log错误日志记录
* access.log访问日志记录

nginx进程：

* master主进程：负责管理所有的worker进程
* worker工作进程：用来接收和处理用户的请求

# 安装

## 环境准备

1. 确认centos内核

   准备一个内核为2.6及以上的操作系统，因为linux2.6及以上才支持epoll，而nginx解决高并发用的就是epoll。

   ```bash
   #查询linux内核版本
   uname -a 
   ```

2. 确保centos能联网

   ```bash
   ping www.baidu.com
   ```

3. 确认关闭防火墙

   关闭防火墙可以省略nginx学习过程中遇到的诸多问题。

   ```bash
   systemctl status firewalld #查看防火墙状态
   systemctl stop firewalld #关闭防火墙，系统重新启动后，防火墙重新打开
   systemctl disable firewalld #关闭防火墙，系统重新启动后，防火墙依然关闭
   ```

4. 确认停用selinux

   selinux是linux中的安全子系统，学习nginx时，会多很多设置，所以建议关闭。

   ```bash
   #查看selinux状态
   sestatus
   #如果不是disabled状态，可以通过修改配置来关闭
   vim /etc/selinux/config #注释SELINUX=enforcing 填写SELINUX=disabled
   ```

## nginx安装

**安装方式（centos）**

* 通过nginx源码安装
  * 源码安装提前准备
  * 通过nginx源码简单安装
  * 通过nginx源码复杂安装
* 通过yum安装

**源码安装提前准备**

* GCC编译器：nginx是使用C语言编写的程序，因此想要运行nginx就需要安装一个编译工具。GCC是一个开源的编译器集合，用户处理各种各样的语言，其中就包含C语言。

  ```bash
  yum install -y gcc #安装
  gcc --version #检查是否安装成功
  ```

* PCRE：nginx在编译过程中需要使用到PCRE库（兼容正则表达式库），nginx的一些模块中会使用到正则表达式。

  ```bash
  yum install -y pcre pcre-devel #安装
  rpm -qa pcre pcre-devel #检查是否安装成功
  ```

* zlib：zlib库提供了压缩算法，在nginx的各个模块中需要使用gzip压缩算法

  ```bash
  yum install -y zlib zlib-devel #安装
  rpm -qa zlib zlib-devel #检查是否安装成功
  ```

* OpenSSL：应用程序可以通过这个开源软件库包进行安全通信，nginx中如果想要使用https就需要用到OpenSSL

  ```bash
  yum install -y openssl openssl-devel #安装
  rpm -qa zlib zlib-devel #检查是否安装成功
  ```

**通过nginx源码简单安装**

1. 进入官网查找要下载版本的链接地址，然后使用wget命令进行下载

   ```basj
   wget https://nginx.org/download/nginx-1.16.1.tar.gz
   ```

2. 将下载的资源放入指定目录

   ```bash
   mkdir -p nginx/core
   mv nginx-1.16.1.tar.gz nginx/core
   ```

3. 解压缩

   ```bash
   tar -xzf nginx-1.16.1.tar.gz
   ```

4. 进入解压后的文件中，找到configure并执行

   ```bash
   ./configure
   ```

5. 编译

   ```bash
   make
   ```

6. 安装

   ```bash
   make install
   ```

注：安装成功后，默认会将nginx安装到`/usr/local/nginx`中，可以进入nginx中的sbin目录找到nginx可执行文件来启动nginx，启动后就可以在浏览器中访问到ngnix服务了。

**通过yum安装**

根据官方文档步骤安装即可

1. 安装yum-utils

   ```bash
   sudo yum install -y yum-utils
   ```

2. 编辑`/etc/yum.repos.d/nginx.repo`文件，复制官网内容

   ```bash
   vim /etc/yum.repos.d/nginx.repo
   ```

   ```repo
   [nginx-stable]
   name=nginx stable repo
   baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
   gpgcheck=1
   enabled=1
   gpgkey=https://nginx.org/keys/nginx_signing.key
   module_hotfixes=true
   
   [nginx-mainline]
   name=nginx mainline repo
   baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
   gpgcheck=1
   enabled=0
   gpgkey=https://nginx.org/keys/nginx_signing.key
   module_hotfixes=true
   ```

3. 安装

   ```bash
   sudo yum install -y nginx
   ```

**macOS安装nginx** 

- 安装brew `/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"`
- `brew install nginx`
- `brew info nginx` 查看nginx

# 常用命令

管理员可以给nginx主进程发送信号来管理worker进程。

1. 使用nginx命令的前提条件：必须进入nginx的目录。linux：`usr/local/nginx/sbin` mac homebrew： `/opt/homebrew/etc/nginx/nginx.conf` mac：`/usr/local/etc/nginx`
2. 查看版本号 `nginx -v`
3. 启动nginx  `nginx`
4. 关闭nginx `nginx -s stop`
5. 重新加载nginx `nginx -s reload`
6. 重启 nginx `nginx -s reopen` 
7. `nginx -t` 测试配置文件语法，获得配置文件路径
8. `nginx -c /usr/local/etc/nginx/nginx.conf -c`  指定 nginx 配件文件

# 配置文件

管理员可以给nginx主进程发送信号来管理worker进程。

配置文件位置：linux：`usr/local/nginx/conf/nginx.conf` 

nginx配置文件组成：

1. 全局块：从配置开始一直到events块之间的内容，主要会设置一些影响nginx服务器整体运行的配置指令。

   * user：用于配置运行nginx服务器的worker进程的用户和用户组，这样对于系统的权限访问控制会更加精细和安全。

     ```
     user 用户名 [用户组名，可选，如果不写默认跟用户名一致]; #默认值nobody
     ```

   * master_process：用来指定是否开启工作进程

     ```
     master_process on|off; #默认值off
     ```

   * worder_process：允许生成的worder进程的数数量，这是nginx服务器实现并发处理服务的关键。理论上配置的数量越大，可以支持的并发处理量越多，但事实上这个值的设定是需要受到服务器自身的限制，建议将该值和服务器cpu内核数保持一致。

     ```
     worder_process num/auto; #默认值1
     ```

   * deamon：设定nginx是否以守护进程的方式启动。守护进程是linux后台执行的一种服务进程，特点是独立于控制终端，不会随着终端关闭而停止。

     ```
     deamon on|off; #默认值on
     ```

   * pid：用来配置nginx当前master进程的进程号id存储的文件路径。

     ```
     pid 文件路径; #默认值/usr/local/nginx/logs/nginx.pid
     ```

   * error_log：用来配置nginx的错误日志存放路径和日志级别

     ```
     error_log 文件路径 [日志级别]; #默认值logs/error.log error
     ```

     error_log的配置位置可以在：全局块、http块、server块、location块。

     日志级别：debug|info|notice|warn|error|crit|alert|emerg，分别为调试|信息|通知|警告|错误|临界|警报|紧急，日志级别越来越高，日志基本越高输出的内容越少。这块建议不要设置成info以下的等级，因为会带来大量的磁盘I/O销毁，影响nginx性能。

   * include：用来引入其他的ngnix配置文件，使nginx的配置更加灵活，可以在配置文件中的任何位置配置include。

     ```
     include 文件路径;
     ```

2. events块：events块涉及的指令主要影响nginx服务器与用户的网络连接，常用的设置包括是否开启对多work process下的网络连接进行序列化，是否允许同时接收多个网络连接，选取哪种事件驱动模型来处理连接请求，每个word process可以同时支持的最大连接数等。

   worker_connections  1024; 表示每个word process支持的最大连接数为1024

   这部分的配置对nginx的性能影响较大，在实际中应该灵活配置。

3. http块：包括http全局块和多个server块。

   1. http全局块：http全局块包括文件引入、MIME-TYPE定义、日志自定义、连接超时时间、单链接请求数上限等。

   2. server块：包括全局server块和多个location块。

      server块和虚拟主机有密切关系，每个server块就相当于一个虚拟主机，虚拟主机从用户角度看，和一台独立的硬件主机是完全一样的，该技术的产生是为了节省互联网服务器硬件成本。

      1. 全局server块：最常见的配置是本虚拟主机的监听配置和本虚拟主机的名称或IP配置
      2. location块：这块的主要作用是基于nginx服务区器接收到的请求字符串（例如server_name/uri-string），对虚拟主机名称（也可以是IP名词）之外的字符串（例如前面的/uri-string）进行匹配，对待定的请求进行处理，地址定向、数据缓存和应答控制等功能，还有许多第三方模块的配置也在这里进行。

# 反向代理

正向代理：为客户端服务，隐藏客户端，在客户端配置代理服务器，通过代理服务器进行互联网的访问（翻墙）

反向代理：为服务器服务，隐藏服务端。客户端对代理是无感知的，因为客户端不需要做任何代理配置就可以访问，客户端只需要将请求发送给反向代理服务器，由反向代理服务器去选择目标服务器，获取数据后再返回给客户端，反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器，隐藏了真实服务器的IP地址。

# 负载均衡

负载均衡是一种在多个服务器或资源之间分配网络流量的技术，以确保没有单个服务器变得过于繁忙，从而优化网络服务的性能，提高响应速度和系统的可靠性。当客户端发送多个请求到服务器，单个服务器解决不了时，我们可以增加服务器的数量（集群），然后将请求平均分发到各个服务器上，这个过程就是负载均衡。

# 动静分离

动静分离将静态内容（**静态内容**指的是不经常变化或不依赖于用户输入和服务器处理的内容，如HTML文件、CSS样式表、JavaScript文件、图像、视频等）部署到专门的静态资源服务器上，将动态内容（**动态内容**指的是根据用户输入、数据库查询或服务器处理而生成的内容，如通过PHP、Java、Ruby等服务器端语言动态生成的HTML页面。）部署到主服务器上，将不同资源部署在不同服务器，这样做能够加快解析速度，降低原来单个服务器的压力。然后nginx会根据请求的资源类型，分别到不同的服务器上获取资源。

# nginx配置实例-反向代理

```nginx
# 转发到一个目标服务
server {
  listen 80;
  server_name 192.168.17.129; # 客户端访问的nginx地址
  
  location / {
    proxy_pass http://127.0.0.1:8080; #nginx转发的目标地址
  }
}

# 根据访问路径不同，转发到多个目标服务
server {
  listen 9001;
  server_name 192.168.17.129; # 客户端访问的nginx地址
  
  location ~ /edu/ {
    proxy_pass http://127.0.0.1:8080; #nginx转发的目标地址
  }
  
  location ~ /vod/ {
    proxy_pass http://127.0.0.1:8081; #nginx转发的目标地址
  }
}
```

# nginx配置实例-负载均衡

```nginx
# 将客户端请求平均分配到多个服务器上
http {
  upstream myserver自定义名字 {
    server 192.168.17.129:8080 weight=1; # 服务器1
    server 192.168.17.129:8080 weight=1; # 服务器2
  }
  
  server {
    location / {
      proxy_pass http://myserver;
    }
  }
}
```

# nginx配置实例-动静分离

后端静态资源服务器的目录结构：/data/www/a.html   /data/image/1.jpg

```nginx
# 根据访问路径指定具体资源的位置
server {
  listen 80;
  server_name 192.168.17.129;
  
  location /www/ {
    root /data/; # 指定根目录
    index index.html index.htm;
  }
  
  location /image/ {
    root /data/; # 指定根目录
    autoindex on; # 列出文件目录
  }
}
```

# nginx原理

nginx启动后会有master和worker两个进程，master用于管理和分配任务，worker用于完成实际任务。

多个worker使用争抢的机制去master中争抢任务。
