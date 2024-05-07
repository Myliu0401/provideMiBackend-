<template>
    <Original v-if="!thereDetermine()" />
    <Effect v-else />
</template>



<script setup name="basisTextComponent">
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