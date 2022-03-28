import eslintPlugin from 'vite-plugin-eslint';

export default function createEslintPlugin() {
    return eslintPlugin({
        // 清缓存
        cache: false
    })
}
