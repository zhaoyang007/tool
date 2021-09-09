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

当你从远程仓库克隆时，实际上 git 自动把本地的 master 分支和远程的 master 分支对应起来了，并且，远程仓库的默认名称是 origin。

要查看远程库的信息，用 `git remote`，用 `git remote -v` 显示更详细的信息

```bash
git clone url
```

2.已有本地文件夹或本地库，本地关联远程库

* 将本地文件夹初始化成一个 git 仓库：`git init`

* 本地关联远程库：`git remote add origin url`

* 第一次推送 master 分支的所有内容：

  ```bash
  git add .
  git commit -m '首次提交'
  git push -u origin master
  ```

##### 分支管理

一个 bug 一个分支，一个 feature 一个分支

```bash
# 查看分支
git branch  查看本地分支
git branch -r  查看远程分支
git branch -a  查看所有分支（有时别人新加的远程分支要先git pull一下才能看到）

# 分支本地操作
git branch <name>  创建分支
git checkout <name>  切换分支
git checkout -b <name>  创建并切换分支
git merge <name>  合并某分支到当前分支
git branch -d <name>  删除本地分支，该分支被合入其他分支后才能被删除
git branch -D <name> 强行删除没有合入其他分支的的分支
git log --graph 查看分支合并图

# 本地分支和远程分支关联
git checkout -b local_branchname origin/remote_branchname  将远程分支拉取到本地
git push origin local_branchname  把本地分支推送到远程
git push origin --delete remote_branchname 删除远程分支
git branch -vv 查看设置的所有跟踪分支

# 建立本地分支与远程分支的映射关系
git branch -u origin/dev
git branch --set-upstream-to origin/dev

# 储藏工作区内容
git stash 储藏工作现场
git stash list 查看被储藏的所有工作现场
stash@{0}: WIP on dev: f52c633 add merge
git stash pop 恢复工作现场，同时删除stash内容
git stash apply 恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除
git stash apply stash@{0} 恢复指定的stash

git cherry-pick 4c805e2 复制一个特定的提交到当前分支，并自动做一次提交
```

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

版本回退：

* 撤回工作区的内容，也就是还没 add 和 commit

  `git checkout -- readme.txt` 让这个文件回到最近一次 git commit 或 git add 时的状态，就是撤销工作区的修改

* 撤回暂存区的内容，也就是已经 add 了

  `git reset HEAD readme.txt`

* 撤回分支上的版本，也就是已经 commit

  * 退回到上一个提交的版本： `git reset --hard HEAD^`
  * 回退到指定版本：`git reset --hard 1094adb`

##### 标签

```bash
 # tag就是一个让人容易记住的有意义的名字，它跟某个commit绑在一起
 git tag tagname  用于新建一个标签，默认为HEAD，
 git tag tagname f52c633  为指定的commit打标签
 git tag -a tagname -m "blablabla"  指定标签信息
 git show tagname  可以看到标签信息
 git tag  查看所有标签
 git push origin tagname  推送本地标签到远程
 git push origin --tags  推送全部未推送过的本地标签到远程
 git tag -d tagname  删除本地标签
 git push origin :refs/tags/tagname  删除远程标签。
```

##### todo

git 原理：

* HEAD 指针指向分支指针，分支指针指向提交
* 每次提交，分支指针都会向前移动一步
* 切换分支就是切换 HEAD 指针指向的分支指针
* 版本回退就是将 HEAD 指针和 HEAD 指针指向的当前分支指针同时挪动到指定的提交。

rebase, merge 区别：rebase 把提交线变成直线。

##### 每次 pull 和 push 的时候都要输入密码

方法一：`git config --global credential.helper store`

方法二：将私钥添加到钥匙串 `ssh-add -K ~/.ssh/id_rsa`

##### git svn 对比

svn：本地工作区 -- svn服务器 

git：本地工作区 -- 本地版本库 -- 远程库 

操作都是拉取合并提交，只是 git 多了个本地版本库，所以要先处理本地版本库和两边的关系，多出来两步。