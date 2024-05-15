<template>
    <div class="cardDragArea" ref="cardDragArea">
        <div v-for="item, index in state.lists" class="cardBox" :class="{ press: state.currentActivityIndex === index }"
            :key="item.id">
            <div class="cardItem" :class="{
                motion: state.currentActivityIndex !== index,
                cancel: item.src,
                active: state.activeId === item.id
            }" @click.stop="triggerChangeEvent(item, index, false)" @mousedown="mousedown(index, $event)" :style="{
                top: state.inxis[index] && (state.inxis[index].y + 'px'),
                left: state.inxis[index] && (state.inxis[index].x + 'px'),
            }">

                <svg v-if="!item.src" class="icon" width="18" height="18" viewBox="0 0 18 18" data-interactive="false"
                    data-icon="add">
                    <path
                        d="M8.25 14.5C8.25 14.7761 8.47386 15 8.75 15H9.25C9.52614 15 9.75 14.7761 9.75 14.5V9.75H14.5C14.7761 9.75 15 9.52614 15 9.25V8.75C15 8.47386 14.7761 8.25 14.5 8.25H9.75V3.5C9.75 3.22386 9.52614 3 9.25 3H8.75C8.47386 3 8.25 3.22386 8.25 3.5V8.25H3.5C3.22386 8.25 3 8.47386 3 8.75V9.25C3 9.52614 3.22386 9.75 3.5 9.75H8.25V14.5Z"
                        fill-rule="evenodd"></path>
                </svg>

                <img v-else :src="item.src" class="cardItem_img" />


                <div v-if="item.src" class="fixed" @click.stop="triggerChangeEvent(item, index, true)">
                    <span>{{ index + 1 }}</span>
                    <svg class="adui-icon-base" width="12" height="12" viewBox="0 0 18 18" fill="#fff"
                        data-interactive="false" data-icon="replace">
                        <path
                            d="M3.5 3.5V6.5H6.5V3.5H3.5ZM16 10V16H10V10H16ZM3.5 9V10.5C3.5 11.7426 4.50736 12.75 5.75 12.75H7V11L9.75 13.5L7 16V14.25H5.75C3.67893 14.25 2 12.5711 2 10.5V9H3.5ZM14.5 11.5H11.5V14.5H14.5V11.5ZM11 2V3.75H12.25C14.3211 3.75 16 5.42893 16 7.5V9H14.5V7.5C14.5 6.25736 13.4926 5.25 12.25 5.25H11V7L8.25 4.5L11 2ZM8 2V8H2V2H8Z"
                            fill-rule="evenodd"></path>
                    </svg>
                </div>

            </div>
        </div>
    </div>

    <teleport to="#app">
        <input type="file" name="image" id="imageInput" ref="imageInput" accept="image/*" @change="uploadImages">
    </teleport>
</template>



<script setup name="CardDragArea">
import { reactive, onBeforeMount, onMounted, onUnmounted, ref, defineProps, watch } from 'vue';
import mittBus from '/@/utils/mitt'; // 事件总线

const props = defineProps({
    listNum: { // 数量
        default: 3
    },
    currentId: { // 当前选中的id
        default: null
    },
    carousel: {
        default() {
            return []
        }
    }
});

const cardDragArea = ref(null);

const imageInput = ref(null);

const state = reactive({
    isPress: false, // 鼠标按下
    pressX: null, // 按下的X坐标
    pressY: null, // 抬起的Y坐标
    lastTimeX: 0, // 上一次的X坐标
    lastTimeY: 0, // 上一次的Y坐标
    currentX: null, // 当前的X坐标
    currentY: null, // 当前的Y坐标
    currentActivityIndex: null, // 当前活动的索引
    listDomInfo: [], // 列表dom信息
    lists: [],
    surplusX: 0, // 剩余的X距离
    surplusY: 0, // 剩余的Y距离
    distancePerPosition: {}, // 每个位置的距离
    vacancyIndex: null, // 空位的索引
    isMove: false, // 是否有移动
    activeId: props.currentId, // 当前选中的id


    inxis: [],
    lastTimeIndex: null
});


// 每一项的宽高
const cardItemInfo = reactive({
    width: 73,
    height: 73
});

const motionState = reactive({
    isWhether: false, // 是否开启运动
    isPressMotion: false,
});

onBeforeMount(() => {
    setLists();
});

onMounted(() => {
    initListDomInfo();
});


// 监听数量的变化
watch(() => { return props.listNum }, () => {
    setLists();

    setTimeout(initListDomInfo, 16);

    setData();
});

// 修改图片数量
function setLists() {
    if (state.lists.length > props.listNum) {
        state.lists.splice(props.listNum);
    } else {
        for (let i = state.lists.length; i < props.listNum; i++) {
            const item = props.carousel[i];
            state.lists.push(item || { id: state.lists.length + 1 });
        }
    }


};

// 鼠标按下事件
function mousedown(index, e) {

    state.pressX = e.clientX;
    state.pressY = e.clientY;
    state.surplusY = state.pressY - state.listDomInfo[index].top;
    state.surplusX = state.pressX - state.listDomInfo[index].left;
    state.isPress = true;
    state.currentActivityIndex = index;
    state.vacancyIndex = index;
    motionState.isPressMotion = true;
    state.isMove = false;
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);

};

// 鼠标移动事件
function mousemove(e) {

    state.inxis[state.currentActivityIndex].x = e.clientX - state.pressX;
    state.inxis[state.currentActivityIndex].y = e.clientY - state.pressY;
    state.isMove = true;
    determineLocation();
};

// 鼠标抬起事件
function mouseup(event) {

    state.lastTimeX = 0; //state.currentX;
    state.lastTimeY = 0; //state.currentY;
    state.isPress = false;
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);


    if (!motionState.isWhether) {
        state.currentX = 0;
        state.currentY = 0;
    } else {
        const left = state.listDomInfo[state.vacancyIndex].x - state.listDomInfo[state.currentActivityIndex].x;
        const top = state.listDomInfo[state.vacancyIndex].y - state.listDomInfo[state.currentActivityIndex].y;
        state.currentX = left;
        state.currentY = top;
    };

    setTimeout(endEvent, 300);

};

// 获取对应的数据情况
function getCoBol(index) {

    if (index != state.currentActivityIndex) {

        return false;
    };

    return true;
};


// 初始化获取列表dom信息
function initListDomInfo() {
    state.listDomInfo.length = 0;
    state.inxis.length = 0;
    Array.from(cardDragArea.value.children).forEach((dom) => {
        state.listDomInfo.push(dom.firstChild.getBoundingClientRect());
        state.inxis.push({
            x: 0,
            y: 0
        })
    });

    state.lists.forEach((item) => { state.distancePerPosition[item.id] = { x: 0, y: 0 } });

    window.aa = state.listDomInfo;
    window.bb = state.distancePerPosition;
};


// 判断位置
function determineLocation() {

    const top = state.listDomInfo[state.currentActivityIndex].top;
    const left = state.listDomInfo[state.currentActivityIndex].left;

    const myTop = top + state.currentY;
    const myLeft = left + state.currentX;
    const myTop1 = top + cardItemInfo.height;
    const myLeft1 = left + cardItemInfo.width;

    const boxInfo = cardDragArea.value.getBoundingClientRect();

    /* let lock = false;

    if (myTop < boxInfo.top + boxInfo.height && myTop > boxInfo.top && myLeft < boxInfo.left + boxInfo.width && myLeft > boxInfo.left) {
        lock = true;
    };
 */


    for (let i = 0; i < state.listDomInfo.length; i++) {
        const item = state.listDomInfo[i];
        const heightTop = item.top + cardItemInfo.height;
        const widthLeft = item.left + cardItemInfo.width;

        if (((myLeft + state.surplusX) < widthLeft) && ((myLeft + state.surplusX) > item.left) && ((myTop + state.surplusY) < heightTop) && (myTop + state.surplusY > item.top)) {
            const bol = widthLeft - (myLeft + state.surplusX) <= cardItemInfo.width / 2;

            const myIndex = state.currentActivityIndex > i ? bol ? i + 1 : i : bol ? i : i - 1;

            console.log(myIndex)

            return
            if (state.currentActivityIndex < myIndex) {
                for (let j = state.currentActivityIndex + 1; j <= myIndex; j++) {
                    state.inxis[j].x = state.listDomInfo[j - 1].left - state.listDomInfo[j].left;
                    state.inxis[j].y = state.listDomInfo[j - 1].top - state.listDomInfo[j].top;
                }
                if (state.lastTimeIndex !== null && myIndex < state.lastTimeIndex) {

                    for (let p = myIndex + 1; p <= state.lastTimeIndex; p++) {
                        state.inxis[p].y = 0;
                        state.inxis[p].x = 0;
                    }
                }
            } else if (state.currentActivityIndex > myIndex) {
                for (let j = i; j < state.currentActivityIndex; j++) {
                    state.inxis[j].x = state.listDomInfo[j + 1].left - state.listDomInfo[j].left;
                    state.inxis[j].y = state.listDomInfo[j + 1].top - state.listDomInfo[j].top;
                }

                if (state.lastTimeIndex !== null && myIndex > state.lastTimeIndex) {

                    for (let p = state.lastTimeIndex; p < myIndex; p++) {
                        state.inxis[p].y = 0;
                        state.inxis[p].x = 0;
                    }
                }
            } else if (state.currentActivityIndex === myIndex) {
                for (let p = 0; p < state.inxis.length; p++) {
                    state.inxis[p].y = 0;
                    state.inxis[p].x = 0;
                }
            };

            // state.lastTimeIndex = myIndex;

            return
            /* motionState.isWhether = true;
          
            if (i === state.vacancyIndex) {
                continue
            }

            if (myIndex < state.vacancyIndex) {
                for (let l = myIndex; l < state.vacancyIndex; l++) {
                    const item1 = state.distancePerPosition[state.lists[l].id];
                    const x = state.listDomInfo[l + 1].left - state.listDomInfo[l].left;
                    const y = state.listDomInfo[l + 1].top - state.listDomInfo[l].top;
                    item1.x = x;
                    item1.y = y;
                }
                state.vacancyIndex = myIndex

            } else if (myIndex > state.vacancyIndex) {
                for (let l = state.vacancyIndex + 1; l < myIndex + 1; l++) {
                    const item1 = state.distancePerPosition[state.lists[l].id];
                    const x = state.listDomInfo[l - 1].left - state.listDomInfo[l].left;
                    const y = state.listDomInfo[l - 1].top - state.listDomInfo[l].top;
                    item1.x = x;
                    item1.y = y;
                }

                state.vacancyIndex = myIndex
            };
 */
        };

    };

    if (true) {
        return
    }

    /* if (myTop < top - cardItemInfo.height || myTop > myTop1 || myLeft < left - cardItemInfo.width || myLeft > myLeft1) {
        motionState.isWhether = true;
        state.vacancyIndex = 0;
        for (let i = 0; i < state.currentActivityIndex; i++) {
            const itme = state.distancePerPosition[state.lists[i].id];

            const x = state.listDomInfo[i + 1].x - state.listDomInfo[i].x;
            const y = state.listDomInfo[i + 1].y - state.listDomInfo[i].y;

            itme.x = x;
            itme.y = y;
        }
    }; */
};

// 处理对应Transform的值
function handleTransform(index) {

    if (!motionState.isWhether) {
        return null;
    };


    return `translate(${state.distancePerPosition[state.lists[index].id].x}px, ${state.distancePerPosition[state.lists[index].id].y}px)`;


};

// 结束时触发
function endEvent() {

    if (motionState.isWhether) {

        // 获取当前拖动元素的信息
        const item = state.lists[state.currentActivityIndex];

        // 计算要删除的元素索引
        const index1 = state.currentActivityIndex < state.vacancyIndex ? state.vacancyIndex + 1 : state.vacancyIndex;

        // 将拖动元素插入到新位置
        state.lists.splice(index1, 0, item);

        // 计算要删除的元素索引
        const index = state.currentActivityIndex < state.vacancyIndex ? state.currentActivityIndex : state.currentActivityIndex + 1;

        // 从原来位置删除元素
        state.lists.splice(index, 1);



    };

    state.lists.forEach((item) => { state.distancePerPosition[item.id] = { x: 0, y: 0 } });

    state.currentActivityIndex = undefined;
    state.currentX = 0;
    state.currentY = 0;
    motionState.isWhether = false;
    motionState.isPressMotion = false;
    state.vacancyIndex = null;
    setData();
};


// 触发change事件
function triggerChangeEvent(item, index, force) {

    // 判断是否选中
    if (state.lists[index].src && !state.isMove && !force) {

        state.activeId = item.id;
        setData();
        return
    } else if ((!state.lists[index].src && !state.isMove) || force) { // 判断是否是上传图片

        imageInput.value.click();
        triggerChangeEvent.index = index; // 当前索引
        triggerChangeEvent.id = item.id;  // 当前id
    }


};

// 上传图片
function uploadImages() {

    var formData = new FormData();
    var fileInput = imageInput.value;
    var file = fileInput.files[0];
    formData.append('image', file);

    // 获取临时的URL
    var imageURL = URL.createObjectURL(file);

    state.lists[triggerChangeEvent.index].src = imageURL;
    state.activeId = triggerChangeEvent.id;

    setData();

};


// 修改数据
function setData() {
    // 修改数据
    mittBus.emit('setItemData', {
        ...props.componentData,
        carousel: [...state.lists],
        currentId: state.activeId
    });
};

</script>


<style lang="scss" scoped>
.cardDragArea {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 0px 20px;
    margin-top: 16px;
    padding: 4px;
    border-radius: 6px;
    box-shadow: 0 0 0 1px rgba(223, 223, 223, 0.45);

    .cardBox {
        height: 83px;
        padding: 5px;
        position: relative;
        background-color: transparent;

        &.press {
            .cardItem {
                z-index: 1;
            }

        }


        .cardItem {
            border: 2px dashed #cacfcd;
            height: 100%;
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: border-color 0.2s;
            position: relative;
            background-color: #fff;
            overflow: hidden;

            &.cancel {
                border: none;
            }

            &.active {
                border-style: solid;
                border-width: 2px;
                border-color: #50c748;
            }

            &.motion {
                transition: all 0.3s;
            }


            .icon {
                fill: #a8b3af;
                transition: all 0.2s;
            }

            &:not(.active):hover {
                .icon {
                    fill: #7e807f;
                }

                border-color: #a5a7a6;
            }


            .cardItem_img {
                width: 100%;
                height: 100%;
            }


            .fixed {
                position: absolute;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                color: #d6d6d6;
                font-size: 11px;
                background-color: rgba(0, 0, 0, 0.6);
                top: 3px;
                right: 5px;
                display: flex;
                align-items: center;
                justify-content: center;

                span {
                    display: inline-block;
                }

                svg {
                    display: none;
                }
            }


            &:hover {
                .fixed {
                    width: 18px;
                    height: 18px;

                    span {
                        display: none;
                    }

                    svg {
                        display: block;
                    }
                }
            }

        }
    }

    /* 禁止图片被选择 */
    img {
        -webkit-user-select: none;
        /* Safari */
        -moz-user-select: none;
        /* Firefox */
        -ms-user-select: none;
        /* IE10+/Edge */
        user-select: none;
        /* Standard */
    }

    /* 禁止图片被拖动 */
    img {
        pointer-events: none;
    }
}

#imageInput {
    display: none;
}
</style>