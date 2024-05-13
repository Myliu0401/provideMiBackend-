<template>
    <div class="basisTextCom">
        <div class="textBox" :style="{ 
            color: props.itemData.style.fontColor, 
            fontSize: props.itemData.style.fontSize - 1 + 'px',
            fontWeight: props.itemData.style.fontWeight,
            textAlign: props.itemData.style.textAlign,
            paddingTop: (props.itemData.style.paddingTop && (props.itemData.style.paddingTop - 5)) + 'px',
            paddingBottom: (props.itemData.style.paddingBottom && (props.itemData.style.paddingBottom - 5)) + 'px'
        }">
             {{ props.itemData.text }}
        </div>
    </div>
</template>



<script setup name="basisTextComponent">
import { reactive, onMounted, onUnmounted, ref, defineProps } from 'vue';

const props = defineProps({
    itemData: {
        default(){
            return { 

            };
        }
    }
});




</script>


<style lang="scss" scoped>
@import './index.scss';
</style>


<style lang="scss" >
@import './index.scss';
</style>
