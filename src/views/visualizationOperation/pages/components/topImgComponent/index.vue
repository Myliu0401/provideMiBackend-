<template>
    <Original />
</template>



<script setup name="topImgComponent">
import { reactive, onMounted, onUnmounted, ref, defineProps } from 'vue';
import Original from './original.vue';


const props = defineProps({

    // 该组件的数据项
    itemData: { 
        default() {
            return {

            }
        }
    }
});

onMounted(() => {
   
});

</script>


<style lang="scss" scoped></style>