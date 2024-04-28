<template>
    <div class="templateList">
        <div class="templateList_selectionArea">
            <el-date-picker v-model="state.dateTime" type="daterange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" size="default" style="margin-right: 5px;"/>
                <el-button type="primary" :icon="Search" size="default">搜索</el-button>
        </div>

        <div class="templateList_main">
            <div class="main_box">
                <ul class="box_ul">
                    <li class="item">
                         <div class="mengcheng">
                            <div class="top"></div>
                            <div class="bottoms">
                                <el-button type="primary" round>使用</el-button>
                                <el-button round>预览</el-button>
                            </div>
                         </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>




<script setup>
import { reactive, onMounted, ref, watch, nextTick, onActivated, markRaw } from 'vue';
import { Search } from '@element-plus/icons-vue';


const state = reactive({
    dateTime: [], // 日期时间
    
});


</script>


<style lang="scss" scoped>
  @import './index.scss';
</style>
