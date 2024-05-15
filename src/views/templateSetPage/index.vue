<template>
    <div class="visualizationOperation">
        <div class="visualizationOperation_topArea">
            <div class="left">
                <span class="text">修改模板</span>
            </div>
            <div class="center"></div>
            <div class="right">
                <div class="item">
                    <span class="text active">修改模板</span>
                </div>
                <div class="arrow">
                    <div class="a" style="border-left-color: rgba(255, 255, 255, 0.25);"></div>
                    <div class="b" style="border-left-color: rgb(0 0 0);"></div>
                </div>
                <el-button type="primary" size="small" @click="raisePopUp">修改模板</el-button>
            </div>
        </div>

        <OperationArea ref="operationArea" />
    </div>


    <teleport to="#app">
        <FillInInfoPopup ref="fillInInfoPopup" @complete="goRetrun" />
    </teleport>
</template>


<script setup>
import { NextLoading } from '/@/utils/loading';
import { reactive, onMounted, onUnmounted, ref } from 'vue';
import OperationArea from '../../components/pages/operationArea/index.vue';
import FillInInfoPopup from './components/FillInInfoPopup.vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const operationArea = ref(null);
const fillInInfoPopup = ref(null);

const state = reactive({
    title: ''
});

onMounted(() => {
    NextLoading.done(); // 关闭进度条

    let data = sessionStorage.getItem('templateData');
    data = data ? JSON.parse(data) : operationArea.value.externalDataAcquisition();
    operationArea.value.externalFillData(data);
});


// 调起弹窗
function raisePopUp() {
    let info = sessionStorage.getItem('templateBasisInfo');
    fillInInfoPopup.value.openPopup(operationArea.value.externalDataAcquisition(), info ? JSON.parse(info) : {});
};

// 返回
function goRetrun() {
    router.go(-1);
};

</script>


<style lang="scss" scoped>
@import '../visualizationOperation/index.scss';
</style>