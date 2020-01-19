/**
 * @file Node 项目命令参数模型
 * @author zxhfighter
 */

export interface Schema {

    /** 名称 */
    name: string;

    /** 当前所处路径 */
    path: string;

    /** 用户名 */
    user?: string;

    /** 是否打平 */
    flat?: boolean;

    /** 项目名称 */
    project?: string;
}
