# linux常用命令

grep -rl "arrowFunctionToExpression" .   查找当前目录下的所有字符所在的文件名
grep -r "example" .                      查找当前目录下的所有字符的所在行内容


在Unix中，一切（包括网络套接口）都是文件

1. 命令行：用户输入的命令及相关参数，按Enter键提交的一整行指令字符串
2. 命令行的基本格式
    命令字  [选项] [参数]
    其中，命令字：内部命令或外部命令的名称
    	  选项：用来调控命令的执行方式，有短选项（-l、-A等）、长选项（--word等）
    	  参数：命令的操作对象，比如文件、目录、用户等
3. 快速编辑命令行
    tab键
	命令补全
	路径补全
	判断命令和路径是否有错

    辅助操作：Tab键自动补齐、反斜杠 \ 强制换行
    快捷键：
    	Ctrl + u：清空至行首
    	Ctrl + k：清空至行尾
    	Ctrl + w：删除前一个单词
    	Ctrl + l：清空整个屏幕
    	Ctrl + c：废弃当前编辑的命令行
    4.获取命令帮助
    查看内部命令的帮助：help  命令名
    查看外部命令的帮助：命令名  --help

    如何区分一个命令是内部命令还是外部命令？
    	type  命令字

    使用专用的man手册机制（不适用于内部命令）：
    	man  外部命令名
    	man  配置文件名


5. 常用命令
http://www.jianshu.com/p/0693a6204f52
http://www.jianshu.com/p/3291de46f3ff
1、命令帮助
man [command]
[command] --help
info [command]
2、用户
3、SHELL: 命令解析器
4、显示硬盘、分区、CPU、内存信息
5、网络
6、进程
7、文件 
$cd  进入目录
$ls  显示目录内的内容  -ah(显示包括隐藏文件和文件夹的所有文件和文件夹)
$pwd  显示当前目录路径 
$touch  创建文件
$mkdir  创建文件夹
$rm  删除文件
$rmdir  删除文件夹
$mv  mv命令用来对文件或目录重新命名，或者将文件从一个目录移到另一个目录中
$cp  cp命令用来将一个或多个源文件或者目录复制到指定的目的文件或目录
 cp file /usr/men/tmp/file1  将文件file复制到目录/usr/men/tmp下，并改名为file1
 cp -r /usr/men /usr/zh  将目录/usr/men下的所有文件及其子目录复制到目录/usr/zh中
$cat  查看文件
 cat /usr/local/etc/nginx/nginx.conf|grep log  查看/usr/local/etc/nginx/nginx.conf中带有log的行
 cat /usr/local/etc/nginx/servers/*.conf  查看/usr/local/etc/nginx/servers目录中所有的.conf后缀的文件
$diff file1 file2  显示file1和file2的差别


$find  
 find / -name [file full name]   根据名称查找/目录下的[file full name]文件
$grep
 grep （global search regular expression(RE) and print out the line,全面搜索正则表达式并把行打印出来）是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹配的行打印出来。
 grep 87 /usr/local/etc/nginx/servers/*.conf
$which  查找命令位置
 which nginx  
$whereis 
$locate

$ifconfig  显示网卡信息
$ping网址得到ip
$tail  用于查看文件内容 
 tail -f /var/log/nginx/salesconf_*.log   参数-f使tail不停地去读最新的内容，这样有实时监视的效果
 tail -10 /usr/local/etc/nginx/servers/sales.conf   查看文件的后10行
$chmod  文件权限设置
 sudo chmod -R 777 /var/log/nginx   设置/var/log/nginx目录拥有权限。
 chmod a+x ~/Desktop 
$lsof  列出打开文件,你可以使用它来获得你系统上设备的信息,你能通过它了解到指定的用户在指定的地点正在碰什么东西,或者甚至是一个   进程正在使用什么文件或网络连接。
 lsof -i :81 查看81端口现在运行的情况
 lsof |grep qq  列出所有qq进程相关的文件
$netstat  用于显示linux中各种网络相关信息。如网络链接 路由表  接口状态链接 多播成员等等。
$ps  进程查看命令
 ps aux|grep nginx





# mac命令行配置

~/.bash_profile

```bash
export CLICOLOR=1
export LSCOLORS=Fxbxaxdxcxegedabagacad
export TERM=xterm-color

red=$'\[\e[31;1m\]'
yellow=$'\[\e[1;33m\]'
blue=$'\[\e[34;1m\]'
cyan=$'\[\e[36;1m\]'
normal=$'\[\e[m\]'

find_git_branch () {
    local dir=. head
    until [ "$dir" -ef / ]; do
        if [ -f "$dir/.git/HEAD" ]; then
            head=$(< "$dir/.git/HEAD")
            if [[ $head = ref:\ refs/heads/* ]]; then
                git_branch="${head#*/*/}"
		git_before=" git:("
		git_after=")"
            elif [[ $head != '' ]]; then
                git_branch="(detached)"
		git_before=""
		git_after=""
            else
                git_branch="(unknow)"
		git_before=""
		git_after=""
            fi
            return
        fi
        dir="../$dir"
    done
    git_branch=''
    git_before=""
    git_after=""
}
PROMPT_COMMAND="find_git_branch; $PROMPT_COMMAND"

export PS1="$yellow\u@\H → $cyan\w$blue\$git_before$red\$git_branch$blue\$git_after $normal\$ $normal"
```

