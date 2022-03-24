<template>
    <a-modal v-model:visible="dialogVisible" :title="form.id ? '编辑' : '新增'" @cancel="handleCancel" @ok="handleConfirm" :confirmLoading="loading">
        <a-form ref="formRef" :model="form" :rules="rules" class="mg-modal-form">
            <a-form-item label="职务编码" name="code">
                <a-input v-model:value="form.code" placeholder="职务编码"/>
            </a-form-item>
            <a-form-item label="职务名称" name="name">
                <a-input v-model:value="form.name" placeholder="职务名称"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import {_api} from '@/libs/';
import editRepositories from '@/repositories/editRepositories';

const emit = defineEmits(['update:formData', 'update:dialogFormVisible', 'onSubmit']);
const props = defineProps({
    formData: {
        type: Object,
        default() {
            return {};
        }
    },
    dialogFormVisible: {
        type: Boolean,
        default: false
    }
});

const rules = reactive({
    code: [{required: true, trigger: 'blur', message: '职务编码不能为空'}],
    name: [{required: true, trigger: 'blur', message: '职务名称不能为空'}]
});

const api = reactive({
    add: `${_api.system.position}/add`,
    edit: `${_api.system.position}/edit`
});

const {formRef, loading, form, dialogVisible, handleCancel, handleConfirm} = editRepositories(emit, props, api);
</script>

<style scoped>

</style>
