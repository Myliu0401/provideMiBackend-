<template>
    <div class="effect" :style="{ marginTop: props.itemData.style.paddingTop + 'px', marginBottom: props.itemData.style.paddingBottom + 'px' }">
        <img class="img" :src="props.itemData.imgSrc"/>
    </div>
</template>



<script setup>
import { reactive, onMounted, onUnmounted, ref, defineProps, computed } from 'vue';
const props = defineProps({
    itemData: {
        default() {
            return {

            }
        }
    }
});

</script>


<style lang="scss" scoped>
.effect {
    width: 100%;

    .img {
        width: 100%;

    }
}
</style>