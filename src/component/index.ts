/**
 * @file 组件模板生成脚本
 * @author zxhfighter
 */

import {
    Rule, url, chain, mergeWith, template,
    apply, move, branchAndMerge, Tree, SchematicContext
} from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';
import { Schema as ComponentOptions } from './schema';
import {
    setupOptions,
    addDeclarationToNgModule
} from '../common/util';

export default function (options: ComponentOptions): Rule {

    return (host: Tree, context: SchematicContext) => {
        setupOptions(options, host);

        const templateSource = apply(url('./files'), [
            template({
                ...strings,
                'if-flat': (s: string) => options.flat ? '' : s,
                ...options,
                getYear: () => new Date().getFullYear()
            }),
            move(options.path)
        ]);

        const rule = chain([
            branchAndMerge(chain([
                addDeclarationToNgModule(options, 'component'),
                mergeWith(templateSource)
            ]))
        ]);

        return rule(host, context);
    };
}
