<template>
    <div class="original" :style="{ marginTop: itemData.style.marginTop + 'px', marginBottom: itemData.style.marginBottom + 'px' }">
        <button class="button">上传图片</button>
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
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
.original {
    width: 375px;
    height: 222px;
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