<template>
    <el-dialog title="模板列表" v-model="state.show" :close-on-click-modal="false" width="40%" :before-close="closePopup">
        <div>
            <el-table :data="state.lists" stripe style="width: 100%" border max-height="400px"
                v-loading="state.loading">
                <el-table-column width="50">
                    <template #default="scope">
                        <el-checkbox :name="scope.row.id" :checked="state.select === scope.row.id" size="large" @change="change(scope.row.id, $event)"/>
                    </template>

                </el-table-column>
                <el-table-column prop="id" label="id" width="50" align="center" />
                <el-table-column prop="name" label="模板名称" align="center" />
                <el-table-column label="操作" width="100" align="center" />
            </el-table>
            <el-pagination background layout="prev, pager, next" :total="state.total" small
                style="display: flex; justify-content: end; margin-top: 20px;" />
        </div>

        <div>
            <el-button type="primary" size="default"  @click="confirm">确定</el-button>
        </div>
    </el-dialog>
</template>



<script>
import { reactive, onMounted, ref, watch, nextTick, onActivated, markRaw } from 'vue';
import { getTemplateList } from '/@/api/singlePage/index.js';
export default {
    setup(props, { emit }) {

        const state = reactive({
            show: false,
            page: 1,
            pageSize: 10,
            loading: false,
            lists: [],
            total: 0,
            select: null
        });


        // 关闭弹窗
        function closePopup() {
            state.show = false;
        };


        // 打开弹窗
        function openPopup() {
            state.show = true;
            myGetTemplateList();
        };

        // 获取模板列表
        async function myGetTemplateList() {
            state.loading = true;
            const res = await getTemplateList({ page: state.page });
            state.loading = false;
            state.lists = res.data.data;
            state.total = res.data.meta.total;
        };


        function change(id, bol){
            state.select = id;
            
        };



        // 确定
        function confirm(){
            const item = state.lists.filter((item)=>{ return item.id === state.select })[0];
            closePopup();
            emit('complete', item);
        };

        

        return { state, closePopup, openPopup, change, confirm }
    }
}
</script>


<style lang="scss" scoped></style>