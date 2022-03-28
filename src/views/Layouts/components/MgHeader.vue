<template>
    <div class="mg-header">
        <div class="header-collapse" @click="collapsedSider">
            <menu-unfold-outlined v-if="isCollapse"/>
            <menu-fold-outlined v-else/>
        </div>
        <a-dropdown>
            <span class="avatar-dropdown">
                <img class="user-avatar" :src="avatar" alt=""/>
                <div class="user-name">
                    <span>{{ username }}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
            </span>
            <template #overlay>
                <a-menu @click="command">
                    <a-menu-item key="github">个人中心</a-menu-item>
                    <a-menu-item key="logout" divided>退出登录</a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script setup>
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons-vue'

const mgStore = useStore()
const mgRouter = useRouter()

const avatar = computed(() => mgStore.getters['user/avatar'])
const username = computed(() => mgStore.getters['user/username'])
const isCollapse = computed(() => mgStore.getters['view/isCollapse'])

function collapsedSider() {
    mgStore.commit('view/TOGGLE_COLLAPSE')
}

function command({key}) {
    switch (key) {
        case 'logout':
            mgStore.commit('user/USER_INFO_LOGINOUT')
            mgRouter.push({path: '/login'})
            break
    }
}
</script>

<style scoped lang="scss">
.mg-header {
    line-height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-collapse {
    font-size: 18px;
    cursor: pointer;
}

.avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    height: 50px;
    padding: 0;

    .user-avatar {
        width: 40px;
        height: 40px;
        cursor: pointer;
        border-radius: 50%;
    }

    .user-name {
        position: relative;
        margin-left: 5px;
        margin-left: 5px;
        cursor: pointer;
    }
}
</style>
