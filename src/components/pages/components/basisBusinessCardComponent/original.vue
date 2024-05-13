<template>
    <div class="original" :style="{ 
        paddingTop: itemData.style.paddingTop + 'px', 
        paddingBottom: itemData.style.paddingBottom + 'px' 
    }">
        <div class="item">
            <span class="title">{{ itemData.storeName ? itemData.storeName : '商家门店名称' }}</span>
        </div>
        <div class="item">
            <el-icon size="18" color="#404040"><ele-Location /></el-icon>
            <span class="title min">{{ itemData.storeAddress ? itemData.storeAddress : '门店地址' }}</span>
        </div>
        <div class="item">
            <el-icon size="18" color="#404040"><ele-Phone /></el-icon>
            <span class="title min">{{ itemData.storePhone ? itemData.storePhone : '门店电话' }}</span>
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

    setup(props, { emit }) {

    }
}
</script>


<style lang="scss" scoped>
.original {
    padding: 0px 30px;

    .item {
        border-bottom: 1px solid #ebebeb;
        padding-bottom: 7px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;

        .el-icon{
            margin-right: 10px;
        }

        .title {
            color: #404040;
            font-size: 15px;

            &.min{
                font-size: 14px;
            }
        }
    }
}
</style>