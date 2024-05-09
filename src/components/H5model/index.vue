<template>
    <div class="h5MongolianLayer" ref="h5Mong">
        <div class="closeIcon" @click.stop="close">
            <el-icon :size="'35'" :color="'#fff'">
                <ele-CircleClose />
            </el-icon>
        </div>

        <div class="mobilePhoneModel">

        </div>
    </div>
</template>




<script>
import { reactive, onMounted, ref, watch, nextTick, onActivated, markRaw } from 'vue';

export default {
    setup() {

        const h5Mong = ref(null);

        // 打开模型弹窗
        function open() {
            h5Mong.value.style.display = 'block';
            h5Mong.value.classList.remove('close');
            h5Mong.value.classList.add('open');
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
        background-image: url(../../assets/imgs/shouji1.png);
        border-top-left-radius: 50px;
        border-top-right-radius: 50px;
        border-bottom-left-radius: 44px;
        border-bottom-right-radius: 44px;
        background-size: contain;
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