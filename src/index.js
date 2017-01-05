#!/usr/bin/env node
import chalk from "chalk";
import {spawnSync} from "child_process";
import fs from 'fs';

class CMD {

    constructor(path, args) {
        this.path = path;
        this.args = args;
    }

    execute() {

        const childProcess = spawnSync(this.path, this.args, {
            cwd: process.cwd(),
            stdio: 'inherit',
            env: process.env
        });

        if (childProcess.status !== 0) {
            if(childProcess.error) {
                throw childProcess.error;
            }
            console.log(chalk.red('gitp failed.'));
            process.exit(1);
        }

    }
}

main();

function main() {
    console.log('Start running gitp');


    if(isNodeModule()) {
        console.log(chalk.yellow('run prepull hook'));
        new CMD(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'prepull']).execute();
    }

    console.log(chalk.yellow('run git pull'));
    new CMD('git', ['pull'].concat(process.argv.slice(2))).execute();

    if(isNodeModule()) {
        console.log(chalk.yellow('run postpull hook'));
        new CMD(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'postpull']).execute();
    }

    console.log(chalk.green('done!'));
}

function isNodeModule() {
    return fs.existsSync('package.json');
}