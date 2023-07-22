<template>
    <button @click="handleClickEvent" class="btn" :disabled="disabled">
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const emits = defineEmits(["click"]);
const disabled = ref<boolean>(false);

async function handleClickEvent() {
    disabled.value = true;

    emits('click', () => {disabled.value = false});
}
</script>