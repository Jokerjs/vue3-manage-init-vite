<template>
    <router-view v-slot="{ Component, route }">
        <keep-alive :include="cachedViews">
            <component :is="Component" :key="route.path"/>
        </keep-alive>
    </router-view>
</template>

<script setup>
const mgStore = useStore()

const cachedViews = computed(() => mgStore.getters['view/cachedViews'])
</script>
