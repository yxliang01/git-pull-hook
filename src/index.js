#!/usr/bin/env node
import chalk from "chalk";
import {spawnSync} from "child_process";

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
            console.log(chalk.red('gitpp failed.'));
            process.exit(1);
        }

    }
}

main();

function main() {
    console.log('Start running gitpp');
    new CMD(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'prepull']).execute();
    new CMD('git', ['pull'].concat(process.argv.slice(2))).execute();
    console.log(chalk.green('done!'));
}
