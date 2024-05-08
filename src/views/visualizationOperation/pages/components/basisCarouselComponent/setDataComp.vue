<template>
    <div class="modifyingInformation">
        <div class="item" style="padding-bottom: 0px;">
            <p class="title">基础组件: 轮播图</p>
            <el-tag style="margin: 15px 20px;" type="primary" size="default">支持腾讯广告全广告位</el-tag>

            <div class="promptBox">
                <p class="textTitle">适用广告位：朋友圈信息流</p>
                <p class="textTitle">适用外层样式：常规广告</p>
                <p class="textTips">创建广告时，仅选择了以上广告位与外层样式的广告可使用此推广页。广告外层将自动拉取顶部轮播图。</p>
            </div>


        </div>


        <div class="item">
            <p class="title">素材设置</p>
            <div class="selectionArea">
                <el-form>
                    <el-form-item label="图片数量">
                        <ul class="buttons" @click="switchSelectedQuantity">
                            <li class="button" :data-num="3" :class="{ active: state.currentQuantity === 3 }">3张</li>
                            <li class="button" :data-num="4" :class="{ active: state.currentQuantity === 4 }">4张</li>
                            <li class="button" :data-num="6" :class="{ active: state.currentQuantity === 6 }">6张</li>
                        </ul>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="item">
            <p class="title">上传素材</p>

             <CardDragArea :listNum="state.currentQuantity" :currentId="componentData.currentId" :carousel="componentData.carousel"/>
        </div>
    </div>
</template>



<script setup name="basisCarouselComponent">
import { reactive, onMounted, onUnmounted, ref, defineProps } from 'vue';
import CardDragArea from '../../../components/CardDragArea.vue';

const props = defineProps({
    componentData: {
        default() {
            return {

            }
        }
    }
});


const state = reactive({
    currentQuantity: props.componentData.carousel.length
});

// 切换选中数量
function switchSelectedQuantity(event) {
    const num = +event.target.dataset.num;
    if (num === state.currentQuantity) {
        return;
    };

    state.currentQuantity = num;

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


        .selectionArea {
            padding: 0px 20px;

            .buttons {
                display: flex;

                .button {
                    width: 81px;
                    height: 26px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #1f1f1f;
                    font-size: 12px;
                    box-shadow: 0 3px 6px rgba(0, 0, 0, .01), 0 0 0 1px #ddd;
                    margin-right: 1px;
                    cursor: pointer;
                    transition: all 0.2s;

                    &:first-child {
                        border-top-left-radius: 4px;
                        border-bottom-left-radius: 4px;
                    }

                    &:last-child {
                        border-top-right-radius: 4px;
                        border-bottom-right-radius: 4px;
                    }


                    &.active {
                        box-shadow: inset 0 2px 2px rgba(0, 0, 0, .04), 0 0 0 1px #ddd;
                        background-color: #f2f2f2;
                    }


                    &:not(.active):hover {
                        background-color: #f2f2f2;
                        box-shadow: 0 3px 5px rgba(0, 0, 0, .03), 0 0 0 1px #ddd;
                    }

                }
            }
        }


        
    }
}
</style>

<style lang="scss">
.modifyingInformation {
    .item {
        .selectionArea {
            .el-form-item__label {
                font-size: 13px;
            }
        }
    }
}
</style>