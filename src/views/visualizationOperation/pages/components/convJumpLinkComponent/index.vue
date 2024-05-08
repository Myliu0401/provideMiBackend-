<template>
    <Original :itemData="props.itemData"/>
</template>



<script setup name="convJumpLinkComponent">
import { reactive, onMounted, onUnmounted, ref, defineProps } from 'vue';
import Original from './original.vue';
import Effect from './effect.vue';

const props = defineProps({
    itemData: {
        default(){
            return {}
        }
    }
});

</script>


<style lang="scss" scoped>

</style>