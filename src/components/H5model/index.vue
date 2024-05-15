<template>
    <div class="h5MongolianLayer" ref="h5Mong">
        <div class="closeIcon" @click.stop="close">
            <el-icon :size="'35'" :color="'#fff'">
                <ele-CircleClose />
            </el-icon>
        </div>

        <div class="mobilePhoneModel">
            <div class="maskingMain" :style="{ backgroundColor: state.modelData.backColor || 'rgb(239 239 239)' }">
                <component v-for="comData in state.modelData.components" :key="comData.id" :is="comData.componentName"
                    :itemData="comData.data" />
            </div>
            <div class="maskingImg"></div>

            <div style="background-color: #f7f2f2; top: 14px; position: absolute;
    width: 86%;
    height: 56px;
    left: 25px;
    z-index: -1;">
                <div class="topInfo">
                    <span>日期</span>
                    <span>时间</span>
                </div>
                <div class="topSearch">
                    <div class="inputX"></div>
                    <div class="button">
                        <el-icon color="#ccc"><ele-Search /></el-icon>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>




<script>
import { reactive, onMounted, ref, watch, nextTick, onActivated, markRaw } from 'vue';
import TopCarouselComponent from './components/topCarouselChart/index.vue';
import basisTextComponent from './components/basisTextCom/index.vue';
import ConvJumpLinkComponent from './components/convJumpLink/index.vue';

export default {

    components: { TopCarouselComponent, basisTextComponent, ConvJumpLinkComponent },

    setup() {

        const state = reactive({
            modelData: {}
        });

        const h5Mong = ref(null);

        // 打开模型弹窗
        function open(item) {
            h5Mong.value.style.display = 'block';
            h5Mong.value.classList.remove('close');
            h5Mong.value.classList.add('open');

            state.modelData = item[0];
            console.log(item[0].components)
        };


        // 关闭模型
        function close() {
            h5Mong.value.classList.remove('open');
            h5Mong.value.classList.add('close');
            setTimeout(() => {
                h5Mong.value && (h5Mong.value.style.display = 'none');
            }, 300);
        };

        return {
            state,
            open,
            close,
            h5Mong
        };
    }
}
</script>


<style lang="scss" scoped>
.h5MongolianLayer {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 11111;
    background-color: rgba(000, 000, 000, 0.5);
    top: 0px;
    left: 0px;
    display: none;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    /* 保留最后一帧状态 */


    &.open {
        animation-name: transparentAnimation;
    }

    &.close {
        animation-name: transparentAnimation1;

    }



    .mobilePhoneModel {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 306px;
        height: 600px;

        .maskingImg {

            background-image: url(../../assets/imgs/phoneModel.png);
            border-top-left-radius: 50px;
            border-top-right-radius: 50px;
            border-bottom-left-radius: 44px;
            border-bottom-right-radius: 44px;
            background-size: contain;
            background-size: 198% 100%;
            background-position-x: 49%;
            width: 100%;
            height: 100%;
            position: relative;
        }




        .maskingMain {
            position: absolute;
            width: 86%;
            height: 86%;
            background-color: rgba(211, 210, 210, 0.63);
            left: 25px;
            top: 70px;
            border-bottom-left-radius: 30px;
            border-bottom-right-radius: 30px;
            z-index: 1;
            overflow: auto;


            &::-webkit-scrollbar {
                width: 0px;
            }
        }



        .topInfo {
            //position: absolute;
            /* top: 18px;
            font-size: 11px;
            width: 80%;
            left: 35px;
            padding: 0px 20px;
            display: flex;
            justify-content: space-between; */

            top: 18px;
            font-size: 11px;
            width: 86%;
            left: 35px;
            /* padding: 0px 20px; */
            display: flex;
            justify-content: space-between;
            left: 8px;
            margin-left: 16px;
            padding: 0px 14px;
            padding-top: 3px;
        }


        .topSearch {
            width: 100%;
            //position: absolute;
            left: 25px;
            height: 30px;
            top: 39px;
            box-shadow: 0px 2px 3px #ccc;
            display: flex;
            align-items: center;
            margin-top: 3px;
            justify-content: space-around;

            .inputX {
                height: 20px;
                width: 80%;
                border: 1px solid;
                border: 1px solid #dbdbdb;
                border-radius: 11px;
                top: 50%;
                //position: absolute;
                //transform: translateY(-50%);
                left: 9px;
            }

            .button {
                width: 27px;
                height: 20px;
                border: 1px solid #dbdbdb;
                /* border-radius: 30%; */
                // position: absolute;
                top: 50%;
                //transform: translateY(-50%);
                right: 13px;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #ebebeb;
            }
        }
    }


    .closeIcon {
        position: absolute;
        top: 40px;
        right: 20%;
        cursor: pointer;

        &:hover {
            .el-icon {
                animation: dithering 0.3s ease-in-out;
            }

        }
    }
}




@keyframes transparentAnimation {
    0% {
        opacity: 0;
    }

    ;

    100% {
        opacity: 1;
    }
}



@keyframes transparentAnimation1 {
    0% {
        opacity: 1;
    }

    ;

    100% {
        opacity: 0;
    }
}


@keyframes dithering {
    0% {
        transform: scale(0.3);
    }

    80% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}
</style>