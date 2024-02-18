# git使用

## 生成 ssh key

```bash
ssh-keygen -t rsa -C "your email"
```

## 配置用户信息

不加 global 就为配置单个项目的用户信息

```bash
git config --global user.name "username"
git config --global user.email "email"
git config --global color.ui true  # 让Git显示颜色
git config --list # 查看本机 Git 配置信息
```


## 关联远程库

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

## 分支管理

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
git branch -u origin/远程分支名
git branch --set-upstream-to origin/远程分支名
git branch --set-upstream-to=origin/远程分支名 本地分支名
git push --set-upstream origin 远程分支名
git push -u origin 远程分支名

# 储藏工作区内容
git stash 储藏工作现场
git stash list 查看被储藏的所有工作现场
stash@{0}: WIP on dev: f52c633 add merge
git stash pop 恢复工作现场，同时删除stash内容
git stash apply 恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除
git stash apply stash@{0} 恢复指定的stash

git cherry-pick 4c805e2 复制一个特定的提交到当前分支，并自动做一次提交
```

## 常规提交流程

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

## 时光机穿梭
查看提交历史：`git log`

查看命令历史：`git reflog`

工作区      暂存区(add后的)      本地仓库(commit后的)

版本回退：

* 撤回工作区的内容，也就是还没 add 和 commit

  `git checkout -- readme.txt` 让这个文件回到最近一次 git commit 或 git add 时的状态，就是撤销工作区的修改

* 撤回暂存区的内容，也就是已经 add 了

  `git reset HEAD readme.txt`

* 撤回分支上的版本，也就是已经 commit

  * 退回到上一个提交的版本： `git reset --hard HEAD^`
  * 回退到指定版本：`git reset --hard 1094adb`

## 标签

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

## rebase merge区别

git merge：

2. 非线性历史: 
   *  `merge` 的结果是一个非线性历史，会保留原始分支的所有提交历史记录。
   * 合并时，它会创建一个新的“合并提交”，这个提交有两个父提交：一个是当前分支的最后提交，另一个是被合并分支的最后提交。
3. 冲突处理: 如果在合并过程中出现冲突，这些冲突必须在创建合并提交之前解决。手动解决冲突之后要再次做 add 和 commit操作。 
4. 适用场景: 对于团队合作和共享分支（如 `master` 或 `develop`），`merge` 是更受欢迎的选择，因为它保留了完整的历史记录和分支的结构。

git rebase：

1. 线性历史:
   * `rebase` 的结果是一个线性历史，会修改合并过来的分支的提交历史。
   * 合并时，首先找到两个分支的基底，然后将合并过来的分支的提交分别做修改（修改hash），依次放入要合入的分支后面。它会它看起来就像所有的更改都是按顺序在一个分支上发生的，这使得历史看起来更简洁、更直观。
2. 冲突处理: 如果在合并过程中出现冲突，这些冲突必须在创建合并提交之前解决。在 `rebase` 过程中解决的任何冲突都会被包含在重新创建的提交中，而不是像 `merge` 那样在单独的合并提交中。手动解决冲突后要将做 add 和 git rebase --continue 操作，来继续rebase。
3. 适用场景:  通常用于整理本地分支的历史，或者在将本地分支的更改合并到共享分支之前。

## 每次 pull 和 push 的时候都要输入密码

将私钥添加到钥匙串 `ssh-add -K ~/.ssh/id_rsa`

## git svn 对比

svn：本地工作区 -- svn服务器 

git：本地工作区 -- 本地版本库 -- 远程库 

操作都是拉取合并提交，只是 git 多了个本地版本库，所以要先处理本地版本库和两边的关系，多出来两步。

# git 原理

Git 是一个分布式版本控制系统，广泛用于源代码管理。它的设计哲学是使源代码的管理既高效又灵活。Git 的核心原理包括：

1. 快照，而非差异
   * Git 与其他版本控制系统的主要区别在于其数据模型。其他系统（如 SVN）存储信息作为文件列表和每个文件随时间的改变（即差异）。
   * Git 存储的是项目历史中每个版本的“快照”。每次提交或保存项目状态时，Git 实际上是将一份当前工作目录的快照记录下来。
   * 存储优化
     * Git 通过存储快照和执行内部数据压缩（如打包和压缩）来优化存储。这意味着即使在存在多个分支时，仓库的大小也不会快速增长。
     * 当多个分支共享相同的历史时，Git 可以有效地重用数据，而不是为每个分支重复存储相同的信息。

2. 分布式版本控制
   * Git 是分布式的，每个工作副本都是一个完整的仓库，具有完整的历史记录和版本跟踪能力，不依赖于网络访问或中央服务器。
   * 这意味着即使在离线状态下，你也可以提交更新、创建分支、查看历史等。

3. 数据完整性
   * Git 在内部使用 SHA-1 哈希算法来保证文件和目录状态的完整性。每个文件和目录都有一个唯一的哈希值（称为 blob），这确保了数据不被篡改。
   * 提交记录也通过哈希保护，确保历史记录的不可篡改性。

4. 分支和合并
   * Git 的一个核心特性是其轻松、快速的分支管理。Git 鼓励开发者频繁地创建和合并分支。
   * 分支在 Git 中是非常轻量级的，本质上只是指向特定提交的指针。
   * 合并操作也相对高效，特别是 Git 的“快进”合并。
   * 分支和合并高效的原理：指针
     * 在 Git 中，可以说有两类主要的指针：引用（分支指针等）和 HEAD。引用又可以分为几种不同的类型，包括分支、标签和远程跟踪分支。
       * 分支指针：每个分支都有一个指针，指向该分支上的最新提交。
       * HEAD指针
         * 附加的 HEAD：它指向当前仓库中的一个分支。在这种状态下，`HEAD` 实际上是一个指向分支引用的指针
         * 分离的 HEAD：当 `HEAD` 是分离的，它直接指向一个特定的提交，而不是指向分支。
       * 分支指针和HEAD指针关系
         * HEAD指针指向分支指针，分支指针指向提交
         * 每次提交，分支指针都会向前移动一步，HEAD指针也随之向前移动
         * 版本回退，就是将分支指针和HEAD指针同时挪动到指定的提交。
         * 切换分支就是切换HEAD指针指向的分支指针

5. 区域性操作
   * 许多操作（如提交、分支、合并、查看历史）都是本地执行的，这使得 Git 非常快速。
   * 与中央集中式系统不同，大多数操作不需要远程通信。

6. Staging Area（暂存区）
   * Git 提供了一个称为 "staging area" 或 "index" 的区域，这使得你可以继续工作而不会立即提交所有更改。
   * 你可以先集中一些相关的更新，然后一起提交，这有助于保持历史记录的清洁和理解性。

7. Git 对象
   * Git 存储数据时使用几种主要类型的对象：blob（用于存储文件数据），tree（类似于目录，用于组织 blob），commit（包含指向 tree 对象的指针、作者、提交者信息、日志消息等），tag（用于标记特定的提交，如发布版本）。

总结

Git 的设计重点在于提供速度、数据完整性和对分布式、非线性工作流的支持。它通过以快照的形式存储项目历史，以及其独特的分支和合并模型，实现了这些目标。这使 Git 成为了当今世界最流行的版本控制系统之一。