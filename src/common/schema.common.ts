/**
 * @file 共用 schema
 * @author zxhfighter
 */

export interface CommonSchema {

    /** 名称 */
    name: string;

    /** 当前所处路径 */
    path: string;

    /** 当前所在项目 */
    project: string;

    /** 用户名 */
    user?: string;

    /** 父模块 */
    module?: string;

    skipImport?: boolean;
}
