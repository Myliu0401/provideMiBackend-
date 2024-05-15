<template>
    <div class="centerZone" @click="deselect">

        <div class="content">
            <div v-for="page, index in pagesDatas" :key="page.id" class="module" @click.stop=""
                :style="{ backgroundColor: page.backColor }">

                <div class="backBox">
                    <span class="text">1</span>
                    <el-color-picker :model-value="page.backColor" show-alpha
                        @active-change="setBackColor(index, $event)" />
                    <span class="text1">背景</span>
                </div>

                <CutSleeveVue v-for="item in page.components" :key="item.id" :activeId="activeId" :id="item.id"
                    :disabled="isAllDisabled" :componentName="item.componentName">
                    <component :is="item.componentName" :itemData="item.data"></component>
                </CutSleeveVue>
            </div>
        </div>


        <el-icon class="IphoneIcon" size="25" title="预览" @click="openPreview"><ele-Iphone /></el-icon>

        <teleport to="#app">
            <H5model ref="h5model" />
        </teleport>
    </div>
</template>



<script>
import { reactive, onMounted, onUnmounted, ref } from 'vue';
import TopImgComponent from '../components/topImgComponent/index.vue';
import TopCarouselComponent from '../components/topCarouselComponent/index.vue';
import BasisImgComponent from '../components/basisImgComponent/index.vue';
import BasisCarouselComponent from '../components/basisCarouselComponent/index.vue';
import BasisTextComponent from '../components/basisTextComponent/index.vue';
import ConvJumpLinkComponent from '../components/convJumpLinkComponent/index.vue';
import CutSleeveVue from '../components/cutSleeve.vue';
import BasisBusinessCardComponent from '../components/basisBusinessCardComponent/index.vue';
import MarketingFormComponent from '../components/marketingFormComponent/index.vue';
import MarketingSideFloatingComponent from '../components/marketingSideFloatingComponent/index.vue';
import H5model from '/@/components/H5model/index.vue';
import mittBus from '/@/utils/mitt'; // 事件总线


export default {

    components: { 
        H5model, 
        TopImgComponent, 
        BasisImgComponent, 
        BasisCarouselComponent, 
        BasisTextComponent, 
        TopCarouselComponent, 
        ConvJumpLinkComponent, 
        CutSleeveVue, 
        BasisBusinessCardComponent,
        MarketingFormComponent,
        MarketingSideFloatingComponent
    },

    props: {
        pagesDatas: {
            default() {
                return []
            }
        },
        activeId: {
            default: null
        },

        isAllDisabled: {
            default: false
        }
    },

    setup(props, { emit }) {

        const state = reactive({
            backColor: props
        });

        const h5model = ref(null);


        // 取消选中
        function deselect() {
            mittBus.emit('switchCurrentActive', null); // 触发事件
        };


        // 修改背景颜色
        function setBackColor(index, color) {
            emit('setBackColor', { index, color });
        };


        // 打开预览
        function openPreview(){
            h5model.value.open(props.pagesDatas);
        };

        return {
            deselect,
            openPreview,
            setBackColor,
            h5model
        }
    }
}
</script>



<style lang="scss" scoped>
.centerZone {
    flex-grow: 1;
    height: calc(100vh - 42px);
    overflow: auto;

    .content {
        display: flex;
        justify-content: center;
        padding-top: 60px;
        padding-bottom: 60px;

        .module {
            width: 375px;
            min-height: 667px;
            background-color: rgb(255, 252, 252);
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.03), 0 6px 15px 0 rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(223, 223, 223, 0.6);
            display: flex;
            flex-direction: column;
            position: relative;


            .backBox {
                position: absolute;
                left: -42px;
                display: flex;
                flex-direction: column;

                .text {
                    font-size: 15px;
                    display: inline-block;
                    width: 24px;
                    text-align: center;
                    border-bottom: 1px solid #ccc;
                    padding-bottom: 3px;
                }

                .text1 {
                    font-size: 12px;
                }
            }



        }
    }



    /* 滚动条宽度 */
    &::-webkit-scrollbar {
        width: 0px;
    }

    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* 滚动条滑块:hover状态 */
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    /* 滚动条轨道 */
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
}
</style>



<style lang="scss">
.centerZone {

    position: relative;

    .content {
        .module {
            .backBox {
                align-items: center;

                .el-color-picker {
                    margin-top: 7px;
                    height: 32px;

                    .el-color-picker__trigger {
                        width: 30px;
                        height: 30px;
                    }
                }
            }
        }
    }



    .IphoneIcon {
        position: absolute;
        cursor: pointer;
        top: 10px;
        right: 30px;
        transition: all 0.2s;
        transform: scale(1);

        &:hover{
            transform: scale(1.2);
        }
    }
}
</style>