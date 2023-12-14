# nginx

nginx是Web服务器和反向代理服务器，优点是占用内存小，高性能，高并发。

## 1.反向代理

正向代理：为客户端服务，隐藏客户端，在客户端配置代理服务器，通过代理服务器进行互联网的访问；

反向代理：为服务器服务，隐藏服务端。客户端对代理是无感知的，因为客户端不需要做任何代理配置就可以访问，客户端只需要将请求发送给反向代理服务器，由反向代理服务器去选择目标服务器，获取数据后再返回给客户端，反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器，隐藏了真实服务器的IP地址。

## 2.负载均衡

负载均衡是一种在多个服务器或资源之间分配网络流量的技术，以确保没有单个服务器变得过于繁忙，从而优化网络服务的性能，提高响应速度和系统的可靠性。当客户端发送多个请求到服务器，单个服务器解决不了时，我们可以增加服务器的数量（集群），然后将请求平均分发到各个服务器上，这个过程就是负载均衡。

## 3.动静分离

动静分离将静态内容（**静态内容**指的是不经常变化或不依赖于用户输入和服务器处理的内容，如HTML文件、CSS样式表、JavaScript文件、图像、视频等）部署到专门的静态资源服务器上，将动态内容（**动态内容**指的是根据用户输入、数据库查询或服务器处理而生成的内容，如通过PHP、Java、Ruby等服务器端语言动态生成的HTML页面。）部署到主服务器上，将不同资源部署在不同服务器，这样做能够加快解析速度，降低原来单个服务器的压力。然后nginx会根据请求的资源类型，分别到不同的服务器上获取资源。

## 4.nginx常用命令

**安装nginx**

- Ubuntu: `sudo apt install nginx`
- Fedora: `sudo dnf install nginx`
- RHEL和CentOS: `sudo yum install epel-release && yum install nginx`。
- macOS: 
  - 安装brew `/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"`
  - `brew install nginx`
  - `brew info nginx` 查看nginx

**nginx常用命令**

1. 使用nginx命令的前提条件：必须进入nginx的目录。linux：`usr/local/nginx/sbin` mac homebrew： `/opt/homebrew/etc/nginx/nginx.conf` mac：`/usr/local/etc/nginx`
2. 查看版本号 `nginx -v`
3. 启动nginx  `nginx`
4. 关闭nginx `nginx -s stop`
5. 重新加载nginx `nginx -s reload`
6. 重启 nginx `nginx -s reopen` 
7. `nginx -t` 测试配置文件语法，获得配置文件路径
8. `nginx -c /usr/local/etc/nginx/nginx.conf -c`  指定 nginx 配件文件

## 5.配置文件

配置文件位置：linux：`usr/local/nginx/conf/nginx.conf` 

nginx配置文件组成：

1. 全局块：从配置开始一直到events块之间的内容，主要会设置一些影响nginx服务器整体运行的配置指令。主要包括配置运行nginx服务器的用户（组）、允许生成的worder process数、进程PID存放路径、日志存放路径和类型以及配置文件的引入等。

2. events块：events块涉及的指令主要影响nginx服务器与用户的网络连接，常用的设置包括是否开启对多work process下的网络连接进行序列化，是否允许同时接收多个网络连接，选取哪种事件驱动模型来处理连接请求，每个word process可以同时支持的最大连接数等。

   worker_connections  1024; 表示每个word process支持的最大连接数为1024

   这部分的配置对nginx的性能影响较大，在实际中应该灵活配置。

3. http块：包括http全局块和多个server块。

   1. http全局块：http全局块包括文件引入、MIME-TYPE定义、日志自定义、连接超时时间、单链接请求数上限等。

   2. server块：包括全局server块和多个location块。

      server块和虚拟主机有密切关系，每个server块就相当于一个虚拟主机，虚拟主机从用户角度看，和一台独立的硬件主机是完全一样的，该技术的产生是为了节省互联网服务器硬件成本。

      1. 全局server块：最常见的配置是本虚拟主机的监听配置和本虚拟主机的名称或IP配置
      2. location块：这块的主要作用是基于nginx服务区器接收到的请求字符串（例如server_name/uri-string），对虚拟主机名称（也可以是IP名词）之外的字符串（例如前面的/uri-string）进行匹配，对待定的请求进行处理，地址定向、数据缓存和应答控制等功能，还有许多第三方模块的配置也在这里进行。

## 6.nginx配置实例-反向代理

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

## 7.nginx配置实例-负载均衡

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

## 8.nginx配置实例-动静分离

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

## 9.nginx原理

nginx启动后会有master和worker两个进程，master用于管理和分配任务，worker用于完成实际任务。

多个worker使用争抢的机制去master中争抢任务。
