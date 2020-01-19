/**
 * @file 路由守卫模板生成脚本
 * @author zxhfighter
 */

import {
    Rule, url, chain, mergeWith, template, apply, move, branchAndMerge
} from '@angular-devkit/schematics';

import { strings as stringUtils } from '@angular-devkit/core';
import { Schema as ComponentOptions } from './schema';

import { setupOptions } from '../common/util';

export default function (options: ComponentOptions): Rule {
    setupOptions(options);

    const templateSource = apply(url('./files'), [
        template({
            ...stringUtils,
            ...options,
            getYear: () => new Date().getFullYear()
        }),
        move(options.path)
    ]);

    return chain([
        branchAndMerge(chain([
            mergeWith(templateSource)
        ])),
    ]);
}
