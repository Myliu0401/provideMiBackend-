<template>
    <div class="original" :style="{ paddingTop: itemData.style.paddingTop + 'px', paddingBottom: itemData.style.paddingBottom + 'px' }">
        <div class="textarea" >
             请在右侧输入文本
        </div>
    </div>
</template>


<script>
export default {
    props: {
        itemData: {
            default() {
                return {

                }
            }
        }
    },


    setup(props, { emit }){
       
    }
}
</script>



<style lang="scss" scoped>
.original {
    padding: 0px 24px;
    .textarea {
        border: none;
        background: transparent;
        overflow: hidden;
        height: 100%;
        width: 100%;
        resize: none;
        color: rgb(184, 184, 184);
        font-size: 15px;
        font-weight: 700;
    }
}
</style>