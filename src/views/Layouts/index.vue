<template>
    <a-layout class="mg-container">
        <a-layout-sider v-model:collapsed="isCollapse" :width="isCollapse ? '60px' : '240px'">
            <mg-side/>
        </a-layout-sider>
        <a-layout>
            <a-layout-header height="50px" :style="{background: `${headerColor}`}" class="mg-a-header">
                <mg-header />
            </a-layout-header>
            <a-layout-content>
                <mg-breadcrumb />
                <div class="mg-layout-content">
                    <router-view />
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup>
import MgSide from '@/views/Layouts/components/MgSide'
import MgHeader from '@/views/Layouts/components/MgHeader'
import MgBreadcrumb from '@/views/Layouts/components/MgBreadcrumb'

const mgStore = useStore()

const isCollapse = computed(() => mgStore.getters['view/isCollapse'])
const headerColor = computed(() => mgStore.getters['view/headerColor'])
</script>

<style scoped lang="scss">
.mg-container {
    height: 100vh;
}

.mg-a-header {
    padding: 0 20px;
    height: 50px;
    border-bottom: 1px solid $base-border-color;
}

.mg-layout-content {
    position: relative;
    padding: 15px;
    overflow-y: auto;
    height: calc(100% - 35px)
}
</style>
