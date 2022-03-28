import autoImport from 'unplugin-auto-import/vite';

export default function createAutoImport() {
    return autoImport({
        imports: [
            'vue',
            'vue-router',
            {'vuex': ['useStore']}
        ], // 自动导入vue相关函数
        eslintrc: {
            enabled: false, // Default `false`, 自动生成时为true
            filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
            globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        dts: false
    });
}
