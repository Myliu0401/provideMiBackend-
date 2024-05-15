<template>
    <div class="cardDragArea" ref="cardDragArea">
        <div v-for="item, index in state.lists" class="cardBox" :class="{ press: state.currentActivityIndex === index }"
            :key="item.id">
            <div class="cardItem" :class="{
                motion: state.currentActivityIndex !== index,
                cancel: item.src,
                active: state.activeId === item.id
            }" @click.stop="triggerChangeEvent(item, index, false)" @mousedown="mousedown(index, $event)" :style="{
                top: state.infoLists[index] && (state.infoLists[index].y + 'px'),
                left: state.infoLists[index] && (state.infoLists[index].x + 'px')
            }">

                <svg v-if="!item.src && !item.loading" class="icon" width="18" height="18" viewBox="0 0 18 18"
                    data-interactive="false" data-icon="add">
                    <path
                        d="M8.25 14.5C8.25 14.7761 8.47386 15 8.75 15H9.25C9.52614 15 9.75 14.7761 9.75 14.5V9.75H14.5C14.7761 9.75 15 9.52614 15 9.25V8.75C15 8.47386 14.7761 8.25 14.5 8.25H9.75V3.5C9.75 3.22386 9.52614 3 9.25 3H8.75C8.47386 3 8.25 3.22386 8.25 3.5V8.25H3.5C3.22386 8.25 3 8.47386 3 8.75V9.25C3 9.52614 3.22386 9.75 3.5 9.75H8.25V14.5Z"
                        fill-rule="evenodd"></path>
                </svg>

                <img v-if="item.src" :src="item.src" class="cardItem_img" />

                <el-icon v-if="item.loading" class="loading" size="20"><ele-Loading /></el-icon>


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
        <input type="file" name="image" id="imageInput" ref="imageInput" accept="image/*" @change="myUploadImages">
    </teleport>
</template>



<script setup name="CardDragArea">
import { reactive, onBeforeMount, onMounted, onUnmounted, ref, defineProps, watch } from 'vue';
import { uploadImages } from '/@/api/singlePage/index.js';
import { ElMessage, ElMessageBox } from 'element-plus';
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
    currentX: null, // 当前的X坐标
    currentY: null, // 当前的Y坐标
    currentActivityIndex: null, // 当前活动的索引
    listDomInfo: [], // 列表dom信息
    lists: [], // 图片列表数量
    distancePerPosition: {}, // 每个位置的距离

    isMove: false, // 是否有移动
    activeId: props.currentId, // 当前选中的id


    infoLists: [], // dom位置
    lastTimeIndex: null
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
            state.lists.push(item || { id: Math.random().toString(36).slice(3), loading: false });
        }
    }


};

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

    if (!state.isPress) {
        return
    };
    state.infoLists[state.currentActivityIndex].x = e.clientX - state.pressX;
    state.infoLists[state.currentActivityIndex].y = e.clientY - state.pressY;
    state.currentX = e.clientX;
    state.currentY = e.clientY;
    state.isMove = true;
    determineLocation();
};

// 鼠标抬起事件
function mouseup(event) {

    const startIndex = state.currentActivityIndex;
    const endIndex = state.lastTimeIndex;

    state.isPress = false;
    state.pressX = 0;
    state.pressY = 0;
    state.currentActivityIndex = null;
    state.lastTimeIndex = null;
    if (!state.isMove) {
        return
    }
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);
    state.infoLists[startIndex].x = state.listDomInfo[endIndex].x - state.listDomInfo[startIndex].x;
    state.infoLists[startIndex].y = state.listDomInfo[endIndex].y - state.listDomInfo[startIndex].y;
    setTimeout(() => {
        state.isMove = false;
        state.infoLists.length = 0;
        exchangeData(startIndex, endIndex);
        setTimeout(initListDomInfo, 100);
    }, 300);


};


// 初始化获取列表dom信息
function initListDomInfo() {
    state.listDomInfo.length = 0;
    state.infoLists.length = 0;
    Array.from(cardDragArea.value.children).forEach((dom) => {
        state.listDomInfo.push(dom.firstChild.getBoundingClientRect());
        state.infoLists.push({
            x: 0,
            y: 0
        });
    });
};


// 判断位置
function determineLocation() {

    const myTop = state.currentY;
    const myLeft = state.currentX;


    for (let i = 0; i < state.listDomInfo.length; i++) {
        const item = state.listDomInfo[i];
        const heightTop = item.top + item.height;
        const widthLeft = item.left + item.width;

        if (myLeft < widthLeft && myLeft > item.left && myTop < heightTop && myTop > item.top) {

            if (state.currentActivityIndex < i) {
                for (let j = state.currentActivityIndex + 1; j <= i; j++) {
                    state.infoLists[j].y = state.listDomInfo[j - 1].top - state.listDomInfo[j].top;
                    state.infoLists[j].x = state.listDomInfo[j - 1].left - state.listDomInfo[j].left;
                }
                if (state.lastTimeIndex !== null && state.lastTimeIndex > i) {
                    for (let j = i + 1; j <= state.lastTimeIndex; j++) {
                        state.infoLists[j].y = 0;
                        state.infoLists[j].x = 0;
                    }
                }
            } else if (state.currentActivityIndex > i) {
                for (let j = i; j < state.currentActivityIndex; j++) {
                    state.infoLists[j].y = state.listDomInfo[j + 1].top - state.listDomInfo[j].top;
                    state.infoLists[j].x = state.listDomInfo[j + 1].left - state.listDomInfo[j].left;
                }
                if (state.lastTimeIndex !== null && state.lastTimeIndex < i) {
                    for (let j = state.lastTimeIndex; j <= i; j++) {
                        state.infoLists[j].y = 0;
                        state.infoLists[j].x = 0;
                    }
                }
            } else if (state.currentActivityIndex === i) {
                for (let j = 0; j < state.infoLists.length; j++) {
                    if (j !== state.currentActivityIndex) {
                        state.infoLists[j].y = 0;
                        state.infoLists[j].x = 0;
                    }
                }
            }

            state.lastTimeIndex = i;

            return;
        }

    };




};


// 调换数据
function exchangeData(startIndex, endIndex) {
    if (startIndex === endIndex) {
        return
    };

    const item = state.lists.splice(startIndex, 1);
    state.lists.splice(endIndex, 0, item[0]);
};


// 触发change事件
function triggerChangeEvent(item, index, force) {


    // 判断是否选中
    if (state.lists[index].src && !state.isMove && !force) {

        state.activeId = item.id;
        setData();
        return
    } else if ((!state.lists[index].src && !state.isMove) || force) { // 判断是否是上传图片

        if (state.lists[index].loading) {
            return
        }

        imageInput.value.click();
        triggerChangeEvent.index = index; // 当前索引
        triggerChangeEvent.id = item.id;  // 当前id
    }


};

// 上传图片
async function myUploadImages() {

    var formData = new FormData();
    var fileInput = imageInput.value;
    var file = fileInput.files[0];
    formData.append('file', file);
    formData.append('path', 'image');

    // 获取临时的URL
    //var imageURL = URL.createObjectURL(file);
    let res = null
    state.lists[triggerChangeEvent.index].loading = true;
    try {
        res = await uploadImages(formData);
    } catch (err) {
        state.lists[triggerChangeEvent.index].loading = false;
        /* ElMessage({
            message: err.response.data.message,
            type: 'warning',
        }); */
        return
    }
    state.lists[triggerChangeEvent.index].loading = false;
    state.lists[triggerChangeEvent.index].src = res.data.url;
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
    -webkit-user-select: none;
    /* Chrome, Safari, Opera */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;

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


            .loading {
                position: absolute;

                animation: rotate360 2s linear infinite;
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


@keyframes rotate360 {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>