git-pull-hook
=====

[![Build Status](https://travis-ci.org/yxliang01/git-pull-hook.svg?branch=master)](https://travis-ci.org/yxliang01/git-pull-hook)
[![Dependency Status](https://david-dm.org/yxliang01/git-pull-hook.svg)]()
[![Code Climate](https://codeclimate.com/github/yxliang01/git-pull-hook/badges/gpa.svg)](https://codeclimate.com/github/yxliang01/git-pull-hook)
[![NSP Status](https://nodesecurity.io/orgs/yxliang01/projects/b0af42da-6042-47d0-a41a-bb1348e5139d/badge)](https://nodesecurity.io/orgs/yxliang01/projects/b0af42da-6042-47d0-a41a-bb1348e5139d)
[![npm version](https://badge.fury.io/js/git-pull-hook.svg)](https://badge.fury.io/js/git-pull-hook)

For npm(node) modules directories
-----
`gitp ARGUMENTS_FOR_GIT_PULL` = `npm run prepull && git pull ARGUMENTS_FOR_GIT_PULL && npm run postpull`

`gitp ARGUMENTS_FOR_GIT_PULL` will execute your defined npm scripts `prepull` before executing `git pull ARGUMENTS_FOR_GIT_PULL`, then `npm run postpull`. If one of the steps fails, it will stop.

To install:
```bash
npm install -g git-pull-hook
```

To Use:
```bash
# Go to your git repository (via cd) 

gitp ARGUMENTS_FOR_GIT_PULL

# Wait for prompts
# When it has finished, it will prompt you "done!"
```
