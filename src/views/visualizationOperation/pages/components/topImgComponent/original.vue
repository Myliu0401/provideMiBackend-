<template>
    <div class="original">
        <button class="button">上传图片</button>
    </div>
</template>


<script>

import { reactive, onMounted, onUnmounted, ref } from 'vue';

export default {

    setup() {
        return {

        }
    }
}
</script>


<style lang="scss" scoped>
.original {
    width: 375px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: #f7f7f7;

    .button {
        outline: none;
        padding: 8px 33px;
        font-size: 13px;
        color: #6B6B6B;
        letter-spacing: 0;
        line-height: 22px;
        border: 1px dashed #D6D6D6;
        border-radius: 3px;
        cursor: pointer;


        &:hover {
            color: #292929;
            background: rgba(0, 0, 0, 0.03);
            border: 1px dashed #A3A3A3;
        }


        &:active {
            background: rgba(0, 0, 0, 0.06);
        }
    }

}
</style>