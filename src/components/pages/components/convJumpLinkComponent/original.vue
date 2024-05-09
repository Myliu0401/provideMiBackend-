<template>
    <div class="original" :style="{ paddingTop: itemData.style.paddingTop + 'px', paddingBottom: itemData.style.paddingBottom + 'px' }">
        <button class="button" :style="{ 
            color: itemData.style.fontColor,
            fontWeight: itemData.style.fontWeight,
            border: `${itemData.style.borderColor ? '2px' : '0px'} solid ${itemData.style.borderColor}`,
            backgroundColor: itemData.style.backgroundColor
         }">
         <svg v-if="itemData.isIcon" :fill="itemData.style.fontColor" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.5355 8.82149L14.714 10L16.4818 8.23223C17.7836 6.93049 17.7836 4.81994 16.4818 3.51819C15.1801 2.21644 13.0695 2.21644 11.7678 3.51819L8.23223 7.05372C6.93049 8.35547 6.93049 10.466 8.23223 11.7678L9.41075 10.5893C8.75987 9.93838 8.75987 8.88311 9.41075 8.23223L12.9463 4.6967C13.5972 4.04583 14.6524 4.04583 15.3033 4.6967C15.9542 5.34757 15.9542 6.40285 15.3033 7.05372L13.5355 8.82149ZM6.46447 11.1785L5.28596 10L3.51819 11.7678C2.21644 13.0695 2.21644 15.1801 3.51819 16.4818C4.81994 17.7836 6.93049 17.7836 8.23223 16.4818L11.7678 12.9463C13.0695 11.6445 13.0695 9.53398 11.7678 8.23223L10.5893 9.41074C11.2401 10.0616 11.2401 11.1169 10.5893 11.7678L7.05372 15.3033C6.40285 15.9542 5.34757 15.9542 4.6967 15.3033C4.04583 14.6524 4.04583 13.5972 4.6967 12.9463L6.46447 11.1785Z"></path></svg>
         {{ itemData.text }}</button>
    </div>
</template>



<script>
export default {
    props: {
        itemData: {
            default(){
                return { }
            }
        }
    }


}
</script>



<style lang="scss" scoped>
.original {
    .button {
        height: 40px;
        border: 0px solid rgb(255, 255, 255);
        color: rgb(255, 255, 255);
        background-color: rgb(7, 193, 96);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        width: 190px;
        border-radius: 5px;
        margin: 0 auto;
    }
}
</style>
