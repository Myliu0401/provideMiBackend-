<template>
    <div class="modifyingInformation">
        <div class="item">
            <p class="title">基础组件: 文本</p>
            <el-tag style="margin: 15px 20px;" type="primary" size="default">支持腾讯广告全广告位</el-tag>
        </div>

        <div class="item">
            <p class="title">推广文案</p>

            <div class="inputTextarea">
                <el-input v-model="state.text" style="width: 320px;" type="textarea" placeholder="请输入" />
            </div>
        </div>

        <div class="item">
            <p class="title">字符与段落</p>
            <div class="item_xian">
                <span class="xian_title">字符样式</span>
                <div class="xian_content">
                    <div class="left">
                        <el-select @change="setFontSize" v-model="state.fontSize" placeholder="字体大小" style="width: 80px" size="default">
                            <el-option v-for="item in fontSizeOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                        <el-color-picker v-model="state.color" size="default" @active-change="setColor"/>
                    </div>

                    <div class="buttons">
                        <div class="button" :class="{ active: !state.bold }" @click="setBold(false)">常规</div>
                        <div class="button" :class="{ active: state.bold }" @click="setBold(true)">加粗</div>
                    </div>
                </div>
            </div>

            <div class="item_xian">
                <span class="xian_title">对齐方式</span>
                <div class="buttons mainContent">
                    <div class="button" :class="{ active: state.alignment === 'left' }" @click="setAlignment('left')">
                        <svg class="adui-button-leftIcon adui-icon-base" width="18" height="18" viewBox="0 0 18 18"
                            fill="#6b6b6b" data-interactive="false" data-icon="format-align-left">
                            <path
                                d="M3.50342 4H9.49658C9.7671 4 10 4.22595 10 4.50468V5.49532C10 5.78596 9.77461 6 9.49658 6H3.50342C3.2329 6 3 5.77405 3 5.49532V4.50468C3 4.21404 3.22539 4 3.50342 4ZM3.50035 8H14.4997C14.771 8 15 8.22596 15 8.50468V9.49532C15 9.78596 14.776 10 14.4997 10H3.50035C3.229 10 3 9.77404 3 9.49532V8.50468C3 8.21404 3.22401 8 3.50035 8ZM3.50035 12H14.4997C14.771 12 15 12.226 15 12.5047V13.4953C15 13.786 14.776 14 14.4997 14H3.50035C3.229 14 3 13.774 3 13.4953V12.5047C3 12.214 3.22401 12 3.50035 12Z"
                                fill-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div class="button" :class="{ active: state.alignment === 'center' }" @click="setAlignment('center')">
                        <svg class="adui-button-leftIcon adui-icon-base" width="18" height="18" viewBox="0 0 18 18"
                            fill="#6b6b6b" data-interactive="false" data-icon="format-align-center">
                            <path
                                d="M6.00342 4H11.9966C12.2671 4 12.5 4.22595 12.5 4.50468V5.49532C12.5 5.78596 12.2746 6 11.9966 6H6.00342C5.7329 6 5.5 5.77405 5.5 5.49532V4.50468C5.5 4.21404 5.72539 4 6.00342 4ZM6.00342 12H11.9966C12.2671 12 12.5 12.226 12.5 12.5047V13.4953C12.5 13.786 12.2746 14 11.9966 14H6.00342C5.7329 14 5.5 13.774 5.5 13.4953V12.5047C5.5 12.214 5.72539 12 6.00342 12ZM3.50035 8H14.4997C14.771 8 15 8.22596 15 8.50468V9.49532C15 9.78596 14.776 10 14.4997 10H3.50035C3.229 10 3 9.77404 3 9.49532V8.50468C3 8.21404 3.22401 8 3.50035 8Z"
                                fill-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div class="button" :class="{ active: state.alignment === 'right' }" @click="setAlignment('right')">
                        <svg class="adui-button-leftIcon adui-icon-base" width="18" height="18" viewBox="0 0 18 18"
                            fill="#6b6b6b" data-interactive="false" data-icon="format-align-right">
                            <path
                                d="M8.50342 4H14.4966C14.7671 4 15 4.22595 15 4.50468V5.49532C15 5.78596 14.7746 6 14.4966 6H8.50342C8.2329 6 8 5.77405 8 5.49532V4.50468C8 4.21404 8.22539 4 8.50342 4ZM3.50035 8H14.4997C14.771 8 15 8.22596 15 8.50468V9.49532C15 9.78596 14.776 10 14.4997 10H3.50035C3.229 10 3 9.77404 3 9.49532V8.50468C3 8.21404 3.22401 8 3.50035 8ZM3.50035 12H14.4997C14.771 12 15 12.226 15 12.5047V13.4953C15 13.786 14.776 14 14.4997 14H3.50035C3.229 14 3 13.774 3 13.4953V12.5047C3 12.214 3.22401 12 3.50035 12Z"
                                fill-rule="evenodd"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>


        <div class="item">
            <p class="title">边距</p>

            <div class="itemBox">
                <span class="itemBox_title">上边距</span>
                <el-slider v-model="state.paddingTop" size="small" @input="setMargins('top')"/>
            </div>

            <div class="itemBox">
                <span class="itemBox_title">下边距</span>
                <el-slider v-model="state.paddingBottom" size="small" @input="setMargins('bottom')"/>
            </div>
        </div>
        
    </div>
</template>


<script setup name="basisTextComponent">
import { reactive, onMounted, onUnmounted, ref, defineProps } from 'vue';


const state = reactive({
    text: '',
    color: '',
    alignment: 'left', // 对齐方式
    bold: false, // 是否加错
    fontSize: 2, // 字体大小
    paddingTop: 17, // 上边距
    paddingBottom: 17 // 下边距
});

// 字体大小选项
const fontSizeOptions = ref([
    {
        value: 1,
        label: '14'
    },
    {
        value: 2,
        label: '15'
    }
]);


// 修改字体是否加粗
function setBold(bol = false){
     state.bold = bol;
};


// 修改对齐方式
function setAlignment(type){
   state.alignment = type;
};


// 修改边距
function setMargins(type){
    
};


// 修改字体大小
function setFontSize(){
      console.log(state.fontSize)
}

// 修改字体颜色
function setColor(color){
    console.log(color)
}
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


<style lang="scss">
.modifyingInformation {
    .item {
        textarea {
            height: 130px;
            resize: none;
        }


        .el-select__wrapper {
            min-height: 30px;
        }

        .el-color-picker__trigger {
            height: 30px;
        }

        .el-color-picker {
            margin-left: 5px;
            position: relative;
            top: 2px;
        }
    }
}
</style>