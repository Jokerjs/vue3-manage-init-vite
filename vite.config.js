import {defineConfig, loadEnv} from 'vite';
import createVitePlugins from './vite/plugins';
import path from 'path';

export default defineConfig(({mode, command}) => {
    const env = loadEnv(mode, process.cwd());
    return {
        server: {
            port: 8888,
            host: true,
        },
        resolve: {
            alias: {
                // 设置路径
                '~': path.resolve(__dirname, './'),
                // 设置别名
                '@': path.resolve(__dirname, './src')
            },
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'] // 导入时可以忽略后缀，建议写后缀
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/styles/variables.scss";'
                }
            }
        },
        plugins: createVitePlugins(env, command === 'build')
    };
});
