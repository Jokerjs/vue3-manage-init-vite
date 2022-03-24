import autoImport from 'unplugin-auto-import/vite';

export default function createAutoImport() {
    return autoImport({
        imports: [
            'vue',
            'vue-router',
            {'vuex': ['useStore']}
        ], // 自动导入vue相关函数
        dts: false
    });
}
