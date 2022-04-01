<template>
    <div class="mg-breadcrumb" id="mgBreadcrumb">
        <c-scrollbar ref="scrollbarRef">
            <a-tag class="mg-breadcrumb-item"
                   :id="item.path"
                   v-for="item in breadcrumbs"
                   :key="item.path"
                   :color="breadcrumb.path === item.path ? primaryColor : ''"
                   @close="closeBreadcrumb(item)"
                   @click="changeBreadcrumb(item)"
                   :closable="breadcrumbs.length > 1"
            >{{ item.title }}
            </a-tag>
        </c-scrollbar>
    </div>
</template>

<script setup>
const mgRouter = useRouter()
const mgStore = useStore()

const primaryColor = computed(() => mgStore.getters['view/primaryColor'])
const breadcrumb = computed(() => mgStore.getters['view/breadcrumb'])
const breadcrumbs = computed(() => mgStore.getters['view/breadcrumbs'])

const scrollbarRef = ref(null)

watch(breadcrumb, () => {
    moveToCurrentTag()
})

function closeBreadcrumb(item) {
    mgStore.commit('view/CLOSE_CRUMB_DATA', item)
    if (item.path === breadcrumb.value.path) {
        changeBreadcrumb(breadcrumbs.value[breadcrumbs.value.length - 1])
    }
}

function changeBreadcrumb(item) {
    mgRouter.push({path: item.path})
}

function moveToCurrentTag() {
    nextTick(() => {
        const tagActive = document.getElementById(breadcrumb.value.path)
        if(scrollbarRef.value.hasHBar){
            scrollbarRef.value.setScrollLeft(tagActive.offsetLeft)
        }
    })
}
</script>

<style scoped lang="scss">
.mg-breadcrumb {
    width: 100%;
    height: 35px;
    padding: 6px 15px;
    background: #fff;
    white-space: nowrap;
}

.mg-breadcrumb-item {
    cursor: pointer;
}
</style>
