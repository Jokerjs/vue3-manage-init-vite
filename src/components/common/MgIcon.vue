<template>
    <i class="iconfont" :class="'icon-'+name"></i>
</template>

<script>

export default {
    name: 'MgIcon',
    props: {
        name: {
            type: String,
            default: 'zhusheqi'
        }
    },
    mounted () {

    }
}
</script>

<style>
@import '@/assets/font-icon/iconfont.css';
</style>
