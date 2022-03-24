import {reactive, toRefs, computed} from 'vue';
import {_http} from '@/libs/';
import toolUtils from '@/utils/toolUtils';
import {notification, Modal} from 'ant-design-vue';

const initPages = {pageNo: 1, pageSize: 10};
export default function tableRepositories(api) {
    const query = reactive({
        ...initPages
    });
    const state = reactive({
        loading: false,
        list: [],
        total: 0,
        dialogModel: {
            formData: {},
            dialogFormVisible: false
        }
    });

    const pagination = computed(() => ({
        total: state.total,
        current: query.pageNo,
        pageSize: query.pageSize,
        showSizeChanger: true,
        showTotal(total, range) {
            return `${range[0]}/${range[1]} 共 ${total} 条`
        }
    }));

    // 获取列表
    async function getList(parameter = initPages) {
        state.loading = true;
        query.pageNo = parameter.pageNo || parameter.current;
        query.pageSize = parameter.pageSize;
        try {
            const {total, records} = await _http.get(api.list, {params: query});
            state.total = total;
            state.list = records;
            state.loading = false;
        } catch (e) {
            state.loading = false;
        }
    }

    // 修改，添加
    async function handleEdit(row = {}) {
        state.dialogModel = {
            formData: toolUtils.deepcopy(row),
            dialogFormVisible: true
        };
    }

    // 删除
    async function handleDelete(row) {
        Modal.confirm({
            title: '提示',
            content: '此操作将永久删除该数据, 是否继续?',
            async onOk() {
                await _http.delete(api.delete, {params: {id: row.id}});
                await getList();
            },
            onCancel() {
                notification.info({message: '已取消删除'});
            }
        });
    }

    getList();

    return {
        ...toRefs(state),
        query,
        pagination,
        getList,
        handleEdit,
        handleDelete
    };
}
