<template>
    <div class="effect" :style="{
        paddingTop: props.itemData.style.paddingTop + 'px',
        paddingBottom: props.itemData.style.paddingBottom + 'px'
    }">
        <div class="textarea" :style="{
            fontSize: props.itemData.style.fontSize + 'px',
            color: props.itemData.style.fontColor,
            fontWeight: props.itemData.style.fontWeight,
            textAlign: props.itemData.style.textAlign
        }">{{ itemData.text }}</div>
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
    padding: 0px 24px;

    .textarea {
        white-space: pre;
        line-height: 19px;
    }
}
</style>