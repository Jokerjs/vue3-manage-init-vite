<template>
    <a-layout-header height="50px" class="mg-menu-header" :style="{background: menuColor, color: menuTextColor}">
        <img src="@/assets/logo.png" class="mg-menu-header-logo" v-if="!isCollapse"/>
        <span class="mg-menu-header-title" v-if="!isCollapse">{{ title }}</span>
    </a-layout-header>
    <mg-Scroll :height="'calc(100% - 50px)'" :style="{background: menuColor}">
        <mg-menu/>
    </mg-Scroll>
</template>

<script setup>
import website from '@/config/website.js'
import MgMenu from '@/views/Layouts/components/MgMenu.vue'

const title = ref(website.base_title)
const mgStore = useStore()
const menuColor = computed(() => mgStore.getters['view/menuColor'])
const menuTextColor = computed(() => mgStore.getters['view/menuTextColor'])
const isCollapse = computed(() => mgStore.getters['view/isCollapse'])
</script>

<style scoped lang="scss">
.mg-menu-header {
    height: 50px;
    display: flex;
    align-items: center;
    line-height: 50px;
    padding: 0 20px;

    .mg-menu-header-logo {
        width: 80px;
        height: 30px;
        margin-right: 15px;
    }

    .mg-menu-header-title {
        font-size: $base-font-size-big;
    }
}
</style>
