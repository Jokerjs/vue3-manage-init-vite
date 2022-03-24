<template>
    <div>{{ message }}</div>
    <input
        type="color"
        :value="colorState.primaryColor"
        @input="e => onColorChange('primaryColor', e)"
    />
    <a-button type="primary">primary</a-button>
</template>

<script setup>
import { ConfigProvider } from 'ant-design-vue';
const message = ref('ChangeInto')

const colorState = reactive({
    primaryColor: '#1890ff',
    errorColor: '#ff4d4f',
    warningColor: '#faad14',
    successColor: '#52c41a',
    infoColor: '#1890ff',
});

const onColorChange = (type, e) => {
    
};
</script>

<style scoped>

</style>
