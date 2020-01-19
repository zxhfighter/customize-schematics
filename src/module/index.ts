/**
 * @file 模块模板生成脚本
 * @author zxhfighter
 */

import {
    Rule, url, chain, mergeWith, template,
    apply, move, branchAndMerge, Tree, SchematicContext
} from '@angular-devkit/schematics';

import { strings as stringUtils } from '@angular-devkit/core';
import { Schema as ComponentOptions } from './schema';

import {
    setupOptions,
    addImportToNgModule
} from '../common/util';

export default function (options: ComponentOptions): Rule {

    return (host: Tree, context: SchematicContext) => {
        setupOptions(options, host);

        const templateSource = apply(url('./files'), [
            template({
                ...stringUtils,
                'if-flat': (s: string) => options.flat ? '' : s,
                ...options,
                getYear: () => new Date().getFullYear()
            }),
            move(options.path)
        ]);

        const rule = chain([
            branchAndMerge(chain([
                addImportToNgModule(options),
                mergeWith(templateSource)
            ]))
        ]);

        return rule(host, context);
    };
}
