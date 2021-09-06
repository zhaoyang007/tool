1. 修改 nginx 配置文件后要 reload `sudo nginx -s reload `
2. 报错如此，bind() to 0.0.0.0:8080 failed (48: Address already in use)，说明其他服务占用了该端口`sudo nginx -s stop`  关掉服务
3. `nginx -t` 测试配置文件语法，获得配置文件路径
4. `sudo nginx -c /usr/local/etc/nginx/nginx.conf -c`  指定 nginx 配件文件
5. `sudo nginx -s reopen` 重启 nginx
6. nginx 功能：负载均衡，反向代理，发布网站，缓存起服务，实现跨域
7. mac nginx 文件所在的位置  /usr/local/etc/nginx
