~/.bash_profile

```
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

