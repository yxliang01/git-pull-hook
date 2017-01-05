gitpull
=====

[![Build Status](https://travis-ci.org/yxliang01/gitpull.svg?branch=master)](https://travis-ci.org/yxliang01/gitpull)
[![Dependency Status](https://david-dm.org/yxliang01/gitpull.svg)]()
[![Code Climate](https://codeclimate.com/github/yxliang01/gitpull/badges/gpa.svg)](https://codeclimate.com/github/yxliang01/gitpull)
[![NSP Status](https://nodesecurity.io/orgs/yxliang01/projects/815f92ed-7900-455a-a285-218967f8eb8f/badge)](https://nodesecurity.io/orgs/yxliang01/projects/815f92ed-7900-455a-a285-218967f8eb8f)

`gitp ARGUMENTS_FOR_GIT_PULL` = `npm run prepull && git pull ARGUMENTS_FOR_GIT_PULL && npm run postpull`

`gitp ARGUMENTS_FOR_GIT_PULL` will execute your defined npm scripts `prepull` before executing `git pull ARGUMENTS_FOR_GIT_PULL`, then `npm run postpull`. If one of the steps fails, it will stop.

To install:
```bash
npm install -g gitpull
```

To Use:
```bash
# Go to your git repository (via cd) 

gitp ARGUMENTS_FOR_GIT_PULL

# Wait for prompts
# When it has finished, it will prompt you "done!"
```
