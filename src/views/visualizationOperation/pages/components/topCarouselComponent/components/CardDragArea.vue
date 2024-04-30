<template>
    <div class="cardDragArea">
        <div class="cardBox" v-for="index in 6" :key="index" @mousedown="mousedown(index, $event)" 
           :style="{ top: getCoBol(index) && state.currentY + 'px', left: getCoBol(index) && state.currentX + 'px' }"
        
        >
            <div class="cardItem">
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

const state = reactive({
    isPress: false, // 鼠标按下
    pressX: null, // 按下的X坐标
    pressY: null, // 抬起的Y坐标
    lastTimeX: 0, // 上一次的X坐标
    lastTimeY: 0, // 上一次的Y坐标
    currentX: null, // 当前的X坐标
    currentY: null, // 当前的Y坐标
    currentActivityIndex: null, // 当前活动的索引
});


// 鼠标按下事件
function mousedown(index, e) {
    state.pressX = e.clientX;
    state.pressY = e.clientY;
    state.isPress = true;
    state.currentActivityIndex = index;
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);
};

// 鼠标移动事件
function mousemove(e) {
    state.currentX = (e.clientX - state.pressX) + state.lastTimeX;
    state.currentY = (e.clientY - state.pressY) + state.lastTimeY;
    //console.log(state.currentX, state.currentY)
};

// 鼠标抬起事件
function mouseup() {
    state.lastTimeX = state.currentX;
    state.lastTimeY = state.currentY;
    state.isPress = false;
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);
};

// 获取对应的数据情况
function getCoBol(index){
    
    if(index != state.currentActivityIndex){
        return false;
    };
    return true;
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

        &.active {
            border-color: #50c748;
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
</style>