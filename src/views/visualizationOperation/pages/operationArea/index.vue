<template>
    <div class="operationArea">
        <LeftZone />
        <CenterZone :pagesDatas="state.pagesDatas" @deselect="state.currentActive = null"
            :activeId="state.currentActive" />
        <RightZone :componentName="componentName" :componentData="componentData" />
    </div>
</template>



<script>
import { reactive, onMounted, onUnmounted, ref, computed, onBeforeMount } from 'vue';
import LeftZone from './leftZone.vue';
import CenterZone from './centerZone.vue';
import RightZone from './rightZone.vue';
import mittBus from '/@/utils/mitt'; // 事件总线


export default {

    components: { LeftZone, CenterZone, RightZone },

    setup(props) {
        const state = reactive({
            pagesDatas: [
                {
                    backColor: '', // 页面的背景颜色
                    id: Math.random().toString(36).slice(3), // 数据为唯一id
                    components: [ // 组件数组
                        {
                            componentName: 'topImgComponent', // 组件名称
                            id: Math.random().toString(36).slice(3), // 数据为唯一id
                        },
                        {
                            componentName: 'basisImgComponent',
                            id: Math.random().toString(36).slice(3), // 数据为唯一id
                            data: {
                                style: {
                                    marginTop: 0,
                                    marginBottom: 0
                                }
                            }

                        }
                    ],
                }
            ],

            currentActive: null, // 当前选中组件的id
        });


        onBeforeMount(() => {

            // 注册事件
            mittBus.on('switchCurrentActive', switchCurrentActive);
            mittBus.on('deleteItem', deleteItem);
            mittBus.on('setItemData', setItemData);
        });


        onUnmounted(() => {

            // 注销事件
            mittBus.off('switchCurrentActive', switchCurrentActive);
            mittBus.off('deleteItem', deleteItem);
            mittBus.off('setItemData', setItemData);
        });


        // 切换当前选中的组件id
        function switchCurrentActive(id) {
            state.currentActive = id;
        };

        // 删除项
        function deleteItem(id) {

        };


        // 修改数据
        function setItemData(data = {}) {
            const item = getItem();

            if(!item){
               return 
            }; 
            item.data = data; 
        };


        // 获取当前选中项
        function getItem(data = state.pagesDatas) {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                if (item.components && item.components.length) {
                    const activeItem = getItem(item.components);
                    if (activeItem) {
                        return activeItem;
                    }
                } else {
                    if (item.id === state.currentActive) {
                        return item;
                    }
                }
            }
        };


        // 获取右侧修改信息的组件名
        const componentName = computed(() => {
            if (!state.currentActive) { return };

            const item = getItem();

            return item.componentName;
        });


        // 获取右侧修改信息的组件数据
        const componentData = computed(() => {
            if (!state.currentActive) { return };

            const item = getItem();

            return item.data;
        });


        return { state, componentName, componentData };
    }
}
</script>



<style lang="scss" scoped>
.operationArea {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
}
</style>