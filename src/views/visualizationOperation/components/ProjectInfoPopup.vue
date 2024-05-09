<template>
    <el-dialog title="填写项目信息" v-model="state.show" :close-on-click-modal="false" width="50%" :before-close="closePopup">

        <el-form ref="ruleFormRef" style="max-width: 500px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="项目名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="项目名称"/>
            </el-form-item>
            <el-form-item label="别名" prop="alias">
                <el-input v-model="ruleForm.alias" placeholder="用于URL显示"/>
            </el-form-item>
            <el-form-item label="显示方式" prop="display_mode">
                <el-radio-group v-model="ruleForm.display_mode">
                    <el-radio value="fixed">固定显示</el-radio>
                    <el-radio value="link">跳转链接</el-radio>
                    <el-radio value="ip">根据IP动态显示</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="url" prop="url">
                <el-input v-model="ruleForm.url" placeholder="url"/>
            </el-form-item>
        </el-form>
        <template #footer>
                <div class="dialog-footer">
                    <el-button @click="closePopup" size="default">取消</el-button>
                    <el-button type="primary" @click="myCreateProject" size="default" :loading="state.loading">
                        {{ state.loading ? '上传中' : '确定' }}
                    </el-button>
                </div>
            </template>
    </el-dialog>
</template>



<script>
import { reactive, onMounted, onUnmounted, ref } from 'vue';
import { createProject } from '/@/api/singlePage/index.js';

export default {
    setup(props, { emit }) {
        const state = reactive({
            show: false,
            loading: false
        });

        const ruleForm = reactive({
            name: '', // 项目名称
            alias: '', // 别名
            display_mode: 'fixed', // 显示方式
            url: ''
        });
        const ruleFormRef = ref(null);
        const formSize = ref('default');
        const rules = reactive({
            name: [
                { required: true, message: '必须填写项目名称', trigger: 'blur' },

            ],

            alias: [{ required: true, message: '必须填写项目别名', trigger: 'blur' }]
        });


        // 关闭弹窗
        function closePopup() {
            state.show = false;
        };



        // 打开弹窗
        function openPopup() {
            state.show = true;
        };


        // 创建项目
        function myCreateProject() {

        };

        return { state, closePopup, openPopup, myCreateProject, ruleForm, ruleFormRef, formSize, rules };
    }
}
</script>



<style lang="scss" scoped></style>