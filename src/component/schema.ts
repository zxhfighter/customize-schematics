/**
 * @file 命令参数模型
 * @author zxhfighter
 */

import { CommonSchema } from '../common/schema.common';
export interface Schema extends CommonSchema {

    /** 是否打平（不新建组件文件夹） */
    flat?: boolean;

    /** 组件选择器前缀 */
    prefix?: string;

    /** 组件选择器 */
    selector?: string;

    /** 忽略测试 */
    skipTests?: boolean;
}
