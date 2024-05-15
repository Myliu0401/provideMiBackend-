<template>
    <div class="templateList">
        <div class="templateList_selectionArea" style="display: flex; justify-content: space-between;">
            <div>
                <el-date-picker v-model="listData.dateTimes" type="daterange" range-separator="至"
                    start-placeholder="开始日期" end-placeholder="结束日期" size="default" style="margin-right: 5px;" />
                <el-button :icon="Refresh" size="default" @click="reset">重置</el-button>
                <el-button type="primary" :icon="Search" size="default" @click="search">搜索</el-button>
            </div>

            <el-button :icon="Plus" size="default" @click="enterTemplateCreation" v-authority>创建模板</el-button>
        </div>

        <div class="templateList_content">
            <el-table v-loading="listData.loading" :data="listData.lists" border max-height="70vh" style="width: 100%;"
                stripe>
                <el-table-column prop="id" label="id" align="center" width="80" />
                <el-table-column prop="type" label="类型" align="center" />
                <el-table-column prop="name" label="项目名称" align="center" />
                <el-table-column prop="created_at" label="创建日期" align="center" />
                <el-table-column prop="" label="示意图" align="center" width="150">
                    <template #default="scope">
                        <el-tooltip :content="`<img src=${scope.row.img} />`" raw-content>
                            <img style="width: 35px; height: 35px; border-radius: 4px; cursor: pointer;"
                                :src="scope.row.img" />
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="120px;" align="center">
                    <template #default="scope">
                        <el-text class="mx-1" type="primary" @click="wakeUpPreview(scope.row)" size="small"
                            style="cursor: pointer; margin-right: 5px;">预览</el-text>
                        <el-text class="mx-1" type="primary" @click="enterSetTemplate(scope.row)" size="small"
                            style="cursor: pointer;">修改</el-text>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination background layout="prev, pager, next" :total="listData.total" small
                style="display: flex; justify-content: end; margin-top: 20px;" />
        </div>

        <teleport to="#app">
            <H5model ref="h5model" />
        </teleport>
    </div>


</template>




<script setup>
import { reactive, onMounted, ref, watch, nextTick, onActivated, markRaw } from 'vue';
import { Search, Refresh, Plus } from '@element-plus/icons-vue';
import listFunc from './composition/list.js';
import H5model from '/@/components/H5model/index.vue';

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const h5model = ref(null);

const { listData, search, reset } = listFunc();

// 唤醒预览窗口
function wakeUpPreview(item) {
    h5model.value.open(item.params);
};

// 进入创建模板
function enterTemplateCreation() {
    sessionStorage.removeItem('templateData');
    sessionStorage.removeItem('templateBasisInfo');
    router.push('/templateCreationPage');
};

// 进入修改模板
function enterSetTemplate(item){
    sessionStorage.setItem('templateData', JSON.stringify(item.params));
    sessionStorage.setItem('templateBasisInfo', JSON.stringify(item));
    router.push('/templateSetPage');
};
</script>


<style lang="scss" scoped>
@import './index.scss';
</style>
