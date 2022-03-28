module.exports = {
    root: true,

    env: {
        node: true,
        'vue/setup-compiler-macros': true
    },

    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        'vue-global-api',
        './.eslintrc-auto-import.json'
    ],

    parserOptions: {
        ecmaVersion: 2020
    },

    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/script-setup-uses-vars': 'off',
        'no-useless-escape': 'off',
        'no-unused-vars': [
            'error',
            // we are only using this rule to check for unused arguments since TS
            // catches unused variables but not args.
            { varsIgnorePattern: '.*', args: 'none' }
        ],
        "no-inner-declarations": ["error"], // 禁止在嵌套的块中出现变量声明或 function 声明
        "no-irregular-whitespace": ["error"], // 禁止在字符串和注释之外不规则的空白
        "no-unexpected-multiline": ["error"], // 禁止出现令人困惑的多行表达式
        "no-redeclare": ["error", { "builtinGlobals": true }], // 禁止重新声明变量
        "no-self-assign": ["error", { props: true }], // 禁止自我赋值
        "no-var": ["error"], // 要求使用 let 或 const 而不是 var
    }
};
