<template>
    <div class="original">
        <div class="textarea" >
             请在右侧输入文本
        </div>
    </div>
</template>


<script>
export default {

}
</script>



<style lang="scss" scoped>
.original {
    padding: 17px 24px;
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