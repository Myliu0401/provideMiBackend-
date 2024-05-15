<template>
    <div class="modifyingInformation">
        <div class="item">
            <p class="title">顶部组件: 图片</p>
            <el-tag style="margin: 15px 20px;" type="primary" size="default">支持腾讯广告全广告位</el-tag>
            <div class="card">
                <p class="text">投放朋友圈信息流，广告外层将自动拉取顶部图片。</p>
                <p class="text">投放公众号及腾讯广告其他媒体广告位，将不会拉取。</p>
            </div>
            <div class="cardBox">
                <p class="title">广告位与样式</p>

                <el-form style="margin: 0px 20px; margin-top: 10px;">
                    <el-form-item label="广告位">
                        <el-radio-group v-model="state.current" class="ml-4">
                            <el-radio value="1" size="large">朋友圈信息流</el-radio>
                            <el-radio value="2" size="large">公众号及及腾讯广告其他媒体广告位</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="item">
            <p class="title">素材设置</p>
            <el-form style="margin: 0px 20px; margin-top: 10px;">
                <el-form-item label="图片素材">
                    <div class="uploadImages" :class="{ loading: state.loading, cancel: state.src }"
                        @click="triggerChange">
                        <el-icon v-if="state.loading" size="20"><ele-Loading /></el-icon>
                        <img v-if="state.src" class="img" :src="state.src" />
                        <div v-if="state.src" class="fixed" @click="replaceImage">
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
        </div>


        <teleport to="#app">
            <input type="file" name="image" id="imageInput" ref="imageInput" accept="image/*" @change="myUploadImages">
        </teleport>
    </div>
</template>


<script setup name="topImgComponent">
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
    current: null,
    loading: false, // 是否上传中
    src: props.componentData.imgSrc, // 图片地址
});


// 触发change事件
function triggerChange() {
    if (state.loading || state.src) {
        return
    }
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

    state.src = res.data.url;
    setFinalData();
};

// 替换图片
function replaceImage() {
    if (state.loading) {
        return
    };
    imageInput.value.click();
};

// 修改最终数据
function setFinalData(){
    // 修改数据
    mittBus.emit('setItemData', {
        ...props.componentData,
        imgSrc: state.src
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


            &:not(.loading) {
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
            }

            .el-icon {
                animation: rotate360 2s linear infinite;
                position: absolute;
                z-index: 11;
                /*  top: 50%;
                left: 50%;
                transform: translate(-50%, -50%); */

            }

            .img {
                width: 100%;
                height: 100%;
            }



            transition: all 0.3s;


            &.cancel {
                border: none;
                border-radius: 4px;
                overflow: hidden;

                &::before {
                    content: '';
                    display: none;
                }

                &::after {
                    content: '';
                    display: none;
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

            &:not(.cancel):hover {
                border: 2px dashed #c1c0c0;
                background-color: #f5f5f5;

                &::before {
                    background-color: #8f8f8f;
                }

                &::after {
                    background-color: #8f8f8f;
                }
            }


            &:hover {
                .fixed {
                    display: flex;
                }
            }
        }


        .tipsText {
            font-size: 12px;
            color: #a3a3a3;
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