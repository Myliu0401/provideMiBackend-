<template>
    <div class="operationArea">
        <LeftZone :pagesDatas="state.pagesDatas" :isAllDisabled="isAllDisabled()" />
        <CenterZone :pagesDatas="state.pagesDatas" @deselect="state.currentActive = null"
            :activeId="state.currentActive" @setBackColor="setBackColor" :isAllDisabled="isAllDisabled()" />
        <RightZone :componentName="componentName" :componentData="componentData" />
    </div>
</template>



<script>
import { reactive, onMounted, onUnmounted, ref, computed, onBeforeMount } from 'vue';
import LeftZone from './leftZone.vue';
import CenterZone from './centerZone.vue';
import RightZone from './rightZone.vue';
import mittBus from '/@/utils/mitt'; // 事件总线

import { useRoute, useRouter } from 'vue-router';


export default {

    components: { LeftZone, CenterZone, RightZone },

    setup(props) {
        const state = reactive({
            pagesDatas: [
                {
                    backColor: '', // 页面的背景颜色
                    id: Math.random().toString(36).slice(3), // 数据为唯一id
                    components: [ // 组件数组
                        /*
                          {
                             componentName: 'topCarouselComponent',
                             id: Math.random().toString(36).slice(3),
                             data: {
                                 carousel: [{ id: 1 }, { id: 2 }, { id: 3 }],
                                 currentId: null, // 当前选中的id
                             }
                         },
                         {
                             componentName: 'basisCarouselComponent',
                             id: Math.random().toString(36).slice(3),
                             data: {
                                 carousel: [{ id: 1 }, { id: 2 }, { id: 3 }],
                                 currentId: null, // 当前选中的id
                             }
                         },
                         {
                             componentName: 'topImgComponent', // 组件名称
                             id: Math.random().toString(36).slice(3), // 数据为唯一id
                         },
                         {
                             componentName: 'basisTextComponent',
                             id: Math.random().toString(36).slice(3),
                             data: {
                                 text: '',
                                 style: {
                                     fontColor: '',
                                     textAlign: 'left',
                                     fontSize: 15,
                                     fontWeight: '',
                                     paddingTop: 17,
                                     paddingBottom: 17
                                 }
                             }
                         },
                         {
                             componentName: 'convJumpLinkComponent',
                             id: Math.random().toString(36).slice(3),
                             data: {
                                 isIcon: false,
                                 linkType: 'h5',
                                 jumpType: 'h5',
                                 link: '',
                                 ios: {
                                     appid: '',
                                     link: ''
                                 },
                                 android: {
                                     appid: '',
                                     link: ''
                                 },
                                 text: '了解详情',
                                 style: {
                                     borderColor: '',
                                     fontColor: '#fff',
                                     backgroundColor: '#07C160',
                                     fontWeight: 'normal',
                                     paddingTop: 17,
                                     paddingBottom: 17
                                 }
                             }
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
                         
                         */
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
            mittBus.on('addItem', addItem);
            
        });


        onUnmounted(() => {

            // 注销事件
            mittBus.off('switchCurrentActive', switchCurrentActive);
            mittBus.off('deleteItem', deleteItem);
            mittBus.off('setItemData', setItemData);
            mittBus.off('addItem', addItem);
        });


        // 切换当前选中的组件id
        function switchCurrentActive(id) {
            state.currentActive = id;
        };

        // 删除项
        function deleteItem(id) {

            let fatherIndex = null;
            let sonIndex = null;
            let fatherBol = null;
            let sonBol = null;
            for (let i = 0; i < state.pagesDatas.length; i++) {
                const item = state.pagesDatas[i];
                if (id === item.id) {
                    fatherBol = true;
                };

                for (let l = 0; l < item.components.length; l++) {
                    const item1 = item.components[l];
                    if (id === item1.id) {
                        sonBol = true;
                        fatherIndex = i;
                        sonIndex = l;
                    }
                }
            };

            if (sonBol) {
                const bool = id === state.pagesDatas[fatherIndex].components[sonIndex].id;
                state.pagesDatas[fatherIndex].components.splice(sonIndex, 1); // 进行删除
                bool && (state.currentActive = null);
            }
        };


        // 修改数据
        function setItemData(data = {}) {

            const item = getItem();
            if (!item) {
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

        // 添加项
        function addItem(info = { parentIndex: 0, childIndex: null, itemAllComData: {} }) {
            state.pagesDatas[info.parentIndex].components[info.childIndex === null ? state.pagesDatas[info.parentIndex].components.length : ''] = info.itemAllComData;
        };

        // 修改背景颜色
        function setBackColor(e) {
            state.pagesDatas[e.index].backColor = e.color;
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


        // 提供给外部获取数据
        function externalDataAcquisition() {
            return state.pagesDatas;
        };


        // 提供给外部填充数据
        function externalFillData(data = []) {
            state.pagesDatas = deepClone(data);
        };


        // 深度克隆
        function deepClone(obj) {
            if (obj === null || typeof obj !== 'object') {
                return obj;
            }

            const clone = Array.isArray(obj) ? [] : {};

            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clone[key] = deepClone(obj[key]);
                }
            }

            return clone;
        };


        function isAllDisabled() {
            const route = useRoute();
            return route.path === '/templateSetPage';
        };

        return { state, componentName, componentData, setBackColor, externalDataAcquisition, externalFillData, isAllDisabled };
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