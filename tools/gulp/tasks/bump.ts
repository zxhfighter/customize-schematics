/**
 * @file 自动增加版本号
 * @author zxhfighter
 */

import { task, src, dest } from 'gulp';

const yargs = require('yargs');
const bump = require('gulp-bump');

task('bump-version', () => {
    let bumpType = 'patch';
    if (yargs.argv.major) {
        bumpType = 'major';
    }
    else if (yargs.argv.minor) {
        bumpType = 'minor';
    }

    return src('./package.json')
        .pipe(bump({type: bumpType}).on('error', console.error))
        .pipe(dest('./dist'));
});
