<template>
    <a-modal v-model:visible="dialogVisible" title="授权" @cancel="handleCancel" @ok="handleConfirm" :confirmLoading="loading" width="800px">
        <a-form ref="formRef" :model="form" class="mg-modal-form">
            <a-form-item label="角色权限" name="roleCode">
                <div>
                    <div>
                        <a-button @click="checkAll(allTreeKeys)">全部勾选</a-button>
                        <a-button @click="checkAll()">取消全选</a-button>
                    </div>
                    <c-scrollbar height="calc(70vh - 240px)" class="role-tree">
                        <a-tree
                            v-if="menus.length"
                            :fieldNames="{children:'children', title:'slotTitle', key:'key'}"
                            :tree-data="menus"
                            v-model:checkedKeys="checkedKeys"
                            :selectable="false"
                            checkStrictly
                            checkable
                            default-expand-all
                        >
                            <template #title="{ slotTitle, data }">
                                <div class="tree-btn">
                                    <div style="margin-right: 20px">{{ slotTitle }}</div>
                                    <div v-if="data.children && data.children.length > 0">
                                        <a-tooltip title="勾选子项">
                                            <a-button type="dashed" shape="circle" size="small" style="margin-right: 10px" @click.stop="checkAllNode(data, true)">
                                                <template #icon>
                                                    <check-outlined/>
                                                </template>
                                            </a-button>
                                        </a-tooltip>
                                        <a-tooltip title="取消子项">
                                            <a-button type="dashed" shape="circle" size="small" @click.stop="checkAllNode(data, false)">
                                                <template #icon>
                                                    <close-outlined/>
                                                </template>
                                            </a-button>
                                        </a-tooltip>
                                    </div>
                                </div>
                            </template>
                        </a-tree>
                        <a-empty v-else/>
                    </c-scrollbar>
                </div>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import {_http, _api} from '@/libs/'
import editRepositories from '@/repositories/editRepositories'
import {CheckOutlined, CloseOutlined} from '@ant-design/icons-vue'
import toolUtils from '@/utils/toolUtils'

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

const allTreeKeys = ref([])
const menus = ref([])
const defaultCheckedKeys = ref([])
const checkedKeys = ref([])

const {formRef, loading, form, dialogVisible, handleCancel} = editRepositories(emit, props)

watch(dialogVisible, (val) => {
    if (val) getMenus()
})

// 全选，反选
function checkAll(all = []) {
    checkedKeys.value = all
}

// 全选，反选子项
function checkAllNode(node, check) {
    const type = check ? 'push' : 'remove'
    const isKeys = !check
    node.children.forEach(item => {
        if (checkedKeys.value.checked) {
            if (checkedKeys.value.checked.includes(item.key) === isKeys) checkedKeys.value.checked[type](item.key)
        } else {
            if (checkedKeys.value.includes(item.key) === isKeys) checkedKeys.value[type](item.key)
        }
    })
}

async function getMenus() {
    const {treeList, ids} = await _http.get(_api.system.queryTreeList)
    const queryRolePermissions = await _http.get(_api.system.queryRolePermission, {params: {roleId: form.value.id}})
    menus.value = treeList
    allTreeKeys.value = ids
    defaultCheckedKeys.value = toolUtils.deepcopy(queryRolePermissions)
    checkedKeys.value = queryRolePermissions
}

async function handleConfirm() {
    const data = {
        roleId: form.value.id,
        lastpermissionIds: defaultCheckedKeys.value.join(','),
        permissionIds: checkedKeys.value.checked ? checkedKeys.value.checked.join(',') : checkedKeys.value.join(',')
    }
    await _http.post(_api.system.saveRolePermission, data)
    emit('onSubmit', data)
    handleCancel()
}
</script>

<style scoped lang="scss">
.role-tree {
    margin-top: 15px;
    border: 1px solid $base-border-color;
}

.tree-btn {
    display: flex;
    align-items: center;
}
</style>
