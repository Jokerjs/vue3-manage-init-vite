<template>
    <template v-if="type === 'select'">
        <a-select v-model:value="value">
            <a-select-option v-for="item in dics" :value="dvalue(item.value)" :key="dvalue(item.value)">{{ item.title }}</a-select-option>
        </a-select>
    </template>
    <template v-else>
        <a-radio-group v-model:value="value">
            <a-radio v-for="item in dics" :value="dvalue(item.value)" :key="dvalue(item.value)">{{ item.title }}</a-radio>
        </a-radio-group>
    </template>
</template>

<script setup>
const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
    // v-model
    modelValue: [String, Number, Array],
    // 词典code
    dicType: String,
    // radio, select
    type: {
        type: String,
        default: 'select'
    }
})
const dics = ref([])
const mgStore = useStore()
const dictItems = computed(() => mgStore.getters['dics/dictItems'])

const value = computed({
    get: () => props.modelValue,
    set: (val) => {
        const option = getOption(val)
        emit('update:modelValue', val)
        emit('change', {val, option})
    }
})

dics.value = dictItems.value[props.dicType] || []

function dvalue(v) {
    return typeof props.modelValue === 'string' ? v : Number(v)
}

function getOption(val) {
    return dics.value.find((item) => dvalue(item.value) === val)
}
</script>

<style scoped>

</style>
