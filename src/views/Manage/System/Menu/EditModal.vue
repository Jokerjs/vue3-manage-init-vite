<template>
    <a-modal v-model:visible="dialogVisible" :title="form.id ? '编辑' : '新增'" @cancel="handleCancel" @ok="handleConfirm" :confirmLoading="loading" width="800px">
        <a-form ref="formRef" :model="form" :rules="rules" class="mg-modal-form" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
            <a-form-item label="上级菜单" name="parentId">
                <a-tree-select
                    v-model:value="form.parentId"
                    show-search
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    :fieldNames="{children:'children', label:'title', key:'key', value: 'id'}"
                    placeholder="上级菜单"
                    allow-clear
                    tree-default-expand-all
                    :tree-data="treeMenu"
                ></a-tree-select>
            </a-form-item>
            <a-form-item label="菜单类型" name="menuType">
                <mg-dic-select v-model="form.menuType" dicType="menu_type" type="radio"></mg-dic-select>
            </a-form-item>
            <a-form-item label="菜单图标" v-if="form.menuType !== 2">
                <a-input v-model:value="form.icon" placeholder="菜单图标"/>
            </a-form-item>
            <a-form-item label="菜单授权" v-if="form.menuType === 2">
                <a-input v-model:value="form.perms" placeholder="菜单授权"/>
            </a-form-item>
            <a-form-item label="菜单名称" v-if="form.menuType !== 2">
                <a-input v-model:value="form.name" placeholder="菜单名称"/>
            </a-form-item>
            <a-form-item label="路由地址" v-if="form.menuType !== 2">
                <a-input v-model:value="form.url" placeholder="路由地址"/>
            </a-form-item>
            <a-form-item label="是否隐藏">
                <a-switch v-model:checked="form.hidden"/>
            </a-form-item>
            <a-form-item label="排序">
                <a-input-number v-model:value="form.sortNo" :min="0"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import {_api, _http} from '@/libs/'
import editRepositories from '@/repositories/editRepositories'
import {ref} from 'vue'

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
    parentId: [{required: true, trigger: 'blur', message: '上级菜单不能为空'}],
    menuType: [{required: true, trigger: 'blur', message: '菜单类型不能为空'}]
})

const api = reactive({
    add: `${_api.system.menu}/add`,
    edit: `${_api.system.menu}/edit`
})

const treeMenu = ref([])

const {formRef, loading, form, dialogVisible, handleCancel, handleConfirm} = editRepositories(emit, props, api)

watch(dialogVisible, (val) => {
    if (val) getTreeDepart()
})

async function getTreeDepart() {
    treeMenu.value = await _http.get(`${_api.system.menu}/list`)
}

</script>

<style scoped>

</style>
