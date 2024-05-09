<template>
    <div class="modifyingInformation">
        <div class="item">
            <p class="title">基础组件: 图片</p>
            <el-tag style="margin: 15px 20px;" type="primary" size="default">支持腾讯广告全广告位</el-tag>
        </div>

        <div class="item">
            <p class="title">素材设置</p>
            <el-form style="margin: 0px 20px; margin-top: 10px;">
                <el-form-item label="图片素材">
                    <div class="uploadImages"></div>
                </el-form-item>
            </el-form>

            <div class="tipsText">
                暂不支持含有二维码的图片<br>
                图片格式：大小不超过300KB，不支持Gif<br>
                图片尺寸：宽度750像素，高度不超过1536像素
            </div>

        </div>


        <div class="item">
            <p class="title">边距</p>
            <div class="slider">
                <span class="slider_text">上边距</span>
                <el-slider v-model="state.marginTop" size="default" @input="setMarginData('marginTop', $event)" />
            </div>
            <div class="slider">
                <span class="slider_text">下边距</span>
                <el-slider v-model="state.marginBottom" size="default" @input="setMarginData('marginBottom', $event)" />
            </div>
        </div>
    </div>
</template>



<script setup name="basisImgComponent">
import { reactive, onMounted, onUnmounted, ref, defineProps } from 'vue';
import mittBus from '/@/utils/mitt'; // 事件总线

const props = defineProps({
    componentData: {
        default() {
            return {

            }
        }
    }
});

const state = reactive({
    marginTop: props.componentData.style.marginTop,  // 上边距
    marginBottom: props.componentData.style.marginBottom, // 下边距
});


// 修改边距数据
function setMarginData(type, value) {
    mittBus.emit('setItemData', {
        ...props.componentData,
        style: {
            ...props.componentData.style,
            [type]: value
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

        .card {
            padding: 0px 20px;
            padding-top: 8px;
            padding-bottom: 8px;
            background-color: #fafafa;
            box-shadow: 0px -1px 0px 0px #f3f3f3, 0px 1px 0px 0px #f3f3f3;

            .text {
                font-size: 12px;
                line-height: 18px;
                color: #6b6b6b;
                font-weight: 600;
            }
        }


        .cardBox {
            margin-top: 20px;


            .el-radio {
                height: 26px;
            }
        }


        .uploadImages {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fdfdfd;
            border: 2px dashed #e3e3e3;
            border-radius: 4px;
            background-size: cover;
            background-position: 50% 50%;
            width: 72px;
            height: 72px;
            cursor: pointer;

            &::before {
                content: '';
                position: absolute;
                width: 2px;
                height: 30%;
                background-color: #e3e3e3;
            }

            &::after {
                content: '';
                position: absolute;
                width: 30%;
                height: 2px;
                background-color: #e3e3e3;
            }

            transition: all 0.3s;

            &:hover {
                border: 2px dashed #8f8f8f;
                background-color: #e9e9e9;

                &::before {
                    background-color: #8f8f8f;
                }

                &::after {
                    background-color: #8f8f8f;
                }
            }
        }


        .tipsText {
            font-size: 12px;
            color: #a3a3a3;
            padding-left: 86px;
            margin-top: 10px;
        }


        .slider {
            margin: 0px 20px;
            display: flex;
            align-items: center;

            .slider_text {
                white-space: nowrap;
                display: inline-block;
                margin-right: 16px;
                font-size: 12px;
            }
        }
    }
}
</style>