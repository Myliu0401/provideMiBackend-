<template>
    <Original :itemData="props.itemData"/>
</template>


<script setup name="marketingFormComponent">
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