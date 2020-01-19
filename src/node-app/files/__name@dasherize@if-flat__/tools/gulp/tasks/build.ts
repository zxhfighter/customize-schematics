/**
 * @file 构建脚本
 * @author zxhfighter
 */

import {task, series} from 'gulp';
import {tsBuildTask, execNodeTask} from '../utils/task_helpers';

task('build-bundle', execNodeTask('rollup', ['--config']));
task('build-ts', tsBuildTask('tsconfig.json'));
task('build', series('clean', 'build-ts', 'build-bundle'));
