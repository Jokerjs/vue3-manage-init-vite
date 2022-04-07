import {defineConfig, loadEnv} from 'vite'
import createVitePlugins from './vite/plugins'
import path from 'path'

export default defineConfig(({mode, command}) => {
    const env = loadEnv(mode, process.cwd())
    return {
        server: {
            port: 8888,
            host: true
        },
        build: {
            minify: 'terser',
            terserOptions: {
                compress: {
                    //生产环境时移除console
                    drop_console: true,
                    drop_debugger: true,
                },
            },
            rollupOptions: {
                output: { //静态资源分类打包
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                    manualChunks(id) { //静态资源分拆打包
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    }
                }
            }
        },
        resolve: {
            alias: {
                // 设置路径
                '~': path.resolve(__dirname, './'),
                // 设置别名
                '@': path.resolve(__dirname, './src')
            },
            extensions: ['.js', '.json', '.vue'] // 导入时可以忽略后缀，建议写后缀
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/styles/variables.scss";'
                }
            }
        },
        plugins: createVitePlugins(env, command === 'build')
    }
})
