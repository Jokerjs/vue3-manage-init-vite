import {computed, ref} from 'vue';
import {_http} from '@/libs'
export default function editRepositories(emit, props, api = {}) {
    const formRef = ref(null)
    const loading = ref(false)

    const form = computed({
        get: () => props.formData,
        set: (val) => {
            emit('update:formData', val);
        }
    });
    const dialogVisible = computed({
        get: () => props.dialogFormVisible,
        set: (val) => {
            emit('update:dialogFormVisible', val);
        }
    });

    function handleCancel() {
        emit('update:dialogFormVisible', false);
    }

    async function handleOnSubmit(data){
        loading.value = true
        const method = data.id ? 'put' : 'post'
        const url = data.id ? api.edit : api.add;
        try {
            await _http[method](url, data)
            loading.value = false
            emit('onSubmit', props.formData)
            handleCancel()
        }catch (e) {
            loading.value = false
        }
    }

    async function handleConfirm() {
        try {
            await formRef.value.validateFields();
            await handleOnSubmit(props.formData)
        } catch (errorInfo) {
            return false
        }
    }

    return {
        loading,
        formRef,
        form,
        dialogVisible,
        handleCancel,
        handleConfirm
    };
}
