<template>
    <div class="projectList">
        <div class="projectList_selectionArea">
            <div>
                <el-date-picker v-model="state.dateTime" type="daterange" range-separator="至" start-placeholder="开始日期"
                    end-placeholder="结束日期" size="default" style="margin-right: 5px;" />
                <el-input v-model="state.keyword" style="width: 180px; margin-right: 5px;" placeholder="项目名称" clearable
                    size="default" />
                <el-button :icon="Refresh" size="default">重置</el-button>
                <el-button type="primary" :icon="Search" size="default">搜索</el-button>
            </div>
            <div>
                <el-button :icon="Plus" size="default" @click="enterProjectCreation">创建项目</el-button>
            </div>

        </div>


        <div class="projectList_main">
            <el-table :data="tableData" border max-height="70%" style="width: 100%">
                <el-table-column prop="id" label="id" align="center" />
                <el-table-column prop="name" label="项目名称" align="center" />
                <el-table-column prop="address" label="操作" width="100px;" align="center" />
            </el-table>
        </div>

        <teleport to="#app">
            <AddProject ref="addProject" />
        </teleport>

    </div>
</template>



<script setup>
import { reactive, onMounted, ref, watch, nextTick, onActivated, markRaw } from 'vue';
import { Search, Refresh, Plus } from '@element-plus/icons-vue';
import AddProject from './components/AddProject.vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();


const addProject = ref(null);

const state = reactive({
    dateTime: [], // 日期
    list: [], // 列表
    keyword: null, // 关键字
});


// 唤醒创建项目窗口
function wakeCreateProject() {
    addProject.value.open();
};


// 进入创建项目页
function enterProjectCreation() {
    router.push('/visualizationOperation');
};

</script>


<style lang="scss" scoped>
@import './index.scss';
</style>
