<template>
    <el-drawer v-model="state.show" title="创建项目" size="60vw" :before-close="close" :close-on-click-modal="false">
        <div class="drawerBox">
            <el-form :model="form" :rules="rules" label-width="auto" ref="ruleFormRef" style="max-width: 600px">
                <el-form-item label="项目名称" prop="name" size="default">
                    <el-input v-model="form.name" />
                </el-form-item>

                <el-form-item label="项目模板">
                    <el-text class="mx-1" type="primary" size="default" @click="openWindow">选择模板</el-text>
                </el-form-item>
            </el-form>

            <div class="buttons">
                <el-button size="default" type="primary">创建项目</el-button>
            </div>
        </div>
    </el-drawer>

    <teleport to="#app">
        <TemplateList ref="templateList" />
    </teleport>
</template>


<script name="AddProject">
import { reactive, onMounted, ref, watch, nextTick, onActivated, markRaw } from 'vue';
import TemplateList from './templateList.vue';

export default {

    components: { TemplateList },

    setup(props, { emit }) {

        const state = reactive({
            show: false
        });

        const form = reactive({
            name: null
        });

        const rules = reactive({
            name: [
                { required: true, message: '请输入项目名称', trigger: 'blur' },
            ],
        });

        const ruleFormRef = ref(null);

        const templateList = ref(null);


        // 打开抽屉
        function open() {
            state.show = true;
        };

        // 关闭抽屉
        function close() {
            state.show = false;
        };


        // 打开模板列表弹窗
        function openWindow() {
        
            templateList.value.open();
        };

        return {
            state,
            form,
            rules,
            ruleFormRef,
            templateList,
            open,
            close,
            openWindow
        }
    }
}
</script>


<style lang="scss" scoped>
.drawerBox {
    margin: 20px;
    width: calc(100% - 40px);
    height: 90%;
    position: relative;


    .el-text {
        cursor: pointer;
    }


    .buttons {
        width: 100%;
        position: absolute;
        bottom: 0px;
        display: flex;
        justify-content: end;
    }
}
</style>