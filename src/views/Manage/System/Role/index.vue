<template>
    <div class="mg-layout-container">
        <a-form layout="inline" :model="query" class="mg-list-form">
            <a-form-item label="角色名称">
                <a-input v-model:value="query.roleName" allowClear @change="getList()"/>
            </a-form-item>
            <a-form-item>
                <a-space>
                    <a-button type="primary" @click="getList()">查询</a-button>
                    <a-button type="primary" @click="handleEdit()">新增</a-button>
                </a-space>
            </a-form-item>
        </a-form>

        <a-table
            bordered
            :columns="columns"
            :row-key="record => record.id"
            :data-source="list"
            :pagination="pagination"
            :loading="loading"
            @change="getList"
        >
            <template #bodyCell="{ column, record }">
                <a-space v-if="column.dataIndex === 'operation'">
                    <a-button type="primary" @click="handleEdit(record)">修改</a-button>
                    <a-button type="primary" @click="handleRoleMenu(record)">授权</a-button>
                    <a-button type="primary" @click="handleDelete(record)" ghost>删除</a-button>
                </a-space>
            </template>
        </a-table>

        <edit-modal v-model:formData="dialogModel.formData" v-model:dialogFormVisible="dialogModel.dialogFormVisible" @onSubmit="getList(query)"/>
        <role-menu-modal v-model:formData="roleMenuModel.formData" v-model:dialogFormVisible="roleMenuModel.dialogFormVisible" @onSubmit="getList(query)"/>
    </div>
</template>

<script setup name="Role">
import {_api} from '@/libs/'
import tableRepositories from '@/repositories/tableRepositories'
import toolUtils from '@/utils/toolUtils'
import EditModal from './EditModal'
import RoleMenuModal from './RoleMenuModal'

const api = reactive({
    list: `${_api.system.role}/list`,
    delete: `${_api.system.role}/delete`
})

const columns = [
    {title: '角色编码', dataIndex: 'roleCode'},
    {title: '角色名称', dataIndex: 'roleName'},
    {title: '创建时间', dataIndex: 'createTime'},
    {title: '操作', dataIndex: 'operation', width: '260px'}
]

const roleMenuModel = reactive({
    formData: {},
    dialogFormVisible: false
})

const {loading, query, pagination, dialogModel, list, getList, handleEdit, handleDelete} = tableRepositories(api)

// 授权
async function handleRoleMenu(row) {
    roleMenuModel.formData = toolUtils.deepcopy(row)
    roleMenuModel.dialogFormVisible = true
}
</script>

<style scoped>

</style>
