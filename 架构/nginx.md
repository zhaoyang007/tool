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

     ```nginx
     user 用户名 [用户组名，可选，如果不写默认跟用户名一致]; #默认值nobody
     ```

   * master_process：用来指定是否开启工作进程

     ```nginx
     master_process on|off; #默认值on
     ```

   * worder_process：允许生成的worder进程的数量，这是nginx服务器实现并发处理服务的关键。理论上配置的数量越大，可以支持的并发处理量越多，但事实上这个值的设定是需要受到服务器自身的限制，建议将该值和服务器cpu内核数保持一致。

     ```nginx
     worder_process num/auto; #默认值1
     ```

   * deamon：设定nginx是否以守护进程的方式启动。守护进程是linux后台执行的一种服务进程，特点是独立于控制终端，不会随着终端关闭而停止。

     ```nginx
     deamon on|off; #默认值on
     ```

   * pid：用来配置nginx当前master进程的进程号id存储的文件路径。

     ```nginx
     pid 文件路径; #默认值/usr/local/nginx/logs/nginx.pid
     ```

   * error_log：用来配置nginx的错误日志存放路径和日志级别

     ```nginx
     error_log 文件路径 [日志级别]; #默认值logs/error.log error
     ```

     error_log的配置位置可以在：全局块、http块、server块、location块。

     日志级别：debug|info|notice|warn|error|crit|alert|emerg，分别为调试|信息|通知|警告|错误|临界|警报|紧急，日志级别越来越高，日志基本越高输出的内容越少。这块建议不要设置成info以下的等级，因为会带来大量的磁盘I/O销毁，影响nginx性能。

   * include：用来引入其他的ngnix配置文件，使nginx的配置更加灵活，可以在配置文件中的任何位置配置include。

     ```nginx
     include 文件路径;
     ```

2. events块：主要用于设置nginx服务器与用户的网络连接，这部分配置对nginx服务器的性能影响比较大，在实际中应该灵活配置。nginx性能优化时也会用到这里的内容。

   * accept_mutex：用来设置nginx网络连接序列化。

     这个配置主要用来解决“惊群”问题。大致意思是在某一个时刻，客户端发来一个请求连接，nginx后台是多进程的工作模式，也就是说会有多个worker进程被同事唤醒，但最终只有一个进程可以获取到连接，如果每次唤醒的进程数太多，会影响nginx的整体性能，如果设置为on（开启状态），将会对多个nginx进程接收连接进行序列化，一个个来唤醒接收，就防止了多个进程对连接的争抢。设置为off同时唤醒多个进程，效率更高。具体设置成什么取决于生产环境。

     ```nginx
     accept_mutex on|off; #默认值on
     ```

   * multi_accept：用来设置worker进程是否允许同时接收多个网络连接，如果设置为off，nginx一个worker进程同一时间内只能接收一个新的链接，否则一个worker进程可以同时接收所有新连接。建议设置为on，这样效率高一点。

     ```nginx
     multi_accept on|off; #默认值off
     ```

   * worker_connections：用来配置单个worker进程最大连接数。这里的连接数不仅仅包括和前端用户建立的连接，而是包括所有可能的连接数，num的值不能大于操作系统支持打开的最大文件句柄数量。

     ```nginx
     worker_connections num; #默认值512
     ```

   * use：用来设置nginx服务器选择哪种事件驱动来处理网络消息。此处所选择的事件处理模型是nginx优化部分的一个重要内容，method的可选值有select/poll/epoll/kqueue等，之前环境准备时，需要使用linux内核在2.6以上的centos操作系统时，就是为了能使用epoll函数来优化nginx。这个配置也可以在nginx源码安装时来指定。

     ```nginx
     use method; #默认值根据操作系统定
     ```

3. http块：包括http全局块和多个server块。

   1. http全局块：

      * http全局块包括文件引入

      * 定义MIME-TYPE：MIME-TYPE是网络资源媒体类型，nginx作为web服务器，也需要能够识别前端请求的资源类型。

        * types：定义支持的MIME类型（默认是通过include引入进来的）

        * default_type：用来配置nginx相应前端请求的默认MIME类型，可以在http块、server块、location块中设置。

          ```nginx
          default_type mime-type; #默认值 text/plain
          ```

      * 自定义日志

        nginx中的日志类型分access.log、error.log。

        access.log用来记录用户所有的访问请求。

        error.log记录的是nginx运行时的错误信息。

        自定义日志主要是对access.log来进行设置，支持对日志的格式大小输出等进行设置，需要用到下面两个指令。

        * access_log：设置用户访问日志的相关属性。可以在http块、server块、location块中设置。

          ```nginx
          access_log path [日志格式名 [buffer=日志大小]]; #默认值access_log logs/access.log combined;
          ```

        * log_format：设置指定日志的输出格式。只能在http块中设置。

          ```nginx
          log_format name [escape=default|json|none] "string...."; #默认值log_format combined "...";
          ```

      * sendfile：用来设置nginx服务器是否使用sendfile()函数传输文件，该属性可以大大提高nginx从磁盘读取静态资源的性能。可以在http块、server块、location块中设置。

        ```nginx
        sendfile on|of; #默认值off
        ```

      * keepalive_timeout：用来设置keep-alibe长连接的超时时间。可以在http块、server块、location块中设置。

        ```nginx
        keepalive_timeout time; #默认值75; 单位是s
        ```

      * keepalive_requests：用来设置keep-alive长连接的最大使用次数，超过这个次数长连接就会断开。可以在http块、server块、location块中设置。

        ```nginx
        keepalive_requests num; #默认值100
        ```

   2. server块：包括全局server块和多个location块。server块和虚拟主机有密切关系，每个server块就相当于一个虚拟主机，虚拟主机从用户角度看，和一台独立的硬件主机是完全一样的，该技术的产生是为了节省互联网服务器硬件成本。

      1. 全局server块

         * listen：用来配置监听的端口

           ```nginx
           listen address[:post] [default_server] ...;
           # 或者
           listen port [default_server] ...;
           
           listen *:80 | *:8080; #默认值
           ```

           ```nginx
           listen 127.0.0.1:8080; #监听指定的IP和端口
           listen 127.0.0.1; #监听指定IP的所有端口
           listen 8080;   #监听指定端口
           listen *:8080; #监听指定端口
           ```

           注：default_server用来将此虚拟主机设置成默认主机，所谓默认主机指的是如果没有匹配到对应的主机地址，则会默认执行的主机。如果不指定默认主机是第一个server。

         * server_name：用来设置虚拟主机名称（域名或IP）

           ```nginx
           server_name name ...; #name可以提供多个，中间用空格分隔
           server_name ""; #默认值
           ```

           方式一：精确匹配

           ```nginx
           server_name www.baidu.com www.jd.com;
           ```

           补充小知识：主机映射可以在/etc/hosts文件中配置IP和域名的映射关系。访问域名时电脑会先到这里找域名对应的IP，没找到才会走DNS域名解析。

           方式二：通配符匹配

           server_name支持通配符”*“，通配符不能出现在域名的中间，只能出现在整个首段或整个尾段，如：

           ```nginx
           #正确的写法
           server_name *.baidu.com www.jd.*;
           
           #错误的写法
           server_name www.*.com www.baidu.c*;
           ```

           方式三：正则表达式匹配

           server_name支持使用正则表达式，并且需要使用`~`作为正则表达式字符串的开始标记。

           ```nginx
           server_name ~^www\.\w+\.com$;
           ```

         * error_page：设置网站的错误页面，根据状态码响应相应页面。一个server块中可以配置多个。

           ```nginx
           error_page code ... [=response] uri; #没有默认值
           #response可以重新设置状态码
           error_page 404 =200 /50x.html;
           location =/50x.html {
             root html;
           }
           ```

           方式一：指定具体的页面跳转地址

           ```nginx
           error_page 404 http://www.xxx.com;
           ```

           方式二：指定重定向地址

           ```nginx
           error_page 404 /50x.html;
           location =/50x.html {
             root html;
           }
           ```

           方式三：使用location的@符号完成错误信息展示

           ```nginx
           error_page 404 @jump_to_error;
           location @jump_to_error {
             root html;
           }
           ```

      2. location块：设置请求的URI，并对请求进行响应

         ```nginx
         location [= | ~ | ~* | ^~ | @] uri {...}
         
         #1.不带符号：以指定模式开始的都可以访问到
         location /abc {...}
         #以下都可以匹配
         http://192.168.1.1/abc
         http://192.168.1.1/abc?p=tom
         http://192.168.1.1/abc/
         http://192.168.1.1/abcdef
         
         #2.=：用于不包含正则表达式的uri的精确匹配
         location =/abc {...}
         #可以匹配
         http://192.168.1.1/abc
         http://192.168.1.1/abc?p=tom
         #不可以匹配
         http://192.168.1.1/abc/
         http://192.168.1.1/abcdef
         
         #3.~：用于表示包含了正则表达式的uri，区分大小写
         #4.~*：用于表示包含了正则表达式的uri，不区分大小写
         location ~^/abc\w$ {}
         location ~*^/abc\w$ {}
         
         #5.^~：和不带符号功能一致，区别是如果匹配到了，就停止匹配其他模式。
         location ^~/abc {}
         ```

         * 指定访问资源的路径

           * root：设置请求资源根目录

             ```nginx
             root path; #默认值html
             ```

           * alias：用来更改location的URI

             ```nginx
             alias path; #没有默认值
             ```

           * 区别

             * root的处理结果（服务器中的资源的具体路径）是：root路径 + location路径
             * alias的处理结果是：使用alias路径替换location路径
             * root资源根目录的含义，alias是一个目录别名的含义
             * 如果location路径以`/`结尾，那么alias也必须以`/`结尾，root没有要求

         * index：指定访问资源首页内容（这个首页内容必须在root所在的目录下）

           ```nginx
           index file ...; #默认值index.html
           ```

         * 数据缓存

         * 应答控制

         * 配置第三方模块

# 静态资源部署

## 配置指令

主要是server块和location块中的配置指令

## 配置优化

主要从下面三个属性配置进行优化：

```nginx
sendfile on;
tcp_nopush on;
tcp_nodelay on;
```

**sendfile**

sendfile用来开启高效的文件传输模式。可以在http块（常见）、server块、location块中设置。

```nginx
sendfile on|off; #默认值off
```

**tcp_nopush**

该指令必须在sendfile打开的状态下才会生效，主要是用来提升网络包的传输效率，但实时性会降低。可以在http块（常见）、server块、location块中设置。

```nginx
tcp_nodeplay on|off; #默认值off
```

**tcp_nodelay**

该指令必须在keep-alive连接开启的情况下才会生效，来提高网络包传输的实时性。可以在http块（常见）、server块、location块中设置。

```nginx
tcp_nodelay on|off; #默认值on
```

## gzip压缩

nginx配置文件中可以通过配置gzip来对静态资源进行压缩，相关的指令可以在http块（常见）、server块、location块中设置。

配置压缩指令需要用到如下三个模块：

* ngx_http_gzip_module模块
* ngx_http_gzip_static_module模块
* ngx_http_gunzip_module模块

**ngx_http_gzip_module模块**

该模块会在nginx安装时内置到nginx安装环境中，我们可以直接使用该模块提供的指令。

1. gzip指令：该指令用于开启或关闭gzip功能

   ```nginx
   gzip on|off; #默认值off
   ```

2. gzip_types指令：该指令可以根据响应页的MIME类型选择性的开启gzip压缩功能。所选择的值可以从mime.types文件中进行查找，也可以使用`*`代表所有（不建议配置，因为图片视频等资源已经做了高度压缩，没必要再进行gzip压缩，从而浪费cpu资源）。不配置时默认只会对html类型的文件进行压缩。

   ```nginx
   gzip_types mime-type ...; #默认值text/html
   ```

3. gzip_comp_level指令：该指令用于设置gzip压缩级别，级别从1-9,1表示最低，效率最高，9表示压缩程度最高，但效率最低耗时长。压缩级别越高压缩效果越不明显，建议设置为6。

   ```nginx
   gzip_comp_level level; #默认值1
   ```

4. gzip_vary指令：该指令用于设置使用gzip进行压缩，是否发送`Vary: Accept-Encoding`响应头。主要是告诉接收方，所发送的数据经过了gzip压缩处理。

   ```nginx
   gzip_vary on|off; #默认值off
   ```

5. gzip_buffers指令：该指令用于处理压缩的缓冲区数量和大小。

   其中num指定nginx服务器向系统申请缓存空间个数，size指定每个缓存空间的大小。这个值的设定和服务器的操作系统有关，所以不建议设置，使用默认值即可。

   ```nginx
   gzip_buffers num size; #默认值32 4k | 16 8k
   ```

6. gzip_disable指令：针对不同种类客户端发起的请求，可以选择性的开启和关闭gzip功能。根据客户端的浏览器标志（user-agent）来设置，支持使用正则表达式。指定某些浏览器不使用gzip，该指令一般是用来排除一些明显不支持gzip的低版本的浏览器，不支持gzip压缩的浏览器还进行gzip压缩的话会显示乱码。

   ```nginx
   gzip disable 正则字符串 ...; #没有默认值
   ```

   IE6以下的浏览器版本都不进行gzip压缩：

   ```nginx
   gzip disable "MSIE [1-6]\."
   ```

7. gzip_http_version指令：该指令指定使用gzip的最低http版本，一般采用默认值即可。

   ```nginx
   gzip_http_version 1.0|1.1; #默认值1.1
   ```

8. gzip_min_length指令：该指令针对传输数据的大小，可以选择性的开启和关闭gzip功能。

   ```nginx
   gzip_min_length length; #默认值20
   #nginx计量大小的单位：bytes[字节] / k|K[千字节] / m|M[兆]
   #例如：1024 / 10k / 10M
   ```

   gzip压缩功能对大数据的压缩效果明显，如果压缩的数据比较小，可能出现越压缩越大的情况。因此我们需要根据响应内容的大小来决定是否使用gzip功能，响应页面的大小可以通过头信息中的Content-Length来获取，但如果使用了Chunk编码动态压缩，该指令将被忽略。建议设置为1k或以上。

9. gzip_proxied指令：该指令设置的是在使用nginx做反向代理时，是否对服务端返回的结果进行gzip压缩。

   ```nginx
   gzip_proxied off|expired|no-cache|no-store|private|no_last_modified|no_etag|auth|any; #默认值off
   ```

   off - 关闭Nginx服务器对后台服务器返回结果的Gzip压缩
   expired - 启用压缩，如果header头中包含 "Expires" 头信息
   no-cache - 启用压缩，如果header头中包含 "Cache-Control:no-cache" 头信息
   no-store - 启用压缩，如果header头中包含 "Cache-Control:no-store" 头信息
   private - 启用压缩，如果header头中包含 "Cache-Control:private" 头信息
   no_last_modified - 启用压缩,如果header头中不包含 "Last-Modified" 头信息
   no_etag - 启用压缩 ,如果header头中不包含 "ETag" 头信息
   auth - 启用压缩 , 如果header头中包含 "Authorization" 头信息
   any - 无条件启用压缩

**gzip和sendfile共存问题**

开启sendfile以后，在读取磁盘上的静态资源文件的时候，可以减少拷贝的次数，可以不经过用户进程将静态文件通过网络设备发送出去，但是Gzip要想对资源压缩，是需要经过用户进程进行操作的。可以使用ngx_http_gzip_static_module模块的gzip_static指令来解决。

gzip_static: 检查与访问资源同名的.gz文件时，返回给客户端，并添加相应的gzip响应头信息。

```nginx
gzip_static on|off|always; #默认值off
```

## 缓存处理

主要是通过nginx指令控制浏览器缓存。

强缓存响应头可以通过nginx或上游服务器添加。

协商缓存一般由上游服务器添加，而Nginx负责将这些头信息传递给客户端。

1. expires指令：通过该指令可以控制响应头中的“Expires"和”Cache-Control"

   ```nginx
   expires [modified] time;
   expires epoch|max|off; #默认值off
   ```

   time：指定过期时间，可以正数也可以是负数。

   * 如果是负数，Cache-Control则为no-cache，表示不走强缓存而是走协商缓存
   * 如果为整数或0，则Cache-Control的值为max-age=time，如果是0表示不走强缓存而是走协商缓存

   epoch：指定Expires的值为'1 January,1970,00:00:01 GMT'(1970-01-01 00:00:00)，Cache-Control的值no-cache

   max：指定Expires的值为'31 December2037 23:59:59GMT' (2037-12-31 23:59:59) ，Cache-Control的值为10年

   off：默认不缓存。

2. add_header指令：用来添加指定的响应头和值。

   ```nginx
   add_header name value,value... [always]; #没有默认值
   ```

   Cache-Control作为响应头，可以设置如下值，如果添加多个值中间用`,`分隔：

   * must-revalidate 可缓存但必须再向源服务器进行确认
   * no-cache 缓存前必须确认其有效性
   * no-store 不缓存请求或响应的任何内容
   * no-transform 代理不可更改媒体类型
   * public 可向任意方提供响应的缓存
   * private 仅向特定用户返回响应
   * proxy-revalidate 要求中间缓存服务器对缓存的响应有效性再进行确认
   * max-age=\<seconds> 响应最大Age值
   * s-maxage=\<seconds> 公共缓存服务器响应的最大Age值

## 解决跨域

解决跨域的响应头一般由上游服务器添加，而Nginx负责将这些头信息传递给客户端。

使用add_header指令，该指令可以用来添加一些头信息。

```nginx
add_header name value,value... [always]; #没有默认值
```

此处用来解决跨域问题，需要添加两个头信息，一个是`Access-Control-Allow-Origin`，`Access-Control-Allow-Methods`

```nginx
location /getUser {
    add_header Access-Control-Allow-Origin 协议域名端口或*;
    add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE;
    default_type application/json;
    return 200 '{"id":1,"name":"TOM","age":18}';
}
```

允许跨域的响应头：

* Access-Control-Allow-Origin：允许跨域访问的源地址信息，可以配置多个(多个用逗号分隔)，也可以使用`*`代表所有源。

* Access-Control-Allow-Methods：允许跨域访问的请求方式，值可以为 GET POST PUT DELETE...,可以全部设置，也可以根据需要设置，多个用逗号分隔。

* Access-Control-Allow-Headers：指定哪些HTTP请求头可以被包含在请求中。这通常用于允许客户端发送自定义的请求头。例如：

  Access-Control-Allow-Headers: Content-Type, Authorization：允许包含 `Content-Type` 和 `Authorization` 请求头。

* Access-Control-Expose-Headers：指定哪些响应头可以被暴露给客户端。默认情况下，只有一些基本的响应头（如 `Cache-Control`、`Content-Language` 等）会被暴露给客户端。使用该头部可以自定义暴露的响应头。例如：`Access-Control-Expose-Headers: X-Custom-Header`：允许暴露自定义响应头 `X-Custom-Header` 给客户端。

* Access-Control-Allow-Credentials：指定是否允许携带凭证（如Cookies或HTTP认证）进行跨域请求。如果值为 `true`，则表示允许，如果值为 `false`，则表示不允许。

* Access-Control-Max-Age：指定预检请求（OPTIONS请求）的缓存时间，以秒为单位。预检请求是在实际请求之前发送的，用于检查是否允许跨域请求。例如：Access-Control-Max-Age: 3600表示预检请求的结果将在3600秒内缓存，减少不必要的预检请求。

补充知识点：何时浏览器会发送预检请求

1. 跨域请求中使用了自定义的请求头：如果跨域请求中包含了自定义的请求头（不是常见的标准请求头，例如 `Content-Type`），浏览器会发起预检请求。自定义请求头指的是不在跨域请求的白名单中的请求头。
2. 跨域请求中使用了某些非简单请求方法：非简单请求方法指的是不是常见的标准HTTP方法（GET、POST、HEAD）的请求方法，例如 PUT、DELETE 等。如果跨域请求使用了这些非简单请求方法，浏览器会发起预检请求。
3. 跨域请求中设置了 `withCredentials` 为 `true`：如果跨域请求需要携带凭证（例如Cookies或HTTP认证信息），并且设置了 `withCredentials` 为 `true`，浏览器会发起预检请求。
4. 跨域请求使用了某些不常见的请求头值：有些情况下，即使请求头在标准请求头范围内，但其值可能触发预检请求，这取决于浏览器的具体实现。

## 防盗链

**资源盗链**：指的是此内容不在自己服务器上，而是通过技术手段，绕过别人的限制将别人的资源内容放到自己页面上最终展示给用户。以此来盗取大网站的空间和流量。简而言之就是用别人的东西成就自己的网站。

**防盗链**：指的是保证我们服务器上的资源不会随意被别人使用。

**Referer**：了解防盗链的原理之前，先了解一个HTTP的头信息Referer，当浏览器向web服务器发送请求的时候，一般都会带上Referer请求头，来告诉服务器该网页是从哪个页面链接过来的。服务器可以获取到这个Referer信息来判断是否为自己信任的网站地址，如果是则放行继续访问，如果不是则可以返回403(服务端拒绝访问)的状态信息。

**nginx防盗链的具体实现**

valid_referers指令：nginx会通过查看referer自动和valid_referers后面的内容进行匹配，如果匹配到了就将`$invalid_referer`变量置0，如果没有匹配到，则将`$invalid_referer`变量置为1，匹配的过程中不区分大小写。可以在server块、location块中设置。

```nginx
valid_referers none|blocked|server_names|string...;
```

* none：如果Header中的Referer为空，允许访问。

* blocked：在Header中的Referer不为空，但是该值被防火墙或代理进行伪装过，如不带"http://" 、"https://"等协议头的资源允许访问。

* server_names：指定具体的域名或者IP。

* string：可以支持正则表达式和*的字符串。如果是正则表达式，需要以`~`开头表示

示例：

```nginx
#针对文件类型配置防盗链
location ~*\.(png|jpg|gif){
	valid_referers none blocked www.baidu.com 192.168.200.222 *.example.com example.* ~\.google\.;
  if ($invalid_referer){
    return 403;
  }
  root /usr/local/nginx/html;
}
#针对目录配置防盗链
location /images {
	valid_referers none blocked www.baidu.com 192.168.200.222 *.example.com example.* ~\.google\.;
  if ($invalid_referer){
    return 403;
  }
  root /usr/local/nginx/html;
}
```

遇到的问题：Referer的限制比较粗，比如随意加一个Referer，上面的方式是无法进行限制的，此时我们需要用到nginx的第三方模块`ngx_http_accesskey_module`实现防盗链。

## rewrite

Rewrite是Nginx服务器提供的一个重要基本功能，是Web服务器产品中几乎必备的功能。主要的作用是用来实现URL的重写。

注意：Nginx服务器的Rewrite功能的实现依赖于PCRE的支持，因此在编译安装Nginx服务器之前，需要安装PCRE库。Nginx使用的是ngx_http_rewrite_module模块来解析和处理Rewrite功能的相关配置。

"地址重写"与"地址转发"的区别:

```
地址重写浏览器地址会发生变化而地址转发则不变
一次地址重写会产生两次请求而一次地址转发只会产生一次请求
地址重写到的页面必须是一个完整的路径而地址转发则不需要
地址重写因为是两次请求所以request范围内属性不能传递给新页面而地址转发因为是一次请求所以可以传递值
地址转发速度快于地址重写
```

**rewrite常用指令**

set指令：该指令用来设置一个新的变量。可以再server、location、if中使用。

```nginx
set $variable 变量值; #没有默认值
```

$variable：变量名，该变量名称要用"$"作为变量的第一个字符，且不能与Nginx服务器预设的全局变量同名。

value：变量值，可以是字符串、其他变量或者变量的组合等。

Rewrite常用全局变量：

| 变量               | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| $args              | 变量中存放了请求URL中的请求指令。比如http://192.168.200.133:8080?arg1=value1&args2=value2中的"arg1=value1&arg2=value2"，功能和$query_string一样 |
| $http_user_agent   | 变量存储的是用户访问服务的代理信息(如果通过浏览器访问，记录的是浏览器的相关版本信息) |
| $host              | 变量存储的是访问服务器的server_name值                        |
| $document_uri      | 变量存储的是当前访问地址的URI。比如http://192.168.200.133/server?id=10&name=zhangsan中的"/server"，功能和$uri一样 |
| $document_root     | 变量存储的是当前请求对应location的root值，如果未设置，默认指向Nginx自带html目录所在位置 |
| $content_length    | 变量存储的是请求头中的Content-Length的值                     |
| $content_type      | 变量存储的是请求头中的Content-Type的值                       |
| $http_cookie       | 变量存储的是客户端的cookie信息，可以通过add_header Set-Cookie 'cookieName=cookieValue'来添加cookie数据 |
| $limit_rate        | 变量中存储的是Nginx服务器对网络连接速率的限制，也就是Nginx配置中对limit_rate指令设置的值，默认是0，不限制。 |
| $remote_addr       | 变量中存储的是客户端的IP地址                                 |
| $remote_port       | 变量中存储了客户端与服务端建立连接的端口号                   |
| $remote_user       | 变量中存储了客户端的用户名，需要有认证模块才能获取           |
| $scheme            | 变量中存储了访问协议                                         |
| $server_addr       | 变量中存储了服务端的地址                                     |
| $server_name       | 变量中存储了客户端请求到达的服务器的名称                     |
| $server_port       | 变量中存储了客户端请求到达服务器的端口号                     |
| $server_protocol   | 变量中存储了客户端请求协议的版本，比如"HTTP/1.1"             |
| $request_body_file | 变量中存储了发给后端服务器的本地文件资源的名称               |
| $request_method    | 变量中存储了客户端的请求方式，比如"GET","POST"等             |
| $request_filename  | 变量中存储了当前请求的资源文件的路径名                       |
| $request_uri       | 变量中存储了当前请求的URI，并且携带请求参数，比如http://192.168.200.133/server?id=10&name=zhangsan中的"/server?id=10&name=zhangsan" |

if指令：该指令用来支持条件判断，并根据条件判断结果选择不同的Nginx配置。位置：server、location。

```nginx
if (condition) {...}
```

condition为判定条件，可以支持以下写法：

1. 变量名。如果变量名对应的值为空字符串或者是0，if都判断为false，其他条件为true。

   ```nginx
   if ($变量){
   	
   }
   ```

2. 使用"="和"!="比较变量和字符串是否相等，满足条件为true，不满足为false。注意：此处和Java不太一样的地方是字符串不需要添加引号。

   ```nginx
   if ($request_method = POST){
   	return 405;
   }
   ```

3. 使用正则表达式对变量进行匹配，匹配成功返回true，否则返回false。变量与正则表达式之间使用"~","~*","!~","!~\*"来连接。

   "~"代表匹配正则表达式过程中区分大小写，

   "~\*"代表匹配正则表达式过程中不区分大小写

   "!~"和"!~\*"刚好和上面取相反值，如果匹配上返回false,匹配不上返回true

   ```nginx
   if ($http_user_agent ~ MSIE){
     #MSIE就是正则字符串
   	#$http_user_agent的值中是否包含MSIE字符串，如果包含返回true
   }
   ```

   注意：正则表达式字符串一般不需要加引号，但是如果字符串中包含"}"或者是";"等字符时，就需要把引号加上。

4. 判断请求的文件是否存在使用"-f"和"!-f"

   当使用"-f"时，如果请求的文件存在返回true，不存在返回false。

   当使用"!-f"时，如果请求文件不存在，但该文件所在目录存在返回true，文件和目录都不存在返回false，如果文件存在返回false

   ```nginx
   if (-f $request_filename){
   	#判断请求的文件是否存在
   }
   if (!-f $request_filename){
   	#判断请求的文件是否不存在
   }
   ```

5. 判断请求的目录是否存在使用"-d"和"!-d",

   当使用"-d"时，如果请求的目录存在，if返回true，如果目录不存在则返回false

   当使用"!-d"时，如果请求的目录不存在但该目录的上级目录存在则返回true，该目录和它上级目录都不存在则返回false,如果请求目录存在也返回false.

6. 判断请求的 存在使用"-e"和"!-e"

   当使用"-e",如果请求的目录或者文件存在时，if返回true,否则返回false.

   当使用"!-e",如果请求的文件和文件所在路径上的目录都不存在返回true,否则返回false

7. 判断请求的文件是否可执行使用"-x"和"!-x"

   当使用"-x",如果请求的文件可执行，if返回true,否则返回false

   当使用"!-x",如果请求文件不可执行，返回true,否则返回false

break指令：该指令用于中断当前相同作用域中的其他Nginx配置。与该指令处于同一作用域的Nginx配置中，位于它前面的指令配置生效，位于后面的指令配置无效。并且break可以终止当前的匹配并把当前的URI在本location进行重定向访问处理。位置：server、location、if。

```nginx
break;
```

示例:

```
location /{
	if ($变量){
		set $id $1;
		break;
		limit_rate 10k;
	}
}
```

return指令：该指令用于完成对请求的处理，直接向客户端返回响应状态代码。在return后的所有Nginx配置都是无效的。位置：server、location、if。

```nginx
return code [text];
return code URL;
return URL;
```

* code：为返回给客户端的HTTP状态代理。可以返回的状态代码为0~999的任意HTTP状态代理
* text：为返回给客户端的响应体内容，支持变量的使用
* URL：为返回给客户端的URL地址（临时重定向）

rewrite指令：该指令通过正则表达式的使用来改变URI。可以同时存在一个或者多个指令，按照顺序依次对URL进行匹配和处理。位置：server、location、if。

URL和URI的区别：

```
URI:统一资源标识符
URL:统一资源定位符
```

```nginx
rewrite reg replacement [flag];
```

* reg：用来匹配URI的正则表达式

* replacement：用于替换URI中被匹配内容的字符串。如果该字符串是以"http://"或者"https://"开头的，则不会继续向下对URI进行其他处理，而是直接返回重写后的URI给客户端。

* flag：用来设置rewrite对URI的处理行为，可选值有如下：

  - last和不加一个效果

  - break在当前作用域中匹配，不会继续向下寻找。

  - redirect临时重定向

  - permanent永久重定向


示例：

```nginx
location /rewrite {
  rewrite ^/rewrite/url\w*$ https://www.baidu.com;
  rewrite ^/rewrite/(test)\w*$ /$1;
  rewrite ^/rewrite/(demo)\w*$ /$1;
}
location /test {
	default_type text/plain;
  return 200 test_success;
}
location /demo {
	default_type text/plain;
  return 200 demo_success;
}
```

rewrite_log指令：该指令配置是否开启URL重写日志的输出功能，开启后，URL重写的相关日志将以notice级别输出到error_log指令配置的日志文件汇总。位置：http、server、location、if。

```nginx
rewrite_log on|off; #默认值off
```

## Rewrite的案例

**域名跳转**

问题分析：

如果我们想访问京东网站，可以输入`www.jd.com`，但当我们输入`www.360buy.com`后，地址也会变成`www.jd.com`。这个其实是因为京东刚开始的时候域名就是`www.360buy.com`，后面由于各种原因把自己的域名换成了`www.jd.com`, 虽然说域名变量，但是对于以前只记住了`www.360buy.com`的用户来说，就要把这部分用户也迁移到我们新域名上来，针对于这个问题，我们就可以使用Nginx中Rewrite的域名跳转来解决。

1.域名跳转

环境准备：

- 准备两个域名  `www.360buy.com`  `www.jd.com`

```
vim /etc/hosts
```

```
192.168.200.133 www.360buy.com
192.168.200.133 www.jd.com
```

- 在/usr/local/nginx/html/jd目录下创建一个访问页面

```html
<html>
  <head>
		<title>京东商城</title>
  </head>
	<body>
		<h1>欢迎来到京东</h1>
	</body>
</html>
```

- 通过Nginx实现`www.jd.com`的服务器

```
server {
	listen 80;
	server_name www.jd.com;
	location /{
		root /usr/local/nginx/html/jd;
		index index.html;
	}
}
```

* 通过Rewrite完成将`www.360buy.com`的请求跳转到`www.jd.com`

```
server {
	listen 80;
	server_name www.360buy.com;
	rewrite ^/ http://www.jd.com permanent;
}
```

2. 域名跳转时携带请求的URI：

* 修改配置信息

```
server {
	listen 80;
	server_name www.itheima.com;
	rewrite ^(.*) http://www.hm.com$1 permanent;
}
```

3.多域名跳转：

我们除了上述说的`www.jd.com` 、`www.360buy.com`其实还有我们也可以通过`www.jingdong.com`来访问，那么如何通过Rewrite来实现多个域名的跳转?

* 添加域名

```
vim /etc/hosts
192.168.200.133 www.jingdong.com
```

* 修改配置信息

```
server{
	listen 80;
	server_name www.360buy.com www.jingdong.com;
	rewrite ^(.*) http://www.jd.com$1 permanent;
}
```

**域名镜像**

上述案例中，将`www.360buy.com` 和 `www.jingdong.com`都能跳转到`www.jd.com`，那么`www.jd.com`我们就可以把它起名叫主域名，其他两个就是我们所说的镜像域名，当然如果我们不想把整个网站做镜像，只想为其中某一个子目录下的资源做镜像，我们可以在location块中配置rewrite功能，比如:

```
server {
	listen 80;
	server_name rewrite.myweb.com;
	location ^~ /source1{
		rewrite ^/source1(.*) http://rewrite.myweb.com/web$1 last;
	}
	location ^~ /source2{
		rewrite ^/source2(.*) http://rewrite.myweb.com/web$1 last;
	}
}
```

**独立域名**

一个完整的项目包含多个模块，比如购物网站有商品商品搜索模块、商品详情模块已经购物车模块等，那么我们如何为每一个模块设置独立的域名。

需求：

```
http://search.hm.com  访问商品搜索模块
http://item.hm.com	  访问商品详情模块
http://cart.hm.com	  访问商品购物车模块
```

```
server{
	listen 80;
	server_name search.hm.com;
	rewrite ^(.*) http://www.hm.com/bbs$1 last;
}
server{
	listen 81;
	server_name item.hm.com;
	rewrite ^(.*) http://www.hm.com/item$1 last;
}
server{
	listen 82;
	server_name cart.hm.com;
	rewrite ^(.*) http://www.hm.com/cart$1 last;
}
```

**目录自动添加"/"**

问题描述

通过一个例子来演示下问题:

```
server {
	listen	80;
	server_name localhost;
	location / {
		root html;
		index index.html;
	}
}

```

要想访问上述资源，很简单，只需要通过http://192.168.200.133直接就能访问，地址后面不需要加/，但是如果将上述的配置修改为如下内容:

```
server {
	listen	80;
	server_name localhost;
	location /hm {
		root html;
		index index.html;
	}
}
```

这个时候，要想访问上述资源，按照上述的访问方式，我们可以通过http://192.168.200.133/hm/来访问,但是如果地址后面不加斜杠，页面就会出问题。如果不加斜杠，Nginx服务器内部会自动做一个301的重定向，重定向的地址会有一个指令叫server_name_in_redirect on|off;来决定重定向的地址：

```
如果该指令为on
	重定向的地址为:  http://server_name/目录名/;
如果该指令为off
	重定向的地址为:  http://原URL中的域名/目录名/;
```

所以就拿刚才的地址来说，http://192.168.200.133/hm如果不加斜杠，那么按照上述规则，如果指令server_name_in_redirect为on，则301重定向地址变为 http://localhost/hm/,如果为off，则301重定向地址变为http://192.168.200.133/hm/。后面这个是正常的，前面地址就有问题。

注意server_name_in_redirect指令在Nginx的0.8.48版本之前默认都是on，之后改成了off,所以现在我们这个版本不需要考虑这个问题，但是如果是0.8.48以前的版本并且server_name_in_redirect设置为on，我们如何通过rewrite来解决这个问题？

解决方案

我们可以使用rewrite功能为末尾没有斜杠的URL自动添加一个斜杠

```
server {
	listen	80;
	server_name localhost;
	server_name_in_redirect on;
	location /hm {
		if (-d $request_filename){
			rewrite ^/(.*)([^/])$ http://$host:$server_port/$1$2/ permanent;
		}
	}
}
```

**合并目录**

搜索引擎优化(SEO)是一种利用搜索引擎的搜索规则来提供目的网站的有关搜索引擎内排名的方式。我们在创建自己的站点时，可以通过很多中方式来有效的提供搜索引擎优化的程度。其中有一项就包含URL的目录层级一般不要超过三层，否则的话不利于搜索引擎的搜索也给客户端的输入带来了负担，但是将所有的文件放在一个目录下又会导致文件资源管理混乱并且访问文件的速度也会随着文件增多而慢下来，这两个问题是相互矛盾的，那么使用rewrite如何解决上述问题?

举例，网站中有一个资源文件的访问路径时 /server/11/22/33/44/20.html,也就是说20.html存在于第5级目录下，如果想要访问该资源文件，客户端的URL地址就要写成 `http://www.web.name/server/11/22/33/44/20.html`,

```
server {
	listen 80;
	server_name www.web.name;
	location /server{
		root html;
	}
}
```

但是这个是非常不利于SEO搜索引擎优化的，同时客户端也不好记.使用rewrite我们可以进行如下配置:

```
server {
	listen 80;
	server_name www.web.name;
	location /server{
		rewrite ^/server-([0-9]+)-([0-9]+)-([0-9]+)-([0-9]+)\.html$ /server/$1/$2/$3/$4/$5.html last;
	}
}
```

这样的花，客户端只需要输入http://www.web.name/server-11-22-33-44-20.html就可以访问到20.html页面了。这里也充分利用了rewrite指令支持正则表达式的特性。

**防盗链功能优化**

防盗链之前我们已经介绍过了相关的知识，在rewrite中的防盗链和之前将的原理其实都是一样的，只不过通过rewrite可以将防盗链的功能进行完善下，当出现防盗链的情况，我们可以使用rewrite将请求转发到自定义的一张图片或页面，给用户比较好的提示信息。

```nginx
#针对文件类型配置防盗链
location ~*\.(png|jpg|gif){
	valid_referers none blocked www.baidu.com 192.168.200.222 *.example.com example.* ~\.google\.;
  if ($invalid_referer){
    #return 403;
    rewrite ^/ /images/forbidden.png break;
  }
}
#针对目录配置防盗链
location /images {
	valid_referers none blocked www.baidu.com 192.168.200.222 *.example.com example.* ~\.google\.;
  if ($invalid_referer){
    #return 403;
    rewrite ^/ /images/forbidden.png break;
  }
}
```





# 反向代理

正向代理：为客户端服务，隐藏客户端，在客户端配置代理服务器，通过代理服务器进行互联网的访问（翻墙）

反向代理：为服务器服务，隐藏服务端。客户端对代理是无感知的，因为客户端不需要做任何代理配置就可以访问，客户端只需要将请求发送给反向代理服务器，由反向代理服务器去选择目标服务器，获取数据后再返回给客户端，反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器，隐藏了真实服务器的IP地址。

配置实例：

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

# 负载均衡

负载均衡是一种在多个服务器或资源之间分配网络流量的技术，以确保没有单个服务器变得过于繁忙，从而优化网络服务的性能，提高响应速度和系统的可靠性。当客户端发送多个请求到服务器，单个服务器解决不了时，我们可以增加服务器的数量（集群），然后将请求平均分发到各个服务器上，这个过程就是负载均衡。

配置实例：

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

# 动静分离

动静分离将静态内容（**静态内容**指的是不经常变化或不依赖于用户输入和服务器处理的内容，如HTML文件、CSS样式表、JavaScript文件、图像、视频等）部署到专门的静态资源服务器上，将动态内容（**动态内容**指的是根据用户输入、数据库查询或服务器处理而生成的内容，如通过PHP、Java、Ruby等服务器端语言动态生成的HTML页面。）部署到主服务器上，将不同资源部署在不同服务器，这样做能够加快解析速度，降低原来单个服务器的压力。然后nginx会根据请求的资源类型，分别到不同的服务器上获取资源。

配置实例：

后端静态资源服务器的目录结构为：/data/www/a.html   /data/image/1.jpg

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
