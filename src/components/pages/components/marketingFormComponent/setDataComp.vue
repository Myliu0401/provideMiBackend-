<template>
    <div class="modifyingInformation marketingFormComponent">
        <div class="item">
            <p class="title">营销组件: 表单</p>
            <p class="title_tips">建议将表单组件放置于原生推广页的首屏或第二屏位置，以获得更好的转化效果。</p>
            <el-tag style="margin: 15px 20px;" type="primary" size="default">支持腾讯广告全广告位</el-tag>
        </div>


        <div class="item">
            <p class="title">编辑表单</p>
            <DragForms :itemData="props.componentData" />
        </div>

        <div class="item">
            <p class="title">按钮外观</p>
            <el-form :model="form" label-width="auto" style="padding: 0px 20px;">
                <el-form-item label="按钮文案" style="margin-bottom: 6px;">
                    <el-input v-model="form.buttonText" size="default" placeholder="按钮文案" @input="setFinalData"/>
                </el-form-item>
                <el-form-item label="字体色" style="margin-bottom: 6px;">
                    <el-color-picker v-model="form.color" size="default" @active-change="activeChange('color', $event)"/>
                </el-form-item>
                <el-form-item label="边框色" style="margin-bottom: 6px;">
                    <el-color-picker v-model="form.borderColor" size="default" @active-change="activeChange('borderColor', $event)"/>
                </el-form-item>
                <el-form-item label="背景色" style="margin-bottom: 6px;">
                    <el-color-picker v-model="form.backgroundColor" size="default" @active-change="activeChange('backgroundColor', $event)"/>
                </el-form-item>
            </el-form>
        </div>


        <div class="item">
            <p class="title">边距</p>
            <el-form :model="form" label-width="auto" style="padding: 0px 20px;">
                <el-form-item label="上边距" style="margin-bottom: 6px;">
                    <el-slider v-model="style.paddingTop" style="padding: 0px 25px;" @input="setFinalData"/>
                </el-form-item>

                <el-form-item label="下边距" style="margin-bottom: 6px;">
                    <el-slider v-model="style.paddingBottom" style="padding: 0px 25px;" @input="setFinalData"/>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>


<script setup name="marketingFormComponent">
import { reactive, onMounted, onUnmounted, ref, defineProps, watch } from 'vue';
import DragForms from './components/DragForms.vue';
import mittBus from '/@/utils/mitt'; // 事件总线


const props = defineProps({
    componentData: {
        default() {
            return {

            }
        }
    }
});



const form = reactive({
    buttonText: props.componentData.buttonText, // 按钮文案
    color: props.componentData.style.color,  // 字体色
    borderColor: props.componentData.style.borderColor, // 边框色
    backgroundColor: props.componentData.style.backgroundColor, // 背景色
});

const style = reactive({
    paddingTop: props.componentData.style.paddingTop,
    paddingBottom: props.componentData.style.paddingBottom
});


function activeChange(key, color){
    form[key] = color;
    setFinalData();
}


// 修改最终数据
function setFinalData() {
    mittBus.emit('setItemData', {
        ...props.componentData,

        style: {
            color: form.color,
            borderColor: form.borderColor,
            backgroundColor: form.backgroundColor,
            paddingTop: style.paddingTop,
            paddingBottom: style.paddingBottom
        },

        buttonText: form.buttonText
    });
};

</script>



<style lang="scss" scoped>
.modifyingInformation {
    width: 100%;
    height: 100%;
    overflow: auto;


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

        .title_tips {
            margin-top: 2px;
            font-size: 12px;
            line-height: 18px;
            color: #636363;
            padding-left: 20px;
            padding-right: 20px;
        }


        .promptBox {
            padding: 0px 20px;
            padding-top: 8px;
            padding-bottom: 8px;
            background-color: #fafafa;
            box-shadow: 0px -1px 0px 0px #f3f3f3, 0px 1px 0px 0px #f3f3f3;


            .textTitle {
                font-size: 12px;
                line-height: 18px;
                color: #6b6b6b;
                font-weight: 600;
            }


            .textTips {
                margin-top: 2px;
                font-size: 12px;
                line-height: 18px;
                color: #a3a3a3;
            }
        }


        .itemBox {
            display: flex;
            padding: 0px 20px;
            align-items: center;
            margin-top: 15px;

            .itemBox_title {
                font-size: 12px;
                color: #1f1f1f;
                width: 60px;
                display: inline-block;
                margin-right: 5px;
                min-width: 60px;
            }


            .buttons {
                display: flex;
                align-items: center;
                flex-grow: 1;

                .button {
                    background-color: #fff;
                    box-shadow: 0 3px 6px rgba(0, 0, 0, .01), 0 0 0 1px #ddd;
                    color: #1f1f1f;
                    font-size: 12px;
                    width: 50%;
                    height: 26px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    &:first-child {
                        border-top-left-radius: 4px;
                        border-bottom-left-radius: 4px;
                    }

                    &:last-child {
                        border-top-right-radius: 4px;
                        border-bottom-right-radius: 4px;
                    }

                    &:not(.active):hover {
                        background-color: #f2f2f2;
                        box-shadow: 0 3px 5px rgba(0, 0, 0, .03), 0 0 0 1px #ddd;
                    }

                    &.active {
                        background-color: #f2f2f2;
                        box-shadow: inset 0 2px 2px rgba(0, 0, 0, .04), 0 0 0 1px #ddd;
                    }
                }
            }


            .tipsText {
                color: #a3a3a3;
                font-size: 12px;
                line-height: 20px;
            }


            .itemb1 {}
        }


    }
}
</style>

<style lang="scss">
.marketingFormComponent {
    .item {
        .el-form-item__label {
            font-size: 12px;
        }
    }
}
</style>