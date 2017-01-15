#!/usr/bin/env node

import chalk from "chalk";
import { spawnSync } from "child_process";
import fs from 'fs';
import inquirer from 'inquirer';
import jsonfile from 'jsonfile';


class CMD {

    constructor(path, args) {
        this.path = path;
        this.args = args;
    }

    execute(cb) {

        return new Promise((resolve, reject) => {
            const childProcess = spawnSync(this.path, this.args, {
                cwd: process.cwd(),
                stdio: 'inherit',
                env: process.env
            });

            if (childProcess.status !== 0) {

                inquirer.prompt({ type: 'confirm', name: 'ans', message: 'command failed.. Would you like to continue the execution?', default: false }).then((ans) => {

                    if (ans.ans !== true) {

                        if (childProcess.error) {
                            throw childProcess.error;
                        }
                        console.log(chalk.red('gitp failed.'));
                        process.exit(1);
                    } else {
                        resolve();
                    }
                });
            } else {
                resolve();
            }

        });
    }
}

main();

function main() {

    console.log('Start running gitp');

    runHook('prepull').then(() => {
        console.log(chalk.yellow('run git pull'));
        return (new CMD('git', ['pull'].concat(process.argv.slice(2))).execute());
    }).then(() => {
        return runHook('postpull');
    }).then(() => {
        console.log(chalk.green('done!'));
    });

}


function runHook(name) {
    if (hasHook(name)) {
        console.log(chalk.yellow(`run ${name} hook`));
        return (new CMD(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', name]).execute());
    }
    return Promise.resolve();
}


function hasHook(name) {
    try {
        if (typeof jsonfile.readFileSync('package.json').scripts[name] !== 'undefined')
            return true;
    } catch (err) {}

    return false;
}
