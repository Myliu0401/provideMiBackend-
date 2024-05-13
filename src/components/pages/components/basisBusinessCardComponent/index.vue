<template>
    <Original :itemData="props.itemData"/>
</template>



<script name="basisBusinessCardComponent" setup>
import Original from './original.vue';
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