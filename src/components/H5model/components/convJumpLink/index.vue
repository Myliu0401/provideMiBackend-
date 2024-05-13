<template>
    <div class="convJumpLink" :style="{
        paddingTop: (props.itemData.style.paddingTop && props.itemData.style.paddingTop - 5) + 'px',
        paddingBottom: (props.itemData.style.paddingBottom && props.itemData.style.paddingBottom - 5) + 'px'
    }">
        <button class="button" :style="{
            backgroundColor: props.itemData.style.backgroundColor,
            border: `${props.itemData.style.borderColor ? `2px solid ${props.itemData.style.borderColor}` : `0px solid #fff`}`,
            fontWeight: props.itemData.style.fontWeight,
        }">
        <svg v-if="props.itemData.isIcon" fill="#fff" width="18" height="18" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path data-v-6e5ace15="" fill-rule="evenodd" clip-rule="evenodd" d="M13.5355 8.82149L14.714 10L16.4818 8.23223C17.7836 6.93049 17.7836 4.81994 16.4818 3.51819C15.1801 2.21644 13.0695 2.21644 11.7678 3.51819L8.23223 7.05372C6.93049 8.35547 6.93049 10.466 8.23223 11.7678L9.41075 10.5893C8.75987 9.93838 8.75987 8.88311 9.41075 8.23223L12.9463 4.6967C13.5972 4.04583 14.6524 4.04583 15.3033 4.6967C15.9542 5.34757 15.9542 6.40285 15.3033 7.05372L13.5355 8.82149ZM6.46447 11.1785L5.28596 10L3.51819 11.7678C2.21644 13.0695 2.21644 15.1801 3.51819 16.4818C4.81994 17.7836 6.93049 17.7836 8.23223 16.4818L11.7678 12.9463C13.0695 11.6445 13.0695 9.53398 11.7678 8.23223L10.5893 9.41074C11.2401 10.0616 11.2401 11.1169 10.5893 11.7678L7.05372 15.3033C6.40285 15.9542 5.34757 15.9542 4.6967 15.3033C4.04583 14.6524 4.04583 13.5972 4.6967 12.9463L6.46447 11.1785Z"></path></svg>
        {{ props.itemData.text }}</button>
    </div>
</template>



<script setup name="convJumpLinkComponent">
import { reactive, onMounted, onUnmounted, ref, defineProps } from 'vue';

const props = defineProps({
    itemData: {
        default() {
            return {}
        }
    }
});


</script>


<style lang="scss" scoped>
@import './index.scss';
</style>

<style lang="scss">
@import './index.scss';
</style>