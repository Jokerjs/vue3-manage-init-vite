<template>
    <div :class="`c-scrollbar c-scrollbar-${trigger}`"
         :style="{width,height,'max-height':maxHeight,'max-width':maxWidth}">
        <div :class="{'c-scrollbar-wrap':true,[`c-scrollbar-wrap-${direction}`]:true}"
             ref="wrapRef"
             :style="{'max-height':maxHeight,'max-width':maxWidth}"
             @scroll="handleScroll">

            <div class="c-scrollbar-content">
                <slot></slot>
            </div>

            <Bar direction="vertical"
                 :parentRef="wrapRef"
                 :size="vThumbHeight"
                 :move="moveY"
                 :barStyle="vBarStyle"
                 :thumbStyle="vThumbStyle"
                 v-show="hasVBar"
                 class="c-scrollbar-bar-v-bar"
                 v-if="direction !== 'x'"></Bar>

            <Bar direction="horizontal"
                 :parentRef="wrapRef"
                 :size="hThumbWidth"
                 :move="moveX"
                 :barStyle="hBarStyle"
                 :thumbStyle="hThumbStyle"
                 v-show="hasHBar"
                 class="c-scrollbar-bar-h-bar"
                 v-if="direction !== 'y'"></Bar>

        </div>
    </div>
</template>

<script>
import Bar from './Bar.vue'
import {addResizeListener, removeResizeListener} from './resize-event'

export default {
    name: 'c-scrollbar',
    components: {
        Bar
    },
    props: {
        // 水平方向 ，内容超过此高度出现滚动条 。
        width: {
            type: String,
            default: ''
        },
        // 垂直方向，内容超过此高度出现滚动条。最好不要使用百分比，除非父级元素设置了具体高度。maxHeight、height必须设置一个，否者不生效
        height: {
            type: String,
            default: ''
        },
        // 垂直方向 ，内容超过此高度出现滚动条。maxHeight、height必须设置一个，否者不生效
        maxHeight: {
            type: String,
            default: ''
        },
        // 水平方向 ，内容超过此高度出现滚动条 。
        maxWidth: {
            type: String,
            default: ''
        },
        // 触发显示滚动条。可填写的值有 'always'、'hover'、'none'。'always' 一直显示 ，'hover' 鼠标移动上去显示 ， 'none' 不显示
        trigger: {
            type: String,
            default: 'hover'
        },
        // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
        noresize: Boolean,
        // 可滚动的方向。可填写的值有'all'、'x'、'y'。'all'垂直水平方向都可以滚动，'x'只可以在横向滚动，'y'只可以在垂直方向上滚动。
        direction: {
            type: String,
            default: 'all'
        },
        // 垂直方向上轨道样式设置。修改垂直方向上轨道的样式
        vBarStyle: Object,
        // 水平方向上轨道样式设置。修改水平方向上轨道的样式
        hBarStyle: Object,
        // 垂直方向上滑块样式设置。修改垂直方向上滑块滑块的样式
        vThumbStyle: Object,
        // 水平方向上滑块样式设置。修改水平方向上滑块滑块的样式
        hThumbStyle: Object
    },
    setup(props, {emit}) {
        const wrapRef = ref()
        const state = reactive({
            vThumbHeight: '0',
            hThumbWidth: '0',
            moveX: '0%',
            moveY: '0%',
            hover: false
        })

        /**
         * 真实滚动条滚动时，修改滚动条bar移动距离
         */
        function handleScroll(event) {
            const {scrollTop, clientHeight, scrollLeft, clientWidth} = event.target
            state.moveY = `${(scrollTop * 100) / clientHeight}%`
            state.moveX = `${(scrollLeft * 100) / clientWidth}%`
            emit('scroll', event)
        }

        /**
         * 更新thumb的宽高 外层容器高度 / 整个内容的高度（整个可滚动内容区域） =  滚动条thumb的高度 / 滚动轨道的高度（一般滚动轨道的高度与外层容器相等）
         */
        const hasVBar = ref(false)
        const hasHBar = ref(false)

        function update() {
            if (wrapRef.value) {
                const heightPercentage = (wrapRef.value.clientHeight * 100) / wrapRef.value.scrollHeight
                const widthPercentage = (wrapRef.value.clientWidth * 100) / wrapRef.value.scrollWidth

                if (heightPercentage < 100) {
                    hasVBar.value = true
                } else {
                    hasVBar.value = false
                }

                if (widthPercentage < 100) {
                    hasHBar.value = true
                } else {
                    hasHBar.value = false
                }
                state.vThumbHeight = heightPercentage < 100 ? `${heightPercentage}%` : ''
                state.hThumbWidth = widthPercentage < 100 ? `${widthPercentage}%` : ''
            }
        }

        function setScrollTop(value) {
            wrapRef.value.scrollTop = value
        }

        function setScrollLeft(value) {
            wrapRef.value.scrollLeft = value
        }

        onMounted(() => {
            update() // 初始化调用一次，计算滚动条默认高度
            if (!props.noresize) {
                addResizeListener(wrapRef.value, update) // 监听元素变化，如果容器DOM变化触发更新
            }
        })

        onUnmounted(() => {
            if (!props.noresize) {
                removeResizeListener(wrapRef.value, update)
            }
        })

        return {
            ...toRefs(state),
            wrapRef,
            handleScroll,
            hasVBar,
            hasHBar,
            setScrollTop,
            setScrollLeft
        }
    }
}
</script>

<style lang="scss">
.c-scrollbar {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: transparent;

    &.c-scrollbar-hover {
        .c-scrollbar-bar {
            opacity: 0;
        }

        &:hover,
        &:focus,
        &:active {
            .c-scrollbar-bar {
                opacity: 1;
            }
        }
    }

    &.c-scrollbar-always {
        .c-scrollbar-bar {
            opacity: 1;
        }
    }

    &.c-scrollbar-none {
        .c-scrollbar-bar {
            opacity: 0;
        }
    }
}

.c-scrollbar-wrap-all {
    overflow: scroll;
}

.c-scrollbar-wrap-x {
    overflow-x: scroll;
    overflow-y: hidden;
}

.c-scrollbar-wrap-y {
    overflow-y: scroll;
    overflow-x: hidden;
}

.c-scrollbar-wrap {
    height: 100%;
    -ms-overflow-style: none;
    // overflow: -moz-scrollbars-none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        width: 0;
        height: 0;
        display: none;
    }
}
</style>
