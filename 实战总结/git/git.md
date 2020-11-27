##### 生成 ssh key
```bash
ssh-keygen -t rsa -C "your email"
```



##### 配置用户信息

不加 global 就为配置单个项目的用户信息

```bash
git config --global user.name "username"
git config --global user.email "email"
git config --global color.ui true  # 让Git显示颜色
git config --list # 查看本机 Git 配置信息
```



##### 关联远程库

1.从远程仓库克隆：

当你从远程仓库克隆时，实际上Git自动把本地的master分支和远程的master分支对应起来了，并且，远程仓库的默认名称是origin。

要查看远程库的信息，用git remote，用git remote -v显示更详细的信息

```bash
git clone url
```

2.已有本地文件夹或本地库，本地关联远程库

* 将本地文件夹初始化成一个 git 仓库：`git init`
* 本地关联远程库：`git remote add origin url`
* 第一次推送master分支的所有内容：`git push -u origin master`



##### 常规提交流程
```bash
git status  # 查看状态
git diff  # 查看改动
git add . # 将工作区的修改添加到暂存区
git commit -m ""  # 提交到本地库
git pull # 相当于从远程获取最新版本并merge到本地
git fetch origin  # 拉取所在分支代码
git rebase origin/master  # 合并远程和本地代码
git merge origin/master  # 合并远程和本地代码
git push origin master  # 推送到远程库
# 如果有冲突，手动解决冲突，然后再次add,commit,push就可以了
```



##### 时光机穿梭
查看提交历史：`git log`

查看命令历史：`git reflog`

工作区 暂存取(add后的) 分支(commit后的)

版本回退

* 撤回工作区的内容，也就是还没 add 和 commit

  `git checkout -- readme.txt` 让这个文件回到最近一次 git commit 或 git add 时的状态，就是撤销工作区的修改

* 撤回暂存区的内容，也就是已经 add 了

  `git reset HEAD readme.txt`

* 撤回分支上的版本，也就是已经 commit

  * 退回到上一个提交的版本： `git reset --hard HEAD^`
  * 回退到指定版本：`git reset --hard 1094adb`