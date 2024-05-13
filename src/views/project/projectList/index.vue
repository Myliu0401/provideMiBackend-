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
                <el-button :icon="Plus" size="default" @click="openDrawer('add')">创建项目</el-button>
            </div>

        </div>


        <div class="projectList_main">
            <el-table v-loading="listData.loading" :data="listData.lists" border max-height="70%" style="width: 100%;">
                <el-table-column prop="id" label="id" align="center" width="100" />
                <el-table-column prop="created_at" label="创建日期" align="center" />
                <el-table-column prop="name" label="项目名称" align="center" />
                <el-table-column prop="alias" label="别名" align="center" />
                <el-table-column prop="display_mode_txt" label="显示方式" align="center" />
                <el-table-column prop="status" label="状态" align="center" width="100">
                    <template #default="scope">
                        <el-tag v-if="scope.row.status == 1" type="primary" size="default">{{ scope.row.status_txt
                            }}</el-tag>
                        <el-tag v-else type="warning" size="default">{{ scope.row.status_txt }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="project_url" label="连接" align="center">
                    <template #default="scope">
                        <span class="copy" :data-clipboard-text="scope.row.project_url"
                            style="cursor: pointer;font-size: 13px;color: #43a3db">{{ scope.row.project_url }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="100px;" align="center">
                    <template #default="scope">
                        <el-text class="mx-1" type="primary" size="small" style="cursor: pointer; margin-right: 5px;"
                            @click="openDrawer('set', scope.row)">修改</el-text>
                        <el-text class="mx-1" type="danger" size="small" style="cursor: pointer;" 
                        @click="deleteItem(scope.row)">删除</el-text>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination background layout="prev, pager, next" :total="listData.total" small
                style="display: flex; justify-content: end; margin-top: 20px;" />
        </div>


        <teleport to="#app">
            <AddDrawer ref="addDrawer" @complete="search" />
            <SetDrawer ref="setDrawer" @complete="search" />
        </teleport>
    </div>
</template>



<script setup>
import { reactive, onMounted, ref, watch, nextTick, onActivated, markRaw } from 'vue';
import { Search, Refresh, Plus } from '@element-plus/icons-vue';
import ListFunc from './composition/list.js';
import { useRoute, useRouter } from 'vue-router';
import AddDrawer from './components/addDrawer.vue';
import SetDrawer from './components/setDrawer.vue';
import Clipboard from 'clipboard';
import { ElMessage, ElMessageBox } from 'element-plus';

const route = useRoute();
const router = useRouter();

const addDrawer = ref(null);
const setDrawer = ref(null);

const { listData, search, reset } = ListFunc();


// 打开抽屉
function openDrawer(type, item) {
    if (type === 'add') {
        addDrawer.value.open();
    } else {
        setDrawer.value.open(item);
    }
};

// 删除项目
async function deleteItem(item){
    ElMessageBox.confirm(
    `你是否确定删除 ${item.name} 项目吗?`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
};



const clipboard = new Clipboard('.copy');
clipboard.on('success', (e) => {
    ElMessage({
        message: '复制成功',
        type: 'success',
    });
});

</script>


<style lang="scss" scoped>
@import './index.scss';
</style>
