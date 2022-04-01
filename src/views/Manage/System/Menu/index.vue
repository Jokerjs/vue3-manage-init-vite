<template>
    <div class="mg-layout-container">
        <a-form layout="inline" :model="query" class="mg-list-form">
            <a-form-item>
                <a-button type="primary" @click="handleEdit()">新增</a-button>
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
                    <a-button type="primary" @click="handleEdit({ parentId: record.id })">新增</a-button>
                    <a-button type="primary" @click="handleDelete(record)" ghost>删除</a-button>
                </a-space>
            </template>
        </a-table>

        <edit-modal v-model:formData="dialogModel.formData" v-model:dialogFormVisible="dialogModel.dialogFormVisible" @onSubmit="getList(query)"/>
    </div>
</template>

<script setup name="Menu">
import {_api} from '@/libs/'
import tableRepositories from '@/repositories/tableRepositories'
import EditModal from './EditModal'

const api = reactive({
    isPage: false,
    list: `${_api.system.menu}/list`,
    delete: `${_api.system.menu}/delete`
})

const columns = [
    {title: '菜单名称', dataIndex: 'name'},
    {title: '菜单类型', dataIndex: 'menuType'},
    {title: '图标', dataIndex: 'icon'},
    {title: '路径', dataIndex: 'url'},
    {title: '排序', dataIndex: 'sortNo'},
    {title: '创建日期', dataIndex: 'createTime'},
    {title: '操作', dataIndex: 'operation', width: '160px'}
]

const {loading, query, pagination, dialogModel, list, getList, handleEdit, handleDelete} = tableRepositories(api)
</script>

<style scoped>

</style>
