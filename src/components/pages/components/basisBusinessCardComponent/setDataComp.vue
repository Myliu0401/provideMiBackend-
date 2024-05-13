<template>
    <div class="modifyingInformation">
        <div class="item">
            <p class="title">基础组件: 商家名片</p>
            <el-tag style="margin: 15px 20px;" type="primary" size="default">支持腾讯广告全广告位</el-tag>
        </div>


        <div class="item">
            <el-form :model="form" label-width="auto" style="padding: 0px 20px;">
                <el-form-item label="门店名称">
                    <el-input v-model="form.storeName" size="default" placeholder="请输入门店名称" />
                </el-form-item>
                <el-form-item label="门店地址">
                    <el-input v-model="form.storeAddress" size="default" placeholder="请输入门店详细地址" />
                </el-form-item>
                <el-form-item label="门店电话">
                    <el-input v-model="form.storePhone" size="default" placeholder="请输入门店电话" />
                </el-form-item>
            </el-form>
        </div>

        <div class="item">
            <p class="title">边距</p>
            <el-form :model="style" label-width="auto" style="padding: 0px 20px;">
                <el-form-item label="上边距">
                    <el-slider v-model="style.paddingTop" style="padding: 0px 20px;" />
                </el-form-item>
                <el-form-item label="下边距">
                    <el-slider v-model="style.paddingBottom" style="padding: 0px 20px;" />
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>



<script setup name="basisBusinessCardComponent">
import { reactive, onMounted, onUnmounted, ref, defineProps, watch } from 'vue';
import mittBus from '/@/utils/mitt'; // 事件总线


const props = defineProps({
    componentData: {
        default() {
            return {

            }
        }
    }
});

const style = reactive({
    paddingTop: props.componentData.style.paddingTop,
    paddingBottom: props.componentData.style.paddingBottom
});


const form = reactive({
    storeName: props.componentData.storeName, // 门店名称
    storeAddress: props.componentData.storeAddress, // 门店地址
    storePhone: props.componentData.storePhone, // 门店电话
});

// 监听数据变化
watch([
    () => form.storeName,
    () => form.storeAddress,
    () => form.storePhone,
    () => style.paddingTop,
    () => style.paddingBottom
], setFinalData);


// 修改最终数据
function setFinalData() {
    mittBus.emit('setItemData', {
        ...props.componentData,
        storeName: form.storeName,
        storeAddress: form.storeAddress,
        storePhone: form.storePhone,
        style: {
            paddingTop: style.paddingTop,
            paddingBottom: style.paddingBottom
        }
    });
};

</script>



<style lang="scss" scoped>
.modifyingInformation {
    width: 100%;
    height: 100%;

    .item {
        padding: 20px 0px;
        box-shadow: 0 1px 0 0 rgba(223, 223, 223, 0.65);

        .title {
            padding: 0px 20px;
            font-size: 14px;
            line-height: 24px;
            color: #1f1f1f;
            font-weight: 600;
        }


        .inputTextarea {
            padding: 0px 20px;
            margin-top: 10px;
        }


        .item_xian {
            display: flex;
            align-items: center;
            padding: 0px 20px;
            margin-top: 10px;

            .xian_title {
                font-size: 12px;
                color: #1f1f1f;

            }


            .xian_content {
                margin-left: 7px;
                display: flex;
                align-items: center;
                flex-grow: 1;
                justify-content: space-between;

                .left {}
            }
        }


        .buttons {
            display: flex;
            align-items: center;
            font-size: 13px;

            .button {
                background-color: #fff;
                box-shadow: 0 3px 6px rgba(0, 0, 0, .01), 0 0 0 1px #ddd;
                color: #1f1f1f;
                padding: 5px 16px;
                cursor: pointer;


                &:not(.active):hover {
                    background-color: #f2f2f2;
                    box-shadow: 0 3px 5px rgba(0, 0, 0, .03), 0 0 0 1px #ddd;
                }

                &.active {
                    background-color: #f2f2f2;
                    box-shadow: inset 0 2px 2px rgba(0, 0, 0, .04), 0 0 0 1px #ddd;
                }

                &:first-child {
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                }

                &:last-child {
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                }
            }
        }


        .mainContent {
            flex-grow: 1;
            margin-left: 8px;

            .button {
                flex-grow: 1;
                padding-top: 4px;
                padding-bottom: 4px;
                display: flex;
                justify-content: center;
            }

        }


        .itemBox {
            display: flex;
            padding: 0px 20px;
            align-items: center;
            margin-top: 7px;

            .itemBox_title {
                white-space: nowrap;
                display: inline-block;
                margin-right: 25px;
                font-size: 12px;
                color: #1f1f1f;

            }
        }

    }
}
</style>