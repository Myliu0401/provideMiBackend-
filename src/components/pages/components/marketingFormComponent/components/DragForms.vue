<template>
    <div class="dragForms">
        <ul class="dragForms_ul" ref="dragFormsuUlBox">
            <li class="ul_li" @mousedown="mousedown($event, index)" v-for="item, index in state.list" :key="item.id"
                :style="{
                    top: state.lists[index] && state.lists[index].y + 'px',
                    left: state.lists[index] && state.lists[index].x + 'px'
                }" :class="{
                    press: state.cuurentIndex === index || state.loosenIndex === index,
                    motion: state.cuurentIndex !== index
                }">
                <div class="li_Icon" :class="{ press: state.cuurentIndex === index && state.isPress }">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="#a3a3a3" data-interactive="true"
                        data-icon="draggable" style="margin-top: 0px; margin-right: 8px;">
                        <path
                            d="M11.5 13C12.3284 13 13 13.6716 13 14.5C13 15.3284 12.3284 16 11.5 16C10.6716 16 10 15.3284 10 14.5C10 13.6716 10.6716 13 11.5 13Z"
                            fill-rule="evenodd"></path>
                        <path
                            d="M11.5 2C12.3284 2 13 2.67157 13 3.5C13 4.32843 12.3284 5 11.5 5C10.6716 5 10 4.32843 10 3.5C10 2.67157 10.6716 2 11.5 2Z"
                            fill-rule="evenodd"></path>
                        <path
                            d="M13 9C13 8.17157 12.3284 7.5 11.5 7.5C10.6716 7.5 10 8.17157 10 9C10 9.82843 10.6716 10.5 11.5 10.5C12.3284 10.5 13 9.82843 13 9Z"
                            fill-rule="evenodd"></path>
                        <path
                            d="M6.5 5C5.67157 5 5 4.32843 5 3.5C5 2.67157 5.67157 2 6.5 2C7.32843 2 8 2.67157 8 3.5C8 4.32843 7.32843 5 6.5 5Z"
                            fill-rule="evenodd"></path>
                        <path
                            d="M5 14.5C5 15.3284 5.67157 16 6.5 16C7.32843 16 8 15.3284 8 14.5C8 13.6716 7.32843 13 6.5 13C5.67157 13 5 13.6716 5 14.5Z"
                            fill-rule="evenodd"></path>
                        <path
                            d="M6.5 10.5C5.67157 10.5 5 9.82843 5 9C5 8.17157 5.67157 7.5 6.5 7.5C7.32843 7.5 8 8.17157 8 9C8 9.82843 7.32843 10.5 6.5 10.5Z"
                            fill-rule="evenodd"></path>
                        <g class="adui-icon-interactive-cover" fill="#a3a3a3">
                            <path
                                d="M11.5 13C12.3284 13 13 13.6716 13 14.5C13 15.3284 12.3284 16 11.5 16C10.6716 16 10 15.3284 10 14.5C10 13.6716 10.6716 13 11.5 13Z"
                                fill-rule="evenodd"></path>
                            <path
                                d="M11.5 2C12.3284 2 13 2.67157 13 3.5C13 4.32843 12.3284 5 11.5 5C10.6716 5 10 4.32843 10 3.5C10 2.67157 10.6716 2 11.5 2Z"
                                fill-rule="evenodd"></path>
                            <path
                                d="M13 9C13 8.17157 12.3284 7.5 11.5 7.5C10.6716 7.5 10 8.17157 10 9C10 9.82843 10.6716 10.5 11.5 10.5C12.3284 10.5 13 9.82843 13 9Z"
                                fill-rule="evenodd"></path>
                            <path
                                d="M6.5 5C5.67157 5 5 4.32843 5 3.5C5 2.67157 5.67157 2 6.5 2C7.32843 2 8 2.67157 8 3.5C8 4.32843 7.32843 5 6.5 5Z"
                                fill-rule="evenodd"></path>
                            <path
                                d="M5 14.5C5 15.3284 5.67157 16 6.5 16C7.32843 16 8 15.3284 8 14.5C8 13.6716 7.32843 13 6.5 13C5.67157 13 5 13.6716 5 14.5Z"
                                fill-rule="evenodd"></path>
                            <path
                                d="M6.5 10.5C5.67157 10.5 5 9.82843 5 9C5 8.17157 5.67157 7.5 6.5 7.5C7.32843 7.5 8 8.17157 8 9C8 9.82843 7.32843 10.5 6.5 10.5Z"
                                fill-rule="evenodd"></path>
                        </g>
                    </svg>
                </div>
                <el-select v-model="data.value1" :placeholder="item.tips" style="width: 170px;" size="default">
                    <el-option v-for="item1 in options1" :key="item1.id" :label="item1.label" :value="item1.id" />
                </el-select>
            </li>
        </ul>
    </div>
</template>




<script>
import { reactive, onMounted, onUnmounted, ref, defineProps, watch } from 'vue';
export default {
    setup(props, { emit }) {

        const dragFormsuUlBox = ref(null);

        const state = reactive({
            isPress: false, // 是否按下
            isMove: false, // 是否移动
            pressX: null, // 按下坐标x
            pressY: null, // 按下坐标Y


            currentVacancyX: null, // 当前空位坐标x
            currentVacancyY: null, // 当前空位坐标y
            cuurentIndex: undefined,
            loosenIndex: undefined,

            domInfos: [], // dom的位置信息
            lists: [], // 

            endIndex: null,
            list: [
                {
                    id: 1,
                    tips: '姓名'
                },
                {
                    id: 2,
                    tips: '性别'
                },
                {
                    id: 3,
                    tips: '身份'
                },
                {
                    id: 4,
                    tips: '手机号码'
                }
            ],


            lastTimeIndex: null
        });


        const data = reactive({
            value1: ''
        });

        const options1 = ref([
            {
                label: '姓名',
                id: 1
            }
        ]);


        onMounted(() => {
            initDomsInfo();
        });


        // 鼠标按下
        function mousedown({ clientX, clientY, target }, index) {

            window.addEventListener('mousemove', mousemove);
            window.addEventListener('mouseup', mouseup);

            state.isPress = true;
            state.pressX = clientX;
            state.pressY = clientY;
            const item = state.domInfos[index];
            state.currentVacancyX = item.left;
            state.currentVacancyY = item.top;
            state.cuurentIndex = index;

        };


        // 鼠标移动
        function mousemove({ clientX, clientY }) {
            state.isMove = true;
            state.lists[state.cuurentIndex].x = clientX - state.pressX;
            state.lists[state.cuurentIndex].y = clientY - state.pressY;

            swappingPositions();
        };


        // 鼠标抬起
        function mouseup() {
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseup', mouseup);

            state.isPress = false;

            state.isMove = false;
            state.lists[state.cuurentIndex].x = 0;
            state.lists[state.cuurentIndex].y = 0;
            return
            /*   const item = state.domInfos[state.cuurentIndex];
  
              const y = state.currentVacancyY - item.top;
              const x = state.currentVacancyX - item.left;
              state.lists[state.cuurentIndex].x = x;
              state.lists[state.cuurentIndex].y = y;
  
              const startIndex = state.cuurentIndex;
              const endIndex = state.endIndex;
              state.pressX = 0;
              state.pressY = 0;
              state.loosenIndex = state.cuurentIndex;
              state.cuurentIndex = undefined;
              state.currentVacancyX = 0;
              state.currentVacancyY = 0;
              state.endIndex = null;
              setTimeout(() => {
                  state.loosenIndex = undefined;
                  initDomsInfo();
  
                  dataSwappingPositions(startIndex, endIndex)
              }, 300); */
        };



        // 调换位置
        function swappingPositions() {
            const info = dragFormsuUlBox.value.getBoundingClientRect();
            const cx = state.lists[state.cuurentIndex].x + state.domInfos[state.cuurentIndex].left;
            const cy = state.lists[state.cuurentIndex].y + state.domInfos[state.cuurentIndex].top;



            for (let i = 0; i < state.domInfos.length; i++) {
                const item = state.domInfos[i];

                if ((cy > item.top) && (cy < item.top + 10) && ((cx + 200) > info.left && cx < (info.left + item.width))) {
                   

                    const inp = state.lastTimeIndex;
                    
                    console.log(state.cuurentIndex, state.lastTimeIndex)

                    // 更新目标元素位置
                    if (state.cuurentIndex < i) {
            
                        // 目标元素下移
                        for (let j = state.cuurentIndex + 1; j <= i; j++) {
                            state.lists[j].y -= item.height;
                            state.lists[j].y = state.lists[j].y < -1 * item.height ? -1 * item.height : state.lists[j].y;
                        }

                        if(state.lastTimeIndex !== null){
                        
                        }

                    } else if (state.cuurentIndex > i) {
                        // 目标元素上移
                        for (let j = i; j < state.cuurentIndex; j++) {
                            state.lists[j].y += item.height;
                            state.lists[j].y = state.lists[j].y > item.height ? item.height : state.lists[j].y;
                        }
                    }

                    state.currentVacancyY = item.top;
                    state.currentVacancyX = item.left;
                    state.lastTimeIndex = i;
                    

                    break; // 终止循环，因为已经找到了目标位置
                }
            }
        }




        // 数据调换位置
        function dataSwappingPositions(startIndex, endIndex) {
            if (startIndex === endIndex || endIndex === null) {
                return
            }

            // 获取当前拖动元素的信息
            const item = state.list[startIndex];

            // 计算要删除的元素索引
            const index1 = startIndex < endIndex ? endIndex + 1 : endIndex;

            // 将拖动元素插入到新位置
            state.list.splice(index1, 0, item);

            // 计算要删除的元素索引
            const index = startIndex < endIndex ? startIndex : startIndex + 1;

            // 从原来位置删除元素
            state.list.splice(index, 1);

            console.log(state.list)
        };

        function initDomsInfo() {
            state.domInfos.length = 0;
            state.lists.length = 0;
            Array.from(dragFormsuUlBox.value.children).forEach((dom) => {
                const info = dom.getBoundingClientRect();
                state.domInfos.push({
                    bottom: info.bottom,
                    height: info.height,
                    left: info.left,
                    right: info.right,
                    top: info.top,
                    width: info.width,
                    x: info.x,
                    y: info.y
                });
                state.lists.push({ x: 0, y: 0 });
            });


        };


        return { state, data, options1, mousedown, dragFormsuUlBox };
    }
}
</script>



<style lang="scss" scoped>
.dragForms {
    padding: 0px 20px;

    .dragForms_ul {
        .ul_li {
            display: flex;
            align-items: center;
            padding: 6px 0px;
            position: relative;

            &.press {
                background-color: #fff;
                box-shadow: rgba(0, 0, 0, 0.18) 0px 0px 6px 0px;
                z-index: 1;
            }


            &.motion {
                transition: all 0.2s;
            }

            .li_Icon {
                height: 30px;
                display: flex;
                align-items: center;
                cursor: grab;

                &.press {
                    cursor: grabbing;
                }
            }
        }
    }
}
</style>