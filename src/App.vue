<template>
    <a-config-provider :locale="zhCN" component-size="middle" :input="{autocomplete: 'off'}">
        <router-view/>
    </a-config-provider>
</template>
<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>
