<template>
    <Original v-if="!props.itemData.imgSrc" :itemData="props.itemData"/>
    <Effect v-else :itemData="props.itemData" />
</template>



<script setup name="basisImgComponent">
import { reactive, onMounted, onUnmounted, ref, defineProps } from 'vue';
import Original from './original.vue';
import Effect from './effect.vue';

const props = defineProps({

    // 该组件的数据项
    itemData: {
        default() {
            return {

            }
        }
    }
});


console.log(props.itemData)



</script>


<style lang="scss" scoped></style>