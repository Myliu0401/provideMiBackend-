<template>
    <div class="dragForms">
        <ul class="dragForms_ul" ref="dragFormsuUlBox">
            <li class="ul_li" v-for="item, index in listData" :key="item.id" :style="{
                top: state.lists[index] && state.lists[index].y + 'px',
                left: state.lists[index] && state.lists[index].x + 'px'
            }" :class="{
                press: state.cuurentIndex === index && state.isMove,
                motion: state.cuurentIndex !== index,
                motionZ: state.loosenIndex === index
            }">
                <div class="li_Icon" :class="{ press: state.cuurentIndex === index && state.isPress }"
                    @mousedown="mousedown($event, index)">
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
                <el-select v-if="item.type === 'select'" v-model="item.active" :placeholder="item.text"
                    @change="changeSelect(item, $event)" style="width: 170px;" size="default">
                    <el-option v-for="item1 in getTypeSelection(item.id)" :key="item1.id" :label="item1.label"
                        :value="item1.id" />
                </el-select>
                <el-input v-else-if="item.type === 'input'" v-model="item.active" style="width: 170px;" size="default"
                    :placeholder="item.text" />

                <el-text v-if="item.text !== '电话号码'" class="mx-1 location" size="small"
                    @click="deleteItem(item.id)">删除</el-text>
            </li>
        </ul>
        <el-dropdown trigger="click" @command="commandChange">
            <el-button size="default"
                style="margin-left: 26px; margin-top: 10px;"><el-icon><ele-Plus /></el-icon>添加表单项</el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item :command="item.id" v-for="item in dropdownList" :key="item.id">{{ item.text
                        }}</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>




<script>
import { reactive, onMounted, onUnmounted, ref, defineProps, watch } from 'vue';
import mittBus from '/@/utils/mitt'; // 事件总线

export default {

    props: {
        itemData: {
            default() {
                return {}
            }
        }
    },

    setup(props, { emit }) {

        const dragFormsuUlBox = ref(null);

        const state = reactive({
            isPress: false, // 是否按下
            isMove: false, // 是否移动
            pressX: null, // 按下坐标x
            pressY: null, // 按下坐标Y


            currentVacancyX: null, // 当前空位坐标x
            currentVacancyY: null, // 当前空位坐标y
            cuurentIndex: undefined, // 按下的索引
            loosenIndex: undefined,

            domInfos: [], // dom的位置信息
            lists: [], // dom当前位置信息

            lastTimeIndex: null, // 上一次的占位索引
        });


        // 列表数据
        const listData = ref([...props.itemData.forms]);


        // 按钮下拉列表项
        const dropdownList = ref();


        const arr = [
            {
                id: 1,
                text: '文本框',
                type: 'input'
            },
            {
                id: 2,
                text: '性别',
                type: 'select'
            }, {
                id: 3,
                text: '国家',
                type: 'select'
            },
            {
                id: 4,
                text: '省份',
                type: 'select'
            },
            {
                id: 5,
                text: '城市',
                type: 'select'
            }, {
                id: 6,
                text: '下拉',
                type: 'select'
            },
            {
                id: 7,
                text: '二级下拉',
                type: 'select'
            },
            {
                id: 8,
                text: '三级下拉',
                type: 'select'
            },
            {
                id: 9,
                text: '电话号码',
                type: 'select'
            },
            {
                id: 10,
                text: '姓名',
                type: 'select'
            }
        ];

        // 电话类型选项
        const phoneTypeOptions = reactive({
            lits: [
                {
                    label: '电话号码',
                    id: 1
                },
                {
                    label: '手机号码',
                    id: 2
                },
                {
                    label: '电话',
                    id: 3
                },
                {
                    label: '手机',
                    id: 4
                }
            ],
        });


        // 名字类型选项
        const nameTypeOptions = reactive({
            lits: [
                {
                    label: '姓名',
                    id: 1
                },
                {
                    label: '名字',
                    id: 2
                },
                {
                    label: '昵称',
                    id: 3
                }
            ],
        });


        // 国家类型
        const countryType = reactive({
            lits: [
                {
                    label: '国家',
                    id: 1
                },
                {
                    label: '国籍',
                    id: 2
                }
            ],
        });


        // 性别类型选项
        const genderType = reactive({
            lits: [{
                label: '性别',
                id: 1
            }]
        });


        // 省份选项
        const provinceOptions = reactive({
            lits: [{
                label: '省份',
                id : 1
            }]
        });


        // 城市选项
        const cityOptions = reactive({
            lits: [{
                label: '城市',
                id : 1
            }]
        });


        onMounted(() => {
            initDomsInfo(); // 初始化dom信息
            iniDropdownList(); // 初始化下拉列表选项
        });


        // 初始化下拉列表选项
        function iniDropdownList() {

            const ids = listData.value.map((item) => { return item.id });
            const s = arr.filter((item) => {
                if (item.id === 7 && (ids.includes(7) || ids.includes(8)) || item.id === 8 && (ids.includes(7) || ids.includes(8))) {
                    return false;
                }
                return !ids.includes(item.id);
            });

            dropdownList.value = [...s];
        };


        // 点击拉下列表选项时触发 --- 添加项
        function commandChange(id) {
            const item = arr.filter((item) => { return item.id == id })[0];
            const s = getTypeSelection(item.id, item.id === 1 ? 'input' : 'select');

            listData.value.push({
                ...item,
                active: s && s.length ? s[0].id : '',
                tips: s && s.length ? s[0].label : '请输入'
            });

            iniDropdownList();

            setFinalData();
            setTimeout(initDomsInfo, 100);
        };


        // 删除表单项
        function deleteItem(id) {

            const index = listData.value.findIndex((item) => {
                return item.id == id;
            });
            listData.value.splice(index, 1);

            setFinalData();
            setTimeout(initDomsInfo, 100);
        };

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
            state.lists[state.cuurentIndex].x = state.currentVacancyX - state.domInfos[state.cuurentIndex].left;
            state.lists[state.cuurentIndex].y = state.currentVacancyY - state.domInfos[state.cuurentIndex].top;

            const cuurentIndex = state.cuurentIndex;
            const lastTimeIndex = state.lastTimeIndex;

            state.loosenIndex = state.cuurentIndex;
            state.cuurentIndex = null;
            state.pressX = null;
            state.pressY = null;
            state.currentVacancyX = 0;
            state.currentVacancyY = 0;
            state.lastTimeIndex = null;
            if (!state.isMove) {
                return
            }
            state.isMove = false;

            setTimeout(() => {
                state.lists.length = 0;
                state.loosenIndex = null;
                dataSwappingPositions(cuurentIndex, lastTimeIndex); // 进行数据调换位置
                setTimeout(initDomsInfo, 100);
            }, 250);

        };


        // 标签调换位置
        function swappingPositions() {
            const info = dragFormsuUlBox.value.getBoundingClientRect();
            const cx = state.lists[state.cuurentIndex].x + state.domInfos[state.cuurentIndex].left;
            const cy = state.lists[state.cuurentIndex].y + state.domInfos[state.cuurentIndex].top;

            for (let i = 0; i < state.domInfos.length; i++) {
                const item = state.domInfos[i];

                if ((cy > item.top) && (cy < item.top + 10) && ((cx + 200) > info.left && cx < (info.left + item.width))) {


                    // 更新目标元素位置
                    if (state.cuurentIndex < i) {


                        // 目标元素上移
                        for (let j = state.cuurentIndex + 1; j <= i; j++) {

                            state.lists[j].y = state.domInfos[j - 1].y - state.domInfos[j].y;

                        }


                        if (state.lastTimeIndex !== null && i < state.lastTimeIndex) {

                            for (let p = i + 1; p <= state.lastTimeIndex; p++) {
                                state.lists[p].y = 0;
                            }
                        }

                    } else if (state.cuurentIndex > i) {
                        // 目标元素下移
                        for (let j = i; j < state.cuurentIndex; j++) {

                            state.lists[j].y = state.domInfos[j + 1].y - state.domInfos[j].y;
                        }


                        if (state.lastTimeIndex !== null && i > state.lastTimeIndex) {

                            for (let p = state.lastTimeIndex; p < i; p++) {
                                state.lists[p].y = 0;
                            }
                        }
                    } else if (state.cuurentIndex === i) {
                        for (let p = 0; p < state.lists.length; p++) {
                            state.lists[p].y = 0;
                        }
                    }

                    state.currentVacancyY = item.top;
                    state.currentVacancyX = item.left;
                    state.lastTimeIndex = i;

                    break; // 终止循环，因为已经找到了目标位置
                }
            }
        };


        // 数据调换位置
        function dataSwappingPositions(cuurentIndex, lastTimeIndex) {
            if (cuurentIndex === lastTimeIndex) {
                return
            };

            const item = listData.value.splice(cuurentIndex, 1);
            listData.value.splice(lastTimeIndex, 0, item[0]);

        };

        // 初始化dom信息
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


        // 获取类型选项
        function getTypeSelection(id) {
            if (id == 9) {
                return phoneTypeOptions.lits;
            } else if (id == 10) {
                return nameTypeOptions.lits;
            } else if (id == 2) {
                return genderType.lits;
            } else if (id == 3) {
                return countryType.lits;
            } else if (id == 5) {
                return cityOptions.lits;
            } else if (id == 4) {
                return provinceOptions.lits;
            }
        };


        // 修改时触发
        function changeSelect(item, id) {
            const s = getTypeSelection(item.id);

            const index = s.findIndex((item1)=>{ return item1.id == id });

            item.tips = s[index].label;
            
            setFinalData();
        };


        // 修改最终数据
        function setFinalData() {
        
            mittBus.emit('setItemData', {
                ...props.itemData,

                style: {
                    ...props.itemData.style,
                },

                forms: [...listData.value]
            });
        };

        return {
            state,
            phoneTypeOptions,
            mousedown,
            dragFormsuUlBox,
            listData,
            dropdownList,
            commandChange,
            deleteItem,
            getTypeSelection,
            changeSelect
        };
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

            &.motionZ {
                z-index: 2;
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


            &:not(.press):hover {
                .location {
                    display: block;
                }

            }


            .location {
                position: absolute;
                cursor: pointer;
                top: 50%;
                transform: translateY(-50%);
                right: 60px;
                display: none;
            }
        }
    }
}
</style>