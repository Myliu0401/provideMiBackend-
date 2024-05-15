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
            <el-form-item label="状态" >
                <el-switch v-model="ruleForm.status" size="small" active-text="启用" inactive-text="禁用" />
            </el-form-item>
            <el-form-item label="备注" >
                <el-input v-model="ruleForm.remark" placeholder="备注" />
            </el-form-item>
            <el-form-item label="显示方式" prop="display_mode">
                <el-radio-group v-model="ruleForm.display_mode">
                    <el-radio value="1">固定显示</el-radio>
                    <el-radio value="2">跳转链接</el-radio>
                    <el-radio value="3">根据IP动态显示</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item v-if="ruleForm.display_mode === '1'" label="模板">
                <el-text class="mx-1" v-if="state.flexTemplateItem" style="margin-right: 10px;">
                    {{ state.flexTemplateItem.name }}</el-text>
                <el-text class="mx-1" type="primary" size="default" style="cursor: pointer;"
                    @click="openTemplateList">选择模板</el-text>
            </el-form-item>


            <el-form-item v-if="ruleForm.display_mode === '2'" label="url">
                <el-input v-model="ruleForm.url" placeholder="url" />
            </el-form-item>

            <div v-if="ruleForm.display_mode === '3'" class="icons">
                <el-icon size="22" :class="{ disabled: ruleForm.rules.length === 1 }"
                    :color="ruleForm.rules.length === 1 ? '#ccc' : 'black'" @click="removeRule"><ele-Remove /></el-icon>
                <el-icon size="22" @click="addRule"><ele-CirclePlus /></el-icon>
            </div>

            <div v-if="ruleForm.display_mode === '3'" style="max-height: 57vh; overflow: auto;">

                <template v-for="item, index in ruleForm.rules" :key="item.id">
                    <el-form-item label="地区代码" prop="country">
                        <el-select v-model="item.country" placeholder="国家" style="width: 240px">
                            <el-option v-for="item in regionNums" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="规则类型" style="margin-bottom: 0px;">
                        <el-radio-group v-model="item.type" class="ml-1" style="position: relative;  top: -4px;">
                            <el-radio value="template" size="large">模板</el-radio>
                            <el-radio value="link" size="large">连接</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="item.type === 'template' ? '模板' : 'url'">
                        <template v-if="item.type === 'template'">
                            <el-text class="mx-1" v-if="item.templateItem" style="margin-right: 10px;">{{
                                item.templateItem.name
                            }}</el-text>
                            <el-text class="mx-1" type="primary" size="default" style="cursor: pointer;"
                                @click="openTemplateList(index)">选择模板</el-text>
                        </template>
                        <el-input v-else v-model="item.value" placeholder="url" />
                    </el-form-item>
                </template>

            </div>
        </el-form>

        <div class="buttons" style="position: absolute; bottom: 5%; right: 11%;">
            <el-button type="primary" size="default" :icon="Plus" :loading="state.loading"
                @click.stop="myCreateProject">创建</el-button>
        </div>

        <teleport to="#app">
            <TemplateArea ref="templateListPopup" @selectTemplate="selectTemplate" />
        </teleport>
    </el-drawer>
</template>



<script>
import { reactive, onMounted, ref, watch, nextTick, onActivated, markRaw } from 'vue';
import TemplateArea from './templateArea/index.vue';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { createProject } from '/@/api/singlePage/index.js';


export default {

    components: { TemplateArea },

    setup(props, { emit }) {
        const state = reactive({
            show: false,
            flexTemplateItem: null, // 选中的模板项   
            loading: false
        });


        const regionNums = ref([{ label: '中国', value: 'DO' }]);

        const templateListPopup = ref(null);

        const ruleFormRef = ref(null);
        const formSize = ref('default');
        const rules = reactive({
            name: [{ required: true, message: '必须填写项目名称', trigger: 'blur' }],
            country: [{ required: true, message: '必须选择地区', trigger: 'blur' }]
        });
        const ruleForm = reactive({
            name: '', // 项目名称
            alias: '', // 别名
            display_mode: '1', // 显示方式
            url: '',
            template_id: '',
            status: false, // 状态
            remark: '', // 备注
            rules: [{
                country: '', // 地区代码
                type: 'template', // 规则类型
                value: '', // 规则内容
                templateItem: ''
            }],



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
        function openTemplateList(index) {
            openTemplateList.index = index;
            templateListPopup.value.openPopup();
        };


        // 选择模板
        function selectTemplate(item) {
            if (ruleForm.display_mode == 1) {
                state.flexTemplateItem = item;
            } else if (ruleForm.display_mode == 3) {
                ruleForm.rules[openTemplateList.index].templateItem = item;
            };

        };

        const display_mode = {
            1: 'fixed',
            2: 'link',
            3: 'ip'
        };


        // 验证
        function validate() {
            let tips = null;
            if (ruleForm.display_mode == 1 && !state.flexTemplateItem) {
                tips = '请选择模板';
            } else if (ruleForm.display_mode == 3 && ruleForm.type === 'link' && !ruleForm.value) {
                tips = '请输入url';
            } else if (ruleForm.display_mode == 3) {
                const items = ruleForm.rules.filter((item) => { return !item.templateItem });
                if (items.length) {
                    tips = '模板不能为空';
                };
            };


            tips && ElMessage({
                message: tips,
                type: 'warning',
            });


            return !!tips;
        };


        // 添加规则
        function addRule() {
            ruleForm.rules.push({
                country: '', // 地区代码
                type: 'template', // 规则类型
                value: '', // 规则内容
                templateItem: ''
            });
        };

        // 删除规则
        function removeRule() {
            ruleForm.rules.splice(ruleForm.rules.length - 1);
        };


        // 创建项目
        async function myCreateProject() {
            if (validate()) { return }
            await ruleFormRef.value.validate();
            await ElMessageBox.confirm(
                '是否确定创建该项目',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            );
            state.loading = true;
            await createProject({
                type: 1,
                name: ruleForm.name,
                alias: ruleForm.alias,
                display_mode: display_mode[ruleForm.display_mode],
                status: ruleForm.status ? 1 : 2,
                remark: ruleForm.remark,
                template_id: ruleForm.display_mode == 1 ? state.flexTemplateItem.id : undefined,
                url: ruleForm.display_mode == 2 ? ruleForm.url : undefined,
                rules: ruleForm.display_mode !== 3 ? undefined : ruleForm.rules.map((item) => {
                    return {
                        country: item.country,
                        type: item.type,
                        value: item.type === 'template' ? item.templateItem.id : item.value
                    }
                })
            });
            state.loading = false;
            ElMessage({
                message: '创建项目成功',
                type: 'success',
            });
            close();
            emit('complete');
        };



        return {
            Plus, state, open, close, ruleFormRef, formSize, rules, ruleForm, templateListPopup,
            openTemplateList,
            selectTemplate,
            regionNums,
            myCreateProject,
            addRule,
            removeRule
        };
    }
}
</script>



<style lang="scss" scoped>
.buttons {
    max-width: 500px;
    display: flex;
    margin: 0 auto;
    justify-content: flex-end;
    margin-top: 20px;
}


.icons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 30px;

    .el-icon {
        cursor: pointer;

        margin: 0px 10px;

        transition: all 0.2s;
        transform: scale(1);


        &.disabled {
            cursor: no-drop;
        }

        &:not(.disabled):hover {
            transform: scale(1.2);
        }
    }
}
</style>