<template>
    <a-modal v-model:visible="dialogVisible" :title="form.id ? '编辑' : '新增'" @cancel="handleCancel" @ok="handleConfirm" :confirmLoading="loading">
        <a-form ref="formRef" :model="form" :rules="rules" class="mg-modal-form">
            <a-form-item label="角色编码" name="roleCode">
                <a-input v-model:value="form.roleCode" placeholder="角色编码"/>
            </a-form-item>
            <a-form-item label="角色名称" name="roleName">
                <a-input v-model:value="form.roleName" placeholder="角色名称"/>
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
    roleCode: [{required: true, trigger: 'blur', message: '角色编码不能为空'}],
    roleName: [{required: true, trigger: 'blur', message: '角色名称不能为空'}]
});

const api = reactive({
    add: `${_api.system.role}/add`,
    edit: `${_api.system.role}/edit`
});

const {formRef, loading, form, dialogVisible, handleCancel, handleConfirm} = editRepositories(emit, props, api);
</script>

<style scoped>

</style>
