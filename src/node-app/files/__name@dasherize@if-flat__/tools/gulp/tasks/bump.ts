/**
 * @file 构建脚本
 * @author zxhfighter
 */

import {task, src, dest} from 'gulp';
const yargs = require('yargs');
const bump = require('gulp-bump');

task('bump', cb => {
    let bumpType = 'patch';

    if (yargs.argv.major) {
        bumpType = 'major';
    } else if (yargs.argv.minor) {
        bumpType = 'minor';
    }

    return src('./src/package.json')
        .pipe(bump({type: bumpType}))
        .on('error', console.log)
        .pipe(dest('./dist'));
});
