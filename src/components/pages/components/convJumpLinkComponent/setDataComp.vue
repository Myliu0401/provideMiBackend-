<template>
    <div class="modifyingInformation convJumpLinkComponent">
        <div class="item" style="padding-bottom: 0px;">
            <p class="title">转化按钮组件: 跳转连接</p>
            <span class="title_tips">用户点击按钮后，跳转自定义的外部链接。</span>
            <el-tag style="margin: 15px 20px;" type="primary" size="default">支持腾讯广告全广告位</el-tag>

            <div class="promptBox">
                <p class="textTitle">适用推广目标：推广品牌活动，推广我的门店、推广应用、推广商品</p>
                <p class="textTips">创建广告时，仅选择了以上推广目标的广告可使用此推广页。</p>
            </div>
        </div>


        <div class="item">
            <p class="title">连接设置</p>
            <div class="itemBox">
                <span class="itemBox_title">跳转类型</span>
                <div class="buttons">
                    <div class="button" :class="{ active: state.jumpType === 'miniProgram' }">小程序</div>
                    <div class="button" :class="{ active: state.jumpType === 'h5' }">h5链接</div>
                </div>
            </div>

            <div class="itemBox">
                <span class="itemBox_title">连接类型</span>
                <el-radio-group v-model="state.linkType">
                    <el-radio :value="'h5'">h5链接</el-radio>
                </el-radio-group>
            </div>

            <div class="itemBox">
                <span class="itemBox_title">链接</span>
                <el-input v-model="state.link" placeholder="以 https:// 开头" size="default" />
            </div>

            <div class="itemBox" style="margin-top: 6px;">
                <span class="itemBox_title"></span>
                <div class="tipsText">链接需符合 自定义详情页开发规范；
                    审核通过后，修改链接内容将会按照一定规则进行处理，具体请查看 违规处罚规则;
                    获取转化行为数据，可参考 H5数据回传文档。
                    为保证链接能在微信内正常打开，请确保链接已完成公众号绑定、或ICP备案等安全流程。</div>
            </div>
        </div>


        <div class="item">
            <p class="title"><el-switch style="margin-right: 10px;" v-model="state.isOpenIOS"
                    size="small" />为IOS已安装的用户打开应用</p>

            <template v-if="state.isOpenIOS">
                <div class="itemBox">
                    <span class="itemBox_title">App ID</span>
                    <div style="display: flex;">
                        <el-input v-model="state.ios.link" placeholder="请输入App ID" size="default" />
                        <el-button plain size="default" style="margin-left: 7px;">搜索</el-button>
                    </div>
                </div>

                <div class="itemBox">
                    <span class="itemBox_title">应用名称</span>
                    <div class="" style="color: #a3a3a3; font-size: 12px; line-height: 20px;">未获取</div>
                </div>

                <div class="itemBox">
                    <span class="itemBox_title">页面链接</span>
                    <el-input v-model="state.ios.link" placeholder="请输入Url" size="default" />
                </div>

            </template>
        </div>


        <div class="item">
            <p class="title"><el-switch style="margin-right: 10px;" v-model="state.isOpenAndroid"
                    size="small" />为安卓已安装的用户打开应用
            </p>

            <template v-if="state.isOpenAndroid">
                <div class="itemBox">
                    <span class="itemBox_title">腾讯开放平台 ID</span>
                    <div style="display: flex;">
                        <el-input v-model="state.android.link" placeholder="请输入App ID" size="default" />
                        <el-button plain size="default" style="margin-left: 7px;">搜索</el-button>
                    </div>
                </div>

                <div class="itemBox">
                    <span class="itemBox_title">应用名称</span>
                    <div class="" style="color: #a3a3a3; font-size: 12px; line-height: 20px;">未获取</div>
                </div>

                <div class="itemBox">
                    <span class="itemBox_title">页面链接</span>
                    <el-input v-model="state.android.link" placeholder="请输入Url" size="default" />
                </div>
            </template>

        </div>


        <div class="item">
            <p class="title">按钮外观</p>

            <div class="itemBox">
                <span class="itemBox_title">按钮文案</span>
                <div class="itemb1" style="display: flex; flex-grow: 1;">
                    <el-input v-model="state.text" placeholder="请输入" style="width: 120px;" size="default" />

                    <div class="buttons" style="margin-left: 10px;">
                        <div class="button" :class="{ active: state.style.fontWeight === 'normal' }" @click="state.style.fontWeight = 'normal'">常规</div>
                        <div class="button" :class="{ active: state.style.fontWeight === 'bold' }" @click="state.style.fontWeight = 'bold'">加粗</div>
                    </div>
                </div>
            </div>

            <div class="itemBox">
                <span class="itemBox_title">字体色</span>
                <el-color-picker v-model="state.style.fontColor" size="default" />
            </div>

            <div class="itemBox">
                <span class="itemBox_title">图标</span>
                <el-switch v-model="state.isIcon" size="small" />
            </div>

            <div class="itemBox">
                <span class="itemBox_title">边框色</span>
                <el-color-picker v-model="state.style.borderColor" size="default" />
            </div>

            <div class="itemBox">
                <span class="itemBox_title">背景色</span>
                <el-color-picker v-model="state.style.backgroundColor" size="default" />
            </div>
        </div>


        <div class="item">
            <span class="title">边距</span>
            <div class="itemBox">
                <span class="itemBox_title">上边距</span>
                <el-slider style="margin-left: 12px;" v-model="state.style.paddingTop" />
            </div>

            <div class="itemBox">
                <span class="itemBox_title">下边距</span>
                <el-slider style="margin-left: 12px;" v-model="state.style.paddingBottom" />
            </div>
        </div>

        <div class="item" style="padding-top: 100px;"></div>
    </div>
</template>



<script setup name="convJumpLinkComponent">
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


const state = reactive({
    linkType: props.componentData.linkType, // 连接类型
    jumpType: props.componentData.jumpType, // 跳转类型
    link: props.componentData.link, // 链接
    isOpenIOS: true, // 是否开启ios
    isOpenAndroid: true, // 是否开启安卓
    ios: {
        ...props.componentData.ios
    },
    android: {
        ...props.componentData.android
    },
    text: props.componentData.text, // 字体文案
    isIcon: props.componentData.isIcon, // 是否开启图标
    style: { // 样式
        ...props.componentData.style
    }
});


watch([() => state.linkType, () => state.link, () => state.ios, () => state.android, () => state.text, () => state.isIcon, () => state.style], setFinalData, { deep: true });


// 修改最终数据
function setFinalData() {

    mittBus.emit('setItemData', {
        ...props.componentData,
        text: state.text,
        ios: { ...state.ios },
        android: { ...state.android },
        linkType: state.linkType,
        jumpType: state.jumpType,
        link: state.link,
        isIcon: state.isIcon,
        style: {
            ...props.componentData.style,
            fontWeight: state.style.fontWeight,
            fontColor: state.style.fontColor,
            textAlign: state.style.textAlign,
            paddingTop: state.style.paddingTop,
            paddingBottom: state.style.paddingBottom,
            backgroundColor: state.style.backgroundColor,
            borderColor: state.style.borderColor
        }
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
.convJumpLinkComponent {
    .item {
        .el-color-picker {
            margin-left: 0px;
        }
    }
}
</style>