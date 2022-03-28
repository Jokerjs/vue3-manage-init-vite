import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import'
import createCompression from './compression'
import createSetupExtend from './setup-extend'
import createEslintPlugin from './plugin-eslint'

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [vue({refTransform: true})]
    vitePlugins.push(createEslintPlugin())
    vitePlugins.push(createAutoImport())
    vitePlugins.push(createSetupExtend())
    isBuild && vitePlugins.push(...createCompression(viteEnv))
    return vitePlugins
}
