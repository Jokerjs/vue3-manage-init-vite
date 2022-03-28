<template>
    <template v-for="item in menus">
        <a-sub-menu v-if="item.children && item.children.length > 0" :key="parentUrl + item.path" :style="{background: menuColor}">
            <template #icon>
                <mg-icon class="mg-menu-icon" :name="item.meta.icon"/>
            </template>
            <template #title>
                <span>{{ item.meta.title }}</span>
            </template>
            <mg-menu-item :menus="item.children" :parentUrl="parentUrl + item.path"/>
        </a-sub-menu>
        <a-menu-item v-else-if="!item.hidden" :key="parentUrl + item.path">
            <template #icon>
                <mg-icon class="mg-menu-icon" :name="item.meta.icon"/>
            </template>
            <span>{{ item.meta.title }}</span>
        </a-menu-item>
    </template>
</template>

<script setup>
const mgStore = useStore()
defineProps({
    menus: {
        type: Array,
        require: true
    },
    parentUrl: {
        type: String,
        default: '/Manage'
    }
})
const menuColor = computed(() => mgStore.getters['view/menuColor'])
</script>

<style scoped lang="scss">
.mg-menu-title {
    padding-left: 8px;
}
</style>
