<template>
    <div class="btn-wrapper">
        <button class="btn" v-bind="$attrs">click me</button>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    name: 'MyButton'
}
</script>

<script setup>

</script>
