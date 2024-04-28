<template>
    <div class="templateArea">
        <div class="templateList">
            <div class="templateList_selectionArea">
                <el-date-picker v-model="state.dateTime" type="daterange" range-separator="至" start-placeholder="开始日期"
                    end-placeholder="结束日期" size="default" style="margin-right: 5px;" />
                <el-button type="primary" :icon="Search" size="default">搜索</el-button>
            </div>

            <div class="templateList_main">
                <div class="main_box">
                    <ul class="box_ul">
                        <li v-for="num in 5" :key="num" class="item">
                            <div class="mengcheng">
                                <div class="top"></div>
                                <div class="bottoms">
                                    <el-button type="primary" round @click="enterVisualizationOperation">使用</el-button>
                                    <el-button round @click.stop="openPhoneModel">预览</el-button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <teleport to="#app">
        <H5model ref="h5model" />
    </teleport>
</template>


<script setup>
import { reactive, onMounted, ref, watch, nextTick, onActivated, markRaw, defineEmits } from 'vue';
import { Search } from '@element-plus/icons-vue';
import H5model from '/@/views/project/projectList/components/H5model.vue';

const emit = defineEmits(['complete']);


const h5model = ref(null);

const state = reactive({
    dateTime: []
});

// 进入可是化操作
function enterVisualizationOperation() {
    emit('complete');
};

// 打开模型
function openPhoneModel() {
    h5model.value.open();
};

</script>


<style lang="scss" scoped>
@import './index.scss';
</style>
<style lang="scss">
@import './index.scss';
</style>