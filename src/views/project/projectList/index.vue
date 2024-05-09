<template>
    <div class="projectList">
        <div class="projectList_selectionArea">
            <div>
                <el-date-picker v-model="listData.dateTimes" type="daterange" range-separator="至"
                    start-placeholder="开始日期" end-placeholder="结束日期" size="default" style="margin-right: 5px;" />
                <el-input v-model="listData.projectName" style="width: 180px; margin-right: 5px;" placeholder="项目名称"
                    clearable size="default" />
                <el-button :icon="Refresh" size="default" @click="reset">重置</el-button>
                <el-button type="primary" :icon="Search" size="default" @click="search">搜索</el-button>
            </div>
            <div>
                <el-button :icon="Plus" size="default" @click="enterProjectCreation">创建项目</el-button>
            </div>

        </div>


        <div class="projectList_main">
            <el-table v-loading="listData.loading" :data="listData.lists" border max-height="70%" style="width: 100%;">
                <el-table-column prop="id" label="id" align="center" />
                <el-table-column prop="name" label="项目名称" align="center" />
                <el-table-column prop="address" label="操作" width="100px;" align="center" />
            </el-table>

            <el-pagination background layout="prev, pager, next" :total="listData.total" small
                style="display: flex; justify-content: end; margin-top: 20px;" />
        </div>


        <teleport to="#app">
            <Drawer ref="drawer" />
        </teleport>
    </div>
</template>



<script setup>
import { reactive, onMounted, ref, watch, nextTick, onActivated, markRaw } from 'vue';
import { Search, Refresh, Plus } from '@element-plus/icons-vue';
import ListFunc from './composition/list.js';
import { useRoute, useRouter } from 'vue-router';
import Drawer from './components/drawer.vue';

const route = useRoute();
const router = useRouter();

const drawer = ref(null);

const { listData, search, reset } = ListFunc();



// 进入创建项目页
function enterProjectCreation() {

    drawer.value.open();

    //router.push('/visualizationOperation');
};

</script>


<style lang="scss" scoped>
@import './index.scss';
</style>
