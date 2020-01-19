/**
 * @file 命令参数模型
 * @author zxhfighter
 */

import { CommonSchema } from '../common/schema.common';
export interface Schema extends CommonSchema {

    /** 是否打平 */
    flat?: boolean;

    /** 是否创建路由 */
    routing?: boolean;

    /**
     * The scope for the new routing module.
     */
    routingScope?: RoutingScope;

    /**
     * When true, the new NgModule imports "CommonModule".
     */
    commonModule?: boolean;
}

export declare enum RoutingScope {
    Child = "Child",
    Root = "Root"
}
