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
                    <div class="uploadImages" :class="{ none: state.loading || state.imgSrc }" @click="triggerChange">
                        <el-icon v-if="state.loading" size="20"><ele-Loading /></el-icon>
                        <img v-if="state.imgSrc" class="img" :src="state.imgSrc" />
                        <div v-if="state.imgSrc" class="fixed" @click="replaceImage">
                            <svg class="adui-icon-base" width="12" height="12" viewBox="0 0 18 18" fill="#fff"
                                data-interactive="false" data-icon="replace">
                                <path
                                    d="M3.5 3.5V6.5H6.5V3.5H3.5ZM16 10V16H10V10H16ZM3.5 9V10.5C3.5 11.7426 4.50736 12.75 5.75 12.75H7V11L9.75 13.5L7 16V14.25H5.75C3.67893 14.25 2 12.5711 2 10.5V9H3.5ZM14.5 11.5H11.5V14.5H14.5V11.5ZM11 2V3.75H12.25C14.3211 3.75 16 5.42893 16 7.5V9H14.5V7.5C14.5 6.25736 13.4926 5.25 12.25 5.25H11V7L8.25 4.5L11 2ZM8 2V8H2V2H8Z"
                                    fill-rule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
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
                <el-slider v-model="state.paddingTop" size="default" @input="setMarginData('paddingTop', $event)" />
            </div>
            <div class="slider">
                <span class="slider_text">下边距</span>
                <el-slider v-model="state.paddingBottom" size="default" @input="setMarginData('paddingBottom', $event)" />
            </div>
        </div>


        <teleport to="#app">
            <input type="file" name="image" id="imageInput2" ref="imageInput" accept="image/*" @change="myUploadImages">
        </teleport>
    </div>
</template>



<script setup name="basisImgComponent">
import { reactive, onMounted, onUnmounted, ref, defineProps } from 'vue';
import { uploadImages } from '/@/api/singlePage/index.js';
import mittBus from '/@/utils/mitt'; // 事件总线

const props = defineProps({
    componentData: {
        default() {
            return {

            }
        }
    }
});

const imageInput = ref(null);

const state = reactive({
    paddingTop: props.componentData.style.paddingTop,  // 上边距
    paddingBottom: props.componentData.style.paddingBottom, // 下边距
    imgSrc: props.componentData.imgSrc,
    loading: false
});

// 触发change事件
function triggerChange(){
      if(state.loading || state.itemSrc){
          return
      }
      imageInput.value.click();
};

// 替换图片
function replaceImage() {
    if (state.loading) {
        return
    };
    imageInput.value.click();
};


// 上传图片
async function myUploadImages() {
    var formData = new FormData();
    var fileInput = imageInput.value;
    var file = fileInput.files[0];
    formData.append('file', file);
    formData.append('path', 'image');

    state.loading = true;
    let res = null;
    try{
        res = await uploadImages(formData);
    }catch(err){
        state.loading = false;
        return
    }
    state.loading = false;

    state.imgSrc = res.data.url;
    setFinalData();
};


function setFinalData(){
    mittBus.emit('setItemData', {
        ...props.componentData,
        imgSrc: state.imgSrc,
        style: {
            ...props.componentData.style,
            paddingTop: state.paddingTop,
            paddingBottom: state.paddingBottom
        }
    });
};


// 修改边距数据
function setMarginData(type, value) {
    mittBus.emit('setItemData', {
        ...props.componentData,
        imgSrc: state.imgSrc,
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

            &:not(.none)::before {
                content: '';
                position: absolute;
                width: 2px;
                height: 30%;
                background-color: #e3e3e3;
            }

            &:not(.none)::after {
                content: '';
                position: absolute;
                width: 30%;
                height: 2px;
                background-color: #e3e3e3;
            }

            transition: all 0.3s;

            &:not(.none):hover {
                border: 2px dashed #c0c0c0;
                background-color: #f1f1f1;

                &::before {
                    background-color: #c0c0c0
                }

                &::after {
                    background-color: #c0c0c0
                }
            }

            .img {
                width: 100%;
                height: 100%;
            }

            .el-icon {
                animation: rotate360 2s linear infinite;
                position: absolute;
                z-index: 11;
                /*  top: 50%;
                left: 50%;
                transform: translate(-50%, -50%); */

            }

            &:hover{
                .fixed{
                    display: flex;
                }
            }

            .fixed {
                position: absolute;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                color: #d6d6d6;
                font-size: 11px;
                background-color: rgba(0, 0, 0, 0.6);
                top: 3px;
                right: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                display: none;
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


@keyframes rotate360 {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>