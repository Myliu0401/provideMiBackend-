<template>
    <el-dialog title="模板列表" v-model="state.show" :close-on-click-modal="false" width="67%" :before-close="closePopup">

        <div class="templateArea">
            <div class="templateList">
                <div class="templateList_selectionArea">
                    <el-date-picker v-model="state.dateTime" type="daterange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期" size="default" style="margin-right: 5px;" />
                    <el-button type="primary" :icon="Search" size="default" @click="myGetTemplateList">搜索</el-button>
                </div>

                <div class="templateList_main" v-loading="state.loading">
                    <div class="main_box">
                        <ul class="box_ul">
                            <li v-for="item in state.lists" :key="item.id" class="item">
                                <img class="img" :src="item.img" style="height: 100%; position: absolute;" />
                                <div class="mengcheng">
                                    <div class="top"></div>
                                    <div class="bottoms">
                                        <el-button type="primary" round
                                            @click="selectTemplate(item)">使用</el-button>
                                        <el-button round @click.stop="openPhoneModel">预览</el-button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <el-pagination background layout="prev, pager, next" :total="state.total" small
                    style="display: flex; justify-content: end; margin-top: 20px;" />
            </div>

            <teleport to="#app">
                <H5model ref="h5model" />
            </teleport>
        </div>

    </el-dialog>


</template>


<script>
import { reactive, onMounted, ref, watch, nextTick, onActivated, markRaw, defineEmits, onBeforeMount } from 'vue';
import { Search } from '@element-plus/icons-vue';
import H5model from '/@/components/H5model/index.vue';
import { getTemplateList } from '/@/api/singlePage/index.js';

export default {

    components: { H5model },

    setup(props, { emit }) {
        const h5model = ref(null);

        const state = reactive({
            dateTime: [],
            page: 1,
            pageSize: 10,
            total: 0,
            lists: [],
            loading: false,
            show: false
        });


        // 打开弹窗
        function openPopup() {
            state.show = true;
            myGetTemplateList();
        };

        // 关闭弹窗
        function closePopup() {
            state.show = false;
        };


        // 获取模板列表
        async function myGetTemplateList() {
            state.loading = true;
            const res = await getTemplateList({ page: state.page });
            state.loading = false;
            state.lists = res.data.data;
            state.total = res.data.meta.total;
        };


        // 选中模板
        function selectTemplate(item){
               emit('selectTemplate', item);
               closePopup();
        };
         

        // 打开模型
        function openPhoneModel() {
            h5model.value.open();
        };


        return { h5model, state, openPopup, closePopup, openPhoneModel, myGetTemplateList, selectTemplate };
    }

}





</script>


<style lang="scss" scoped>
@import './index.scss';
</style>
<style lang="scss">
@import './index.scss';
</style>