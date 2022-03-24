import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.variable.min.css';

import '@/styles/vab.scss';

import '@/utils/globUtils' // 初始化挂载的方法

// 注册全局组件
import mgComponents from '@/components/common'

const app = createApp(App);

app.use(Antd);
app.use(mgComponents)
app.use(store).use(router).mount('#app');
