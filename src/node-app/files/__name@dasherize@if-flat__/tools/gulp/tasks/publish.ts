/**
 * @file 构建脚本
 * @author zxhfighter
 */

import {task, src, series} from 'gulp';
import {spawn} from 'child_process';
import chalk from 'chalk';
const {red, green} = chalk;
const git = require('gulp-git');
const yargs = require('yargs');
import {readFileSync, writeFileSync} from 'fs';

let newVersion = '';

task('sync-version', done => {
    const file = JSON.parse(readFileSync('src/package.json', 'utf-8'));
    newVersion = JSON.parse(readFileSync('dist/package.json', 'utf-8')).version;
    file.version = newVersion;
    writeFileSync('src/package.json', JSON.stringify(file, null, 4));
    done();
});

task('commit', () => {
    const commitMsg = yargs.argv.m;
    return src('.')
        .pipe(git.add())
        .pipe(git.commit(commitMsg || '【Prerelease】Bumped version number'));
});

task('pub', cb => {
    process.chdir('./dist');

    // 运行发布过程
    const p = spawn('yarn', ['publish']);

    // 输出错误数据
    p.stderr.on('data', error => {
        console.error(error.toString());
    });

    // 输出正常数据
    p.stdout.on('data', data => {
        console.log(data.toString());
    });

    // 退出处理
    p.on('exit', exitCode => {
        // 发布成功
        if (exitCode === 0) {
            console.log(`${green('发布成功!')}`, `最新版本号为：${newVersion}`);
        }
        // 发布失败
        else {
            console.log(`${red('发布失败!')}`);
        }
        cb();
    });
});

// 发布，包括：自动增加版本号，构建，发布
task('publish', series('build', 'bump', 'sync-version', 'commit', 'pub'));
