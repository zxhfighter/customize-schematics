/**
 * @file npm安装检测，推荐 yarn 安装
 * @author zxhfighter
 */

if (process.env.npm_execpath.indexOf('yarn') === -1) {
    console.error('请使用 Yarn 来安装依赖，参见：https://yarnpkg.com/lang/en/docs/install/');
    process.exit(1);
}
