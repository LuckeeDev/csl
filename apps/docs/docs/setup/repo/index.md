---
title: Set up the repo
sidebar_position: 1
---
## System requirements

The first step to have a working copy of CSL on your local machine is to have [git](https://github.com/git-guides/install-git), [NodeJS](https://nodejs.org), [Yarn](https://yarnpkg.com/) and [PostgreSQL](https://www.postgresql.org/) installed on your sistem. Please note that the suggested version of Node is [`16.19.1`](https://nodejs.org/download/release/v16.19.1/), since some of the packages used in the project break on the latest Node version. You will need these tools to download and run the code of the project.

## Cloning the repo

If you already have git, you can clone the repo with the following command:

```
git clone https://github.com/LuckeeDev/csl
```

Once you have the repo, you must download all dependencies with the `yarn install` command. This will create a `node_modules` folder containing all of the dependencies specified in `package.json`.