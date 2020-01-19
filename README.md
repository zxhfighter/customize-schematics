# customize-schematics

使用 Angular Schematics 技术来快速生成**符合公司和团队的代码**。

目前支持如下对象的快速开发：

- 组件（component，缩写 c）
- 指令（directive，缩写 d）
- 服务（service，缩写 s）
- 类（class）
- 接口（interface，缩写 i）
- 枚举（enum，缩写 e）
- 管道（pipe，缩写 p）
- 守卫对象（guard，缩写 g）
- 列表（list，缩写 l）
- 表单（form，缩写 f）
- 应用（application，缩写 a）
- 组件库（library）
- SDK（sdk）

## 快速开始

开发一个 schematics 命令，需要在 src 下边新建一个对应文件夹。

该文件夹至少需要包含如下文件：

- `files`: 模板文件
- `index.ts`: 模板入口
- `schema.json`: 模板 schema
- `schema.ts`: 模板类型声明

主要代码在 `index.ts` 中开发，开发完毕后，在 `collection.json` 配置如何去通过 schematics 调用。

```json
{
    "$schema": "../node_modules/@angular-devkit/schematics/collection-schema.json",
    "schematics": {
        // schematic 名称缩写，可以通过如下方式调用
        // ng g customize-schematics:component abc
        "component": {
            // schematic 名称缩写，可以通过如下方式调用
            // ng g customize-schematics:c abc
            "aliases": [ "c" ],

            // schematic 作用
            "description": "组件生成器",

            // schematic 入口执行脚本
            "factory": "./component/index",

            // schematic 参数说明
            "schema": "./component/schema.json"
        }
    }
}
```

## 测试

开发好某个 schematic 之后，可以先在本地引入其它项目测试看看是否能够正常工作。

首先，构建开发好的 schematics，会构建在 dist 目录。

```
npm run build
```

之后，在其它项目，通过 `npm link` 引入刚才构建好的 schematics。

```
sudo npm link ../customize-schematics/dist
```

然后测试 schematic 命令是否能够正常工作。

```
ng g customize-schematics:your-command --yourargs=abc
```

参数目前支持如下两个参数：

* --name: 构建名称
* --user: 用户前缀

## 发布

运行 `npm run publish` 即可发布到 npm 镜像库。

```
npm run publish
```

发布成功后，需要将最新的 `package.json` 提交下。

之后，在项目中安装最新版本即可。

```
npm i -D customize-schematics@latest
```

## 如何贡献

欢迎任何 pr。

