<script setup lang="ts">

const props = defineProps<{
    lado: 'left' | 'right';
    altura: 'bottom' | 'top';
}>();

</script>


<template>
    <button :class="['btn btn-primary btn-circle fixed z-100', lado, altura]">
        <slot>

        </slot>
    </button>

    
</template>


<style>

.top {
    top: 20px;
}

.bottom {
    bottom: 20px;
}

.left {
    left: 30px;
}

.right {
    right: 30px;
}

</style>