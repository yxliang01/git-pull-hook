prepull
=====

[![Build Status](https://travis-ci.org/yxliang01/prepull.svg?branch=master)](https://travis-ci.org/yxliang01/prepull)
[![Dependency Status](https://david-dm.org/yxliang01/prepull.svg)]()
[![Code Climate](https://codeclimate.com/github/yxliang01/prepull/badges/gpa.svg)](https://codeclimate.com/github/yxliang01/prepull)
[![NSP Status](https://nodesecurity.io/orgs/git-upload/projects/1cee5cb2-7bd7-4909-b25b-6cb6634e75f3/badge)](https://nodesecurity.io/orgs/git-upload/projects/1cee5cb2-7bd7-4909-b25b-6cb6634e75f3)

`gitpp ARGUMENTS_FOR_GIT_PULL` = `npm run prepull && git pull ARGUMENTS_FOR_GIT_PULL`

`gitpp ARGUMENTS_FOR_GIT_PULL` will execute your defined npm scripts `prepull` before executing `git pull ARGUMENTS_FOR_GIT_PULL`. If your `prepull` script fails, it will stop.

To install:
```bash
npm install -g prepull
```

To Use:
```bash
# Go to your git repository (via cd) 

gitpp ARGUMENTS_FOR_GIT_PULL

# Wait for prompts
# When it has finished, it will prompt you "done!"
```
