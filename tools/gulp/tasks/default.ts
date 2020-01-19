/**
 * @file 帮助提示
 * @author zxhfighter
 */

import { task, series } from 'gulp';
import chalk from 'chalk';

const { yellow, red } = chalk;

task('help', (cb) => {
    console.log();
    console.log(`Try ${yellow('gulp build')} or ${yellow('gulp publish')}.`);
    console.log(`All available commands can be found in ${red('package.json')}.`);
    console.log();
    cb();
});

task('default', series('help'));
