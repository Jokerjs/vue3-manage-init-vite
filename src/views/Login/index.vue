<template>
    <div class="login-container">
        <a-row>
            <a-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
                <div style="color: transparent">占位符</div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <a-form ref="refForm" :model="form" :rules="rules" class="login-form" label-position="left">
                    <div class="title">hello !</div>
                    <div class="title-tips">欢迎来到{{ title }}！</div>
                    <a-form-item style="margin-top: 40px" name="username">
                        <a-input v-model:value="form.username" placeholder="请输入用户名">
                            <template #prefix>
                                <UserOutlined/>
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item name="password">
                        <a-input v-model:value="form.password" :type="passwordType" placeholder="请输入密码" @keyup.enter="handleLogin">
                            <template #prefix>
                                <LockOutlined/>
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item name="password">
                        <a-button :loading="loading" class="login-btn" type="primary" @click="handleLogin">登录</a-button>
                    </a-form-item>
                </a-form>
            </a-col>
        </a-row>
    </div>
</template>

<script setup>
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue'
import website from '@/config/website'

const mgStore = useStore()
const mgRouter = useRouter()

const refForm = ref(null)
const title = ref(website.base_title)
const passwordType = ref('password')
const loading = ref(false)
const form = reactive({
    username: 'admin',
    password: '123456'
})
const rules = reactive({
    username: [
        {
            required: true,
            trigger: 'blur',
            message: '用户名不能为空'
        }],
    password: [
        {
            required: true,
            trigger: 'blur',
            message: '密码不能为空'
        }
    ]
})

async function handleLogin() {
    loading.value = true
    try {
        await refForm.value.validateFields()
        await mgStore.dispatch('user/LoginByUsername', form)
        loading.value = false
        mgRouter.push({path: '/Manage'})
    } catch (errorInfo) {
        loading.value = false
    }
}
</script>

<style lang="scss" scoped>
.login-container {
    height: 100vh;
    background: url('@/assets/login_images/login_background.png') center center fixed no-repeat;
    background-size: cover;

    .title {
        font-size: 54px;
        font-weight: 500;
        color: #ffffff;
    }

    .title-tips {
        margin-top: 29px;
        font-size: 26px;
        font-weight: 400;
        color: #ffffff;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .login-btn {
        width: 100%;
        height: 48px;
        margin-top: 5px;
        border-radius: 99px;

        &:hover {
            opacity: 0.9;
        }
    }

    .login-form {
        width: 380px;
        padding: 4vh;
        margin-top: calc(50vh - 250px);
        background: url('@/assets/login_images/login_form.png');
        background-size: 100% 100%;
        border-radius: 10px;
        box-shadow: 0 2px 8px 0 rgb(7 17 27 / 6%);
    }

    ::v-deep {
        .ant-form-item-control-input {
            box-sizing: border-box;

            input {
                height: 48px;
                padding-left: 5px;
                border: 0;
            }
        }
    }
}
</style>
