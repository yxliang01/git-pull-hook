#!/usr/bin/env node
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _child_process = require("child_process");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _jsonfile = require("jsonfile");

var _jsonfile2 = _interopRequireDefault(_jsonfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CMD = function () {
    function CMD(path, args) {
        _classCallCheck(this, CMD);

        this.path = path;
        this.args = args;
    }

    _createClass(CMD, [{
        key: "execute",
        value: function execute(cb) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var childProcess = (0, _child_process.spawnSync)(_this.path, _this.args, {
                    cwd: process.cwd(),
                    stdio: 'inherit',
                    env: process.env
                });

                if (childProcess.status !== 0) {

                    _inquirer2.default.prompt({ type: 'confirm', name: 'ans', message: 'command failed.. Would you like to continue the execution?', default: false }).then(function (ans) {

                        if (ans.ans !== true) {

                            if (childProcess.error) {
                                throw childProcess.error;
                            }
                            console.log(_chalk2.default.red('gitp failed.'));
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
    }]);

    return CMD;
}();

main();

function main() {

    console.log('Start running gitp');

    runHook('prepull').then(function () {
        console.log(_chalk2.default.yellow('run git pull'));
        return new CMD('git', ['pull'].concat(process.argv.slice(2))).execute();
    }).then(function () {
        return runHook('postpull');
    }).then(function () {
        console.log(_chalk2.default.green('done!'));
    });
}

function runHook(name) {
    if (hasHook(name)) {
        console.log(_chalk2.default.yellow("run " + name + " hook"));
        return new CMD(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', name]).execute();
    }
    return Promise.resolve();
}

function hasHook(name) {
    try {
        if (typeof _jsonfile2.default.readFileSync('package.json').scripts[name] !== 'undefined') return true;
    } catch (err) {}

    return false;
}