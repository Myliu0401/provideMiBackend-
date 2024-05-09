<template>
    <div class="leftZone">
        <div class="titleBox">
            组件选择区
        </div>

        <div class="leftZone_content">
            <div class="itemBox">
                <div class="itemBoxTitle">顶部组件</div>
                <ul class="itemBox_ul">
                    <li class="ul_li" :class="{ down: state.downId === item.id, disabled: isAllDisabled }"
                        v-for="item in topComState.components" :key="item.id" @mousedown="mousedown(item.id)"
                        @click.stop="addComponent(item)">
                        <component :is="item.name" />
                        <span>{{ item.text }}</span>
                    </li>
                </ul>
            </div>

            <div class="itemBox">
                <div class="itemBoxTitle">基础组件</div>
                <ul class="itemBox_ul">
                    <li class="ul_li" :class="{ down: state.downId === item.id, disabled: isAllDisabled }"
                        v-for="item in basisComState.components" :key="item.id" @mousedown="mousedown(item.id)"
                        @click.stop="addComponent(item)">
                        <component :is="item.name" />
                        <span>{{ item.text }}</span>
                    </li>
                </ul>
            </div>

            <div class="itemBox">
                <div class="itemBoxTitle">转换按钮</div>
                <ul class="itemBox_ul">
                    <li class="ul_li" :class="{ down: state.downId === item.id, disabled: isAllDisabled }"
                        v-for="item in convButtonState.components" :key="item.id" @mousedown="mousedown(item.id)"
                        @click.stop="addComponent(item)">
                        <component :is="item.name" />
                        <span>{{ item.text }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>



<script>
import { reactive, onMounted, onUnmounted, ref } from 'vue';
import TopImgIcon from './components/TopImgIcon.vue';
import TopCarouselIcon from './components/TopCarouselIcon.vue';
import BasisImgIcon from './components/BasisImgIcon.vue';
import BasisCarouselIcon from './components/BasisCarouselIcon.vue';
import BasisTextIcon from './components/BasisTextIcon.vue';
import ConvJumpLinkIocn from './components/ConvJumpLinkIocn.vue';
import mittBus from '/@/utils/mitt'; // 事件总线



export default {

    components: { TopImgIcon, TopCarouselIcon, BasisImgIcon, BasisCarouselIcon, BasisTextIcon, ConvJumpLinkIocn },

    props: {

        // 是否所有选项都禁用
        isAllDisabled: {
            default: false
        }
    },

    setup(props, { emit }) {

        const state = reactive({
            downId: null, // 当前鼠标按下的id
            isMove: false, // 是否有移动
        });

        // 顶部组件的数据
        const topComState = reactive({
            components: [
                {
                    text: '图片',
                    name: 'TopImgIcon',
                    id: Math.random().toString(36).slice(3),

                    // 创建原始数据
                    createRawData() {
                        return {
                            componentName: 'topImgComponent', // 组件名称
                            id: Math.random().toString(36).slice(3), // 数据为唯一id
                            data: {
                                imgSrc: ''
                            }

                        }
                    }
                },
                {
                    text: '轮播图',
                    name: 'TopCarouselIcon',
                    id: Math.random().toString(36).slice(3),
                    createRawData() {
                        return {
                            componentName: 'topCarouselComponent',
                            id: Math.random().toString(36).slice(3),
                            data: {
                                carousel: [{ id: 1 }, { id: 2 }, { id: 3 }],
                                currentId: null, // 当前选中的id
                            }

                        }
                    }
                }
            ],
        });


        const basisComState = reactive({
            components: [
                {
                    text: '图片',
                    name: 'BasisImgIcon',
                    id: Math.random().toString(36).slice(3),
                    createRawData() {
                        return {
                            componentName: 'basisImgComponent',
                            id: Math.random().toString(36).slice(3), // 数据为唯一id
                            data: {
                                imgSrc: '',
                                style: {
                                    marginTop: 0,
                                    marginBottom: 0
                                }
                            }

                        }
                    }
                },
                {
                    text: '轮播图',
                    name: 'BasisCarouselIcon',
                    id: Math.random().toString(36).slice(3),
                    createRawData() {
                        return {
                            componentName: 'basisCarouselComponent',
                            id: Math.random().toString(36).slice(3),
                            data: {
                                carousel: [{ id: 1 }, { id: 2 }, { id: 3 }],
                                currentId: null, // 当前选中的id
                            }

                        }
                    }
                },
                {
                    text: '文本',
                    name: 'BasisTextIcon',
                    id: Math.random().toString(36).slice(3),
                    createRawData() {
                        return {
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

                        }
                    }
                }
            ]
        });


        const convButtonState = reactive({
            components: [
                {
                    text: '跳转连接',
                    name: 'ConvJumpLinkIocn',
                    id: Math.random().toString(36).slice(3),
                    createRawData() {
                        return {
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

                        }
                    }
                }
            ]
        });



        // 鼠标按下事件
        function mousedown(id) {
            if (props.isAllDisabled) {
                return
            }
            state.downId = id;
            window.addEventListener('mouseup', mouseup);
        };

        // 鼠标抬起事件
        function mouseup() {
            state.downId = null;
        };


        // 添加组件
        function addComponent(item) {
            if (props.isAllDisabled) {
                return
            }
            mittBus.emit('addItem', { parentIndex: 0, childIndex: null, itemAllComData: item.createRawData() });
        };


        return { state, topComState, basisComState, convButtonState, mousedown, mouseup, addComponent };
    }
}
</script>



<style lang="scss" scoped>
.leftZone {
    width: 306px;
    height: 100%;
    overflow: auto;
    background-color: #fff;
    box-shadow: 1px 0 0 0 rgba(223, 223, 223, 0.65);
    user-select: none;


    .titleBox {
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        box-shadow: 2px 0px 2px #6f6868;
    }


    .leftZone_content {
        height: calc(100vh - 77px);
        overflow: auto;


        .itemBox {
            margin: 25px 0px;

            .itemBoxTitle {
                margin: 0px 25px;

            }

            .itemBox_ul {
                padding: 0px;
                margin: 0px;
                margin-top: 10px;
                padding: 0px 25px;
                display: flex;
                flex-wrap: wrap;

                .ul_li {
                    width: 80px;
                    height: 80px;
                    color: #525252;
                    font-size: 12px;
                    box-shadow: 0 0 0 1px #f3f3f3;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    position: relative;
                    margin-top: 1px;
                    margin-right: 1px;
                    transition: transform 0.2s;

                    &:not(.disabled):hover {
                        z-index: 1;
                        background-color: #FDFDFD;
                        box-shadow: 0 0 0 1px #D6D6D6;
                    }

                    &.down {
                        z-index: 1;
                        // margin: 1px;
                        transform: translateY(-2px);
                        background-color: #FDFDFD;
                        box-shadow: 0 0 0 1px #D6D6D6;
                        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05), 0 5px 10px 0 rgba(0, 0, 0, 0.15), 0 0 0 1px #e0e0e0;
                    }


                    &.disabled {
                        cursor: default;

                        span {
                            opacity: 0.3;
                        }

                        svg {
                            opacity: 0.3;
                        }
                    }
                }
            }
        }
    }
}


@media (max-width: 1439px) {
    .leftZone {
        width: 220px;
    }
}
</style>