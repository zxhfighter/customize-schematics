/**
 * @file rollup 配置
 * @author zxhfighter
 */


import commonjs from 'rollup-plugin-commonjs';
import {uglify} from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import license from 'rollup-plugin-license';

// 获取最新提交的 hash 值
const commitHash = require('child_process')
    .execSync('git rev-parse --short HEAD', {encoding: 'utf-8'})
    .trim();

const uglifyInstance = uglify({
    mangle: {
        // captureExceptions 和 captureMessage 为公共 API，不希望混淆
        reserved: ['captureException', 'captureMessage']
    }
});

const bundleConfig = {
    input: 'dist/esm5/index.js',
    output: {
        format: 'iife',
        name: 'mingo',
        sourcemap: true,
        exports: 'named'
    },
    context: 'window',
    plugins: [
        resolve({
            mainFields: ['module', 'main']
        }),
        commonjs(),
        license({
            sourcemap: true,
            banner: `/*! @@package <%= pkg.version %> (${commitHash}) */`
        })
    ]
};

export default [
    // {
    //     input: 'dist/esm5/index.js',
    //     output: {
    //         file: 'dist/index.js',
    //         format: 'cjs',
    //         exports: 'named',
    //         interop: false,
    //         sourcemap: true
    //     },
    //     // external: ['tslib'],
    //     plugins: [
    //         resolve({
    //             jsnext: true,
    //             main: true,
    //             browser: true
    //         }),
    //         commonjs()
    //     ]
    // },
    Object.assign({}, bundleConfig, {
        output: Object.assign({}, bundleConfig.output, {
            file: 'dist/bundles/mingo.js'
        })
    }),
    Object.assign({}, bundleConfig, {
        output: Object.assign({}, bundleConfig.output, {
            file: 'dist/bundles/mingo.min.js'
        }),
        // Uglify has to be at the end of compilation, BUT before the license banner
        plugins: bundleConfig.plugins
            .slice(0, -1)
            .concat(uglifyInstance)
            .concat(bundleConfig.plugins.slice(-1))
    })
];
