<template>
    <div class="templateListBox">
        <el-dialog v-model="state.show" title="模板列表" width="60vw" height="77vh" destroy-on-close align-center>
            <div class="templateList">
                <div class="templateList_selectionArea">
                    <el-date-picker v-model="state.dateTime" type="daterange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期" size="default" style="margin-right: 5px;" />
                    <el-button type="primary" :icon="Search" size="default">搜索</el-button>
                </div>

                <div class="templateList_main">
                    <div class="main_box">
                        <ul class="box_ul">
                            <li v-for="num in 5" :key="num" class="item">
                                <div class="mengcheng">
                                    <div class="top"></div>
                                    <div class="bottoms">
                                        <el-button type="primary" round
                                            @click="enterVisualizationOperation">使用</el-button>
                                        <el-button round @click.stop="openPhoneModel">预览</el-button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


        </el-dialog>

        <teleport to="#app">
            <H5model ref="h5model" />
        </teleport>
    </div>
</template>




<script name="templateList">
import { reactive, onMounted, ref, watch, nextTick, onActivated, markRaw } from 'vue';
import { Search } from '@element-plus/icons-vue';
import H5model from './H5model.vue';
import { useRoute, useRouter } from 'vue-router';


export default {

    components: { H5model },

    setup() {
        const state = reactive({
            show: false,
            dateTime: [], // 日期时间
        });


        const h5model = ref(null);

        const route = useRoute();
        const router = useRouter();


        // 打开弹窗
        function open() {
            state.show = true;
        };


        // 打开手机模型弹窗
        function openPhoneModel() {
            h5model.value.open();
        };



        // 进入可视化操作
        function enterVisualizationOperation() {
            
            router.push('/visualizationOperation');
        };


        return {
            Search,
            h5model,
            state,
            open,
            openPhoneModel,
            enterVisualizationOperation
        }
    }
}
</script>


<style lang="scss" scoped>
.templateList {
    margin-top: -20px;


    .templateList_selectionArea {
        width: 100%;


    }


    .templateList_main {
        margin-top: 15px;
        height: 63vh;
        overflow: auto;
        padding: 10px;

        .main_box {
            .box_ul {
                display: flex;
                flex-wrap: wrap;
                padding: 0px;
                margin: 0px;
                justify-content: space-between;

                .item {
                    width: 200px;
                    width: 22%;
                    height: 300px;
                    border-radius: 4px;
                    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .15);
                    background-color: #fff;
                    list-style: none;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    //margin-right: 15px;
                    margin-bottom: 15px;

                    &:hover {
                        .mengcheng {
                            animation: cardAnimation .5s ease-in-out;
                            display: block;
                        }

                    }

                    .mengcheng {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.7);
                        display: none;


                        .top {
                            width: 100%;
                            height: 70%;
                        }

                        .bottoms {
                            width: 100%;
                            height: 30%;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            button {
                                height: 30px;
                            }
                        }
                    }
                }
            }
        }
    }
}



@keyframes cardAnimation {
    0% {
        bottom: -50px;
    }

    100% {
        bottom: 0px;
    }
}
</style>



<style lang="scss">
.templateListBox {
    .el-dialog {
        height: 77vh;
    }
}
</style>