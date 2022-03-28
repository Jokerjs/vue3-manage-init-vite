<template>
    <a-menu class="mg-menu"
            mode="inline"
            :style="{background: menuColor}"
            theme="dark"
            v-model:openKeys="vMenu.openNames"
            v-model:selectedKeys="vMenu.activeName"
            @click="handleClick">
        <mg-menu-item :menus="menus"/>
    </a-menu>
</template>

<script setup>
import MgMenuItem from '@/views/Layouts/components/MgMenuItem.vue'

const mgStore = useStore()
const mgRouter = useRouter()

const menuColor = computed(() => mgStore.getters['view/menuColor'])
const vMenu = computed(() => mgStore.getters['view/vMenu'])
const menus = computed(() => mgStore.getters['user/menus'])

function handleClick(e) {
    mgRouter.push({path: e.key})
}
</script>

<style scoped lang="scss">
.mg-menu {
    padding: 4px 8px;
    border-right: none;
}
</style>
