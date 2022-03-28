<template>
    <div class="mg-layout-container">
        <a-form layout="inline" :model="query" class="mg-list-form">
            <a-form-item label="职务名称">
                <a-input v-model:value="query.name" allowClear @change="getList()"/>
            </a-form-item>
            <a-form-item label="职务编码">
                <a-input v-model:value="query.code" allowClear @change="getList()"/>
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
                    <a-button type="primary" @click="handleDelete(record)" ghost>删除</a-button>
                </a-space>
            </template>
        </a-table>

        <edit-modal v-model:formData="dialogModel.formData" v-model:dialogFormVisible="dialogModel.dialogFormVisible" @onSubmit="getList(query)"/>
    </div>
</template>

<script setup>
import {_api} from '@/libs/'
import tableRepositories from '@/repositories/tableRepositories'
import EditModal from './EditModal'

const api = reactive({
    list: `${_api.system.position}/list`,
    delete: `${_api.system.position}/delete`
})

const columns = [
    {title: '职务编码', dataIndex: 'code'},
    {title: '职务名称', dataIndex: 'name'},
    {title: '创建时间', dataIndex: 'createTime'},
    {title: '操作', dataIndex: 'operation', width: '160px'}
]

const {loading, query, pagination, dialogModel, list, getList, handleEdit, handleDelete} = tableRepositories(api)
</script>

<style scoped>

</style>
