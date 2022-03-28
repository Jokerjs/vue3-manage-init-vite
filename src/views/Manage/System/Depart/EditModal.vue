<template>
    <a-modal v-model:visible="dialogVisible" :title="form.id ? '编辑' : '新增'" @cancel="handleCancel" @ok="handleConfirm" :confirmLoading="loading">
        <a-form ref="formRef" :model="form" :rules="rules" class="mg-modal-form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
            <a-form-item label="部门名称" name="departName">
                <a-input v-model:value="form.departName" placeholder="部门名称"/>
            </a-form-item>
            <a-form-item label="上级部门" v-if="form.parentId">
                <a-tree-select
                    v-model:value="form.parentId"
                    show-search
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    placeholder="上级部门"
                    allow-clear
                    tree-default-expand-all
                    :tree-data="treeDepart"
                ></a-tree-select>
            </a-form-item>
            <a-form-item label="手机号">
                <a-input v-model:value="form.mobile" placeholder="手机号"/>
            </a-form-item>
            <a-form-item label="地址">
                <a-input v-model:value="form.address" placeholder="地址"/>
            </a-form-item>
            <a-form-item label="域名">
                <a-input v-model:value="form.realmName" placeholder="域名"/>
            </a-form-item>
            <a-form-item label="排序">
                <a-input-number v-model:value="form.departOrder" :min="0"/>
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea v-model:value="form.memo" placeholder="备注" :rows="4"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import {_api, _http} from '@/libs'
import editRepositories from '@/repositories/editRepositories'

const emit = defineEmits(['update:formData', 'update:dialogFormVisible', 'onSubmit'])
const props = defineProps({
    formData: {
        type: Object,
        default() {
            return {}
        }
    },
    dialogFormVisible: {
        type: Boolean,
        default: false
    }
})

const rules = reactive({
    departName: [{required: true, trigger: 'blur', message: '部门名称不能为空'}],
    name: [{required: true, trigger: 'blur', message: '职务名称不能为空'}]
})

const api = reactive({
    add: `${_api.system.depart}/add`,
    edit: `${_api.system.depart}/edit`
})

const treeDepart = ref([])

const {formRef, loading, form, dialogVisible, handleCancel, handleConfirm} = editRepositories(emit, props, api)

watch(dialogVisible, (val) => {
    if (val) getTreeDepart()
})

async function getTreeDepart() {
    treeDepart.value = await _http.get(`${_api.system.depart}/queryIdTree`)
}

</script>

<style scoped>

</style>
