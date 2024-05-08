<template>
    <div class="visualizationOperation">
        <div class="visualizationOperation_topArea">
            <div class="left">
                <span class="text">新建推广页</span>
            </div>
            <div class="center"></div>
            <div class="right">
                <div class="item">
                    <span class="text" :class="{ active: currentType === 'templateArea' }"
                        @click="fallbackToTemplate">选择模板</span>
                </div>
                <div class="arrow">
                    <div class="a" style="border-left-color: rgba(255, 255, 255, 0.25);"></div>
                    <div class="b" style="border-left-color: rgb(0 0 0);"></div>
                </div>
                <div class="item">
                    <span class="text" :class="{ active: currentType === 'operationArea' }">编辑推广页</span>
                </div>
                <div class="arrow">
                    <div class="a" style="border-left-color: rgba(255, 255, 255, 0.25);"></div>
                    <div class="b" style="border-left-color: rgb(0 0 0);"></div>
                </div>
                <div class="item">
                    <span class="text">分享设置</span>
                </div>
            </div>
        </div>

        <div class="visualizationOperation_main">
            <TemplateArea v-if="currentType === 'templateArea'" @complete="enterTheOperationArea" />
            <OperationArea v-else-if="currentType === 'operationArea'" />
        </div>
    </div>
</template>



<script setup name="visualizationOperation">
import { NextLoading } from '/@/utils/loading';
import { reactive, onMounted, onUnmounted, ref } from 'vue';
import OperationArea from './pages/operationArea/index.vue'; // 可视化操作
import TemplateArea from './pages/templateArea/index.vue'; // 模板选择页
import { ElMessage, ElMessageBox } from 'element-plus'


const currentType = ref('templateArea');

onMounted(() => {
    NextLoading.done(); // 关闭进度条
});


// 进入操作区
function enterTheOperationArea(item) {
    currentType.value = 'operationArea';
};

// 回退到模板
async function fallbackToTemplate() {
    if (currentType.value === 'templateArea') {
        return;
    };


    const text = await ElMessageBox.confirm(
        '回到模板选择，当前操作将不会做任何保存',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    );

    if (text === 'confirm') {
        currentType.value = 'templateArea';
    }
};


</script>



<style lang="scss" scoped>
@import './index.scss';
</style>