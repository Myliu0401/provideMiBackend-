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
                    <div class="uploadImages"></div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>


<script setup name="topImgComponent">
import { reactive, onMounted, onUnmounted, ref } from 'vue';


const state = reactive({
    current: null
});



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


        .tipsText{
            font-size: 12px;
            color: #a3a3a3;
        }
    }
}
</style>