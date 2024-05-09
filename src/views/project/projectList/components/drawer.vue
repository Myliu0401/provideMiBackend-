<template>
    <el-drawer v-model="state.show" title="创建项目" direction="rtl" size="50%">
        <el-form ref="ruleFormRef" style="max-width: 500px; margin: 0 auto;
    margin-top: 30px;" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm" :size="formSize"
            status-icon>
            <el-form-item label="项目名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="项目名称" />
            </el-form-item>
            <el-form-item label="别名" prop="alias">
                <el-input v-model="ruleForm.alias" placeholder="用于URL显示" />
            </el-form-item>
            <el-form-item label="显示方式" prop="display_mode">
                <el-radio-group v-model="ruleForm.display_mode">
                    <el-radio value="1">固定显示</el-radio>
                    <el-radio value="2">跳转链接</el-radio>
                    <el-radio value="3">根据IP动态显示</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item v-if="ruleForm.display_mode === '1'" label="模板">
                <el-text class="mx-1" v-if="state.templateItem" style="margin-right: 10px;">{{ state.templateItem.name
                    }}</el-text>
                <el-text class="mx-1" type="primary" size="default" style="cursor: pointer;"
                    @click="openTemplateList">选择模板</el-text>
            </el-form-item>


            <el-form-item v-if="ruleForm.display_mode === '2'" label="url">
                <el-input v-model="ruleForm.url" placeholder="url" />
            </el-form-item>

            <template v-if="ruleForm.display_mode === '3'">
                <el-form-item label="地区代码">
                    <el-select v-model="ruleForm.rules.country" placeholder="国家" style="width: 240px">
                        <el-option v-for="item in regionNums" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="规则类型">
                    <el-radio-group v-model="ruleForm.rules.type" class="ml-1" style="position: relative;  top: -4px;">
                        <el-radio value="template" size="large">模板</el-radio>
                        <el-radio value="link" size="large">连接</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="规则类型">
                    <template v-if="ruleForm.rules.type === 'template'">
                        <el-text class="mx-1" v-if="state.templateItem" style="margin-right: 10px;">{{
                            state.templateItem.name
                        }}</el-text>
                        <el-text class="mx-1" type="primary" size="default" style="cursor: pointer;"
                            @click="openTemplateList">选择模板</el-text>
                    </template>

                    <el-input v-else v-model="ruleForm.name" placeholder="url" />
                </el-form-item>
            </template>


        </el-form>

        <teleport to="#app">
            <TemplateListPopup ref="templateListPopup" @complete="selectTemplate" />
        </teleport>
    </el-drawer>
</template>



<script>
import { reactive, onMounted, ref, watch, nextTick, onActivated, markRaw } from 'vue';
import TemplateListPopup from './templateListPopup.vue';

export default {

    components: { TemplateListPopup },

    setup(props, { emit }) {
        const state = reactive({
            show: false,
            templateItem: null
        });


        const regionNums = ref([{ label: '中国', value: 1 }]);

        const templateListPopup = ref(null);

        const ruleFormRef = ref(null);
        const formSize = ref('default');
        const rules = reactive({
            name: [
                { required: true, message: '必须填写项目名称', trigger: 'blur' },

            ],
        });
        const ruleForm = reactive({
            name: '', // 项目名称
            alias: '', // 别名
            display_mode: '1', // 显示方式
            url: '',
            template_id: '',
            rules: {
                country: '', // 地区代码
                type: 'template', // 规则类型
                value: '', // 规则内容
            }
        });


        // 打开
        function open() {
            state.show = true;
        };


        // 关闭
        function close() {
            state.show = false;
        };


        // 打开模板列表
        function openTemplateList() {
            templateListPopup.value.openPopup();
        };


        function selectTemplate(item) {
            state.templateItem = item;
        };



        return { state, open, close, ruleFormRef, formSize, rules, ruleForm, templateListPopup, openTemplateList, selectTemplate, regionNums };
    }
}
</script>



<style lang="scss" scoped></style>