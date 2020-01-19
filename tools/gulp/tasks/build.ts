/**
 * @file 构建脚本
 * @author zxhfighter
 */

import { task, src, dest, series } from 'gulp';
import { spawn } from 'child_process';
import chalk from 'chalk';
import { join } from 'path';

const { red, green } = chalk;
const rootDir = join(__dirname, '../../../');

task('do-build', cb => {

    const tscPath = join(rootDir, 'node_modules/.bin/tsc');
    const tsConfigPath = join(rootDir, 'tsconfig.json');

    // ng build lib
    const p = spawn(tscPath, ['-p', tsConfigPath]);

    p.stderr.on('data', (error) => {
        console.error(error);
    });

    p.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    p.on('exit', exitCode => {
        if (exitCode === 0) {
            console.log(`${green('构建 Schematics 成功!')}`);
        }
        else {
            console.log(`${red('构建 Schematics 失败!')}`);
        }
        cb();
    });
});

task('copy-files', cb => {

    const distDir = join(rootDir, 'dist');

    // 拷贝 collection.json
    src([
        join(rootDir, 'src/collection.json'),
        join(rootDir, 'package.json')
    ])
    .pipe(dest(distDir));

    // 拷贝所有 files
    src([
        join(rootDir, 'src/**/files/**')
    ])
    .pipe(dest(distDir));

    // 拷贝所有 schema.json
    src([
        join(rootDir, 'src/**/schema.json')
    ])
    .pipe(dest(distDir));

    cb();
});

task('build', series('do-build', 'copy-files'));
