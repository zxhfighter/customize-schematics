/**
 * @file 实用方法
 * @author zxhfighter
 */

import {
    Rule, SchematicsException, Tree
} from '@angular-devkit/schematics';

import { buildRelativePath, findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { parseName } from '@schematics/angular/utility/parse-name';
import { strings as stringUtils } from '@angular-devkit/core';
import { addDeclarationToModule, addImportToModule } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import { getProject } from '@schematics/angular/utility/project';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';


/** 设置模块，名称，路径等 */
export function setupOptions(options: any, host?: Tree) {

    if (host) {
        options.module = findModuleFromOptions(host, options);

        const project = getProject(host, options.project);
        options.selector = options.selector || buildSelector(options, project.prefix);
    }

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
}

export interface CommonOptions {
    path: string;
    name: string;
    module?: string;
    flat?: boolean;
    prefix?: string;
    skipImport?: boolean;
}

const camelCase = (c: string) => c[0].toUpperCase() + c.slice(1);

/** 返回源文件 */
export function readIntoSourceFile(host: Tree, modulePath: string): ts.SourceFile {
    const text = host.read(modulePath);
    if (text === null) {
        throw new SchematicsException(`File ${modulePath} does not exist.`);
    }
    const sourceText = text.toString('utf-8');

    return ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
}


/** 添加声明文件（组件、指令、管道等）到最近层级的模块 */
export function addDeclarationToNgModule(options: CommonOptions, type: string = 'component'): Rule {
    return (host: Tree) => {

        if (options.skipImport || !options.module) {
            return host;
        }

        const modulePath = options.module || '';
        const source = readIntoSourceFile(host, modulePath);

        const objectPath = `/${options.path}/`
            + (options.flat ? '' : stringUtils.dasherize(options.name) + '/')
            + stringUtils.dasherize(options.name)
            + `.${type}`;
        const relativePath = buildRelativePath(modulePath, objectPath);
        const classifiedName = stringUtils.classify(`${options.name}${camelCase(type)}`);
        const declarationChanges = addDeclarationToModule(source,
            modulePath,
            classifiedName,
            relativePath
        );

        const declarationRecorder = host.beginUpdate(modulePath);
        for (const change of declarationChanges) {
            if (change instanceof InsertChange) {
                declarationRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(declarationRecorder);

        return host;
    };
}

export function addImportToNgModule(options: CommonOptions): Rule {
    return (host: Tree) => {

        if (options.skipImport || !options.module) {
            return host;
        }

        const modulePath = options.module || '';
        const source = readIntoSourceFile(host, modulePath);

        const componentPath = `/${options.path}/`
            + (options.flat ? '' : stringUtils.dasherize(options.name) + '/')
            + stringUtils.dasherize(options.name)
            + '.module';
        const relativePath = buildRelativePath(modulePath, componentPath);
        const classifiedName = stringUtils.classify(`${options.name}Module`);
        const changes = addImportToModule(
            source,
            modulePath,
            classifiedName,
            relativePath
        );

        const recorder = host.beginUpdate(modulePath);
        for (const change of changes) {
            if (change instanceof InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(recorder);

        return host;
    };
}

/** 构建选择器 */
export function buildSelector(options: CommonOptions, projectPrefix: string) {
    let selector = stringUtils.dasherize(options.name);
    if (options.prefix) {
        selector = `${options.prefix}-${selector}`;
    } else if (options.prefix === undefined && projectPrefix) {
        selector = `${projectPrefix}-${selector}`;
    }

    return selector;
}
