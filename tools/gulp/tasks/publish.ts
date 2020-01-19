/**
 * @file 自动发布脚本
 * @author zxhfighter
 */

import { task, series, src } from 'gulp';
import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import chalk from 'chalk';
const git = require('gulp-git');
const yargs = require('yargs');

const { red, green } = chalk;

// 自动提交
task('commit', () => {
    const commitMsg = yargs.argv.m;
    return src('.')
        .pipe(git.add())
        .pipe(git.commit(commitMsg || '【Prerelease】Bumped version number'));
});

// 实际发布任务
task('pub', cb => {

    // 切换目录
    process.chdir('./dist');

    // 运行发布过程
    const p = spawn('npm', ['publish']);

    // 输出错误数据
    p.stderr.on('data', (error) => {
        console.error(error.toString());
    });

    // 输出正常数据
    p.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    // 退出处理
    p.on('exit', (exitCode) => {

        // 发布成功
        if (exitCode === 0) {
            const packageFile = JSON.parse(readFileSync('./package.json', 'utf8').toString());
            console.log(`${green('发布成功!')}`, `最新版本号为：${packageFile.version}`);
        }
        // 发布失败
        else {
            console.log(`${red('发布失败!')}`);
        }

        process.chdir('../');
        cb();
    });
});

// 发布，包括：自动增加版本号，构建，发布
task('publish', series('bump-version', 'build', 'pub', 'commit'));
