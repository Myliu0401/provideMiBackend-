<template>
    <div class="cardDragArea" ref="cardDragArea">
        <div v-for="item, index in state.lists" class="cardBox" :class="{ press: state.currentActivityIndex === index }"
            :key="item.id">
            <div class="cardItem"
                :class="{ motion: state.currentActivityIndex == index ? !state.isPress : motionState.isPressMotion }"
                @mousedown="mousedown(index, $event)" :style="{
                    top: getCoBol(index) ? (state.currentY + 'px') : null,
                    left: getCoBol(index) ? (state.currentX + 'px') : null,
                    transform: handleTransform(index)
                }">
                <svg class="icon" width="18" height="18" viewBox="0 0 18 18" data-interactive="false" data-icon="add">
                    <path
                        d="M8.25 14.5C8.25 14.7761 8.47386 15 8.75 15H9.25C9.52614 15 9.75 14.7761 9.75 14.5V9.75H14.5C14.7761 9.75 15 9.52614 15 9.25V8.75C15 8.47386 14.7761 8.25 14.5 8.25H9.75V3.5C9.75 3.22386 9.52614 3 9.25 3H8.75C8.47386 3 8.25 3.22386 8.25 3.5V8.25H3.5C3.22386 8.25 3 8.47386 3 8.75V9.25C3 9.52614 3.22386 9.75 3.5 9.75H8.25V14.5Z"
                        fill-rule="evenodd"></path>
                </svg>
            </div>
        </div>
    </div>
</template>



<script setup name="CardDragArea">
import { reactive, onMounted, onUnmounted, ref } from 'vue';

const cardDragArea = ref(null);

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
    lists: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    surplusX: 0, // 剩余的X距离
    surplusY: 0, // 剩余的Y距离
    distancePerPosition: {}, // 每个位置的距离
    vacancyIndex: null, // 空位的索引
});

const cardItemInfo = reactive({
    width: 73,
    height: 73
});

const motionState = reactive({
    isWhether: false, // 是否开启运动
    isPressMotion: false,
});

onMounted(() => {
    initListDomInfo();
});


// 鼠标按下事件
function mousedown(index, e) {
    state.pressX = e.clientX;
    state.pressY = e.clientY;
    state.surplusY = state.pressY - state.listDomInfo[index].top;
    state.surplusX = state.pressX - state.listDomInfo[index].left;
    state.isPress = true;
    state.currentActivityIndex = index;
    motionState.isPressMotion = true;
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);

};

// 鼠标移动事件
function mousemove(e) {

    state.currentX = (e.clientX - state.pressX) + state.lastTimeX;
    state.currentY = (e.clientY - state.pressY) + state.lastTimeY;
    determineLocation();
};

// 鼠标抬起事件
function mouseup() {
    state.lastTimeX = 0; //state.currentX;
    state.lastTimeY = 0; //state.currentY;
    state.isPress = false;
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);

    if (!motionState.isWhether) {
        state.currentX = 0;
        state.currentY = 0;
    } else {
        const left = state.listDomInfo[state.vacancyIndex].x  -  state.listDomInfo[state.currentActivityIndex].x;
        const top = (state.currentActivityIndex) * (cardItemInfo.height + 10);
        state.currentX = left;
        state.currentY = -0;
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
    Array.from(cardDragArea.value.children).forEach((dom) => {
        state.listDomInfo.push(dom.firstChild.getBoundingClientRect());
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

    const domInfos = Array.from(cardDragArea.value.children).map((dom) => { return dom.firstChild.getBoundingClientRect() })

    for (let i = 0; i < domInfos.length; i++) {
        const item = domInfos[i];
        const heightTop = item.top + cardItemInfo.height;
        const widthLeft = item.left + cardItemInfo.width;
        if (i == state.currentActivityIndex) {
            continue;
        };
        if (((myLeft + state.surplusX) < widthLeft) && ((myLeft + state.surplusX) > item.left) && ((myTop + state.surplusY) < heightTop) && (myTop + state.surplusY > item.top)) {
            const bol = widthLeft - (myLeft + state.surplusX) <= cardItemInfo.width / 2;
        
            state.vacancyIndex = state.currentActivityIndex > i ? bol ? i + 1 : i : bol ? i : i - 1;
            
            for (let l = 0; l < state.vacancyIndex; l++) {
                if (state.distancePerPosition[state.lists[l].id].x > 0) {
                    state.distancePerPosition[state.lists[l].id].x -= (cardItemInfo.width + 10);
                }
            }
            return
        };
    };

    if (myTop < top - cardItemInfo.height || myTop > myTop1 || myLeft < left - cardItemInfo.width || myLeft > myLeft1) {
        motionState.isWhether = true;
        state.vacancyIndex = 0;
        for (let i = 0; i < state.currentActivityIndex; i++) {
            if (state.distancePerPosition[state.lists[i].id].x <= 0) {
                state.distancePerPosition[state.lists[i].id].x += (cardItemInfo.width + 10);
            }

        }
    };
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
        const item = state.lists[state.currentActivityIndex];
        state.lists.splice(state.currentActivityIndex, 1);
        state.lists.unshift(item);
    };

    state.lists.forEach((item) => { state.distancePerPosition[item.id] = { x: 0, y: 0 } });

    state.currentActivityIndex = undefined;
    state.currentX = 0;
    state.currentY = 0;
    motionState.isWhether = false;
    motionState.isPressMotion = false;

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

            &.active {
                border-color: #50c748;
            }

            &.motion {
                transition: all 0.3s;
            }


            .icon {
                fill: #a8b3af;
                transition: all 0.2s;
            }

            &:hover {
                .icon {
                    fill: #7e807f;
                }

                border-color: #a5a7a6;
            }

        }
    }

}
</style>