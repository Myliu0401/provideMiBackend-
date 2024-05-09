<template>
    <Original v-if="!thereDetermine()" :itemData="props.itemData"/>
    <Effect v-else :itemData="props.itemData"/>
</template>



<script setup name="basisTextComponent">
import { reactive, onMounted, onUnmounted, ref, defineProps } from 'vue';
import Original from "./original.vue";
import Effect from './effect.vue';

const props = defineProps({
    itemData: {
        default(){
            return {}
        }
    }
});


// 判断是否有数据
function thereDetermine(){
    return !!props.itemData.text;
};
</script>



<style lang="scss" scoped>

</style>