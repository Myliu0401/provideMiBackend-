<template>
    <div class="leftZone">
        <div class="titleBox">
            组件选择区
        </div>

        <div class="leftZone_content">
            <div class="itemBox">
                <div class="itemBoxTitle">顶部组件</div>
                <ul class="itemBox_ul">
                    <li class="ul_li" :class="{ down: state.downId === item.id }" v-for="item in topComState.components" :key="item.id" @mousedown="mousedown(item.id)">
                        <component :is="item.name" />
                        <span>{{ item.text }}</span>
                    </li>
                </ul>
            </div>

            <div class="itemBox">
                <div class="itemBoxTitle">基础组件</div>
                <ul class="itemBox_ul">
                    <li class="ul_li" :class="{ down: state.downId === item.id }" v-for="item in basisComState.components" :key="item.id" @mousedown="mousedown(item.id)">
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

export default {

    components: { TopImgIcon, TopCarouselIcon, BasisImgIcon },

    setup(props, { emit }) {

        const state = reactive({
            downId: null, // 当前鼠标按下的id
        });

          // 顶部组件的数据
          const topComState = reactive({
                components: [
                    {
                        text: '图片',
                        name: 'TopImgIcon',
                        id: Math.random().toString(36).slice(3)
                    },
                    {
                        text: '轮播图',
                        name: 'TopCarouselIcon',
                        id: Math.random().toString(36).slice(3)
                    }
                ],
          }); 


          const basisComState = reactive({
              components: [
                {
                    text: '图片',
                    name: 'BasisImgIcon',
                    id: Math.random().toString(36).slice(3)
                }
              ]
          });



          // 鼠标按下事件
          function mousedown(id){
              state.downId = id;
              window.addEventListener('mouseup', mouseup);
          };

          // 鼠标抬起事件
          function mouseup(){
              state.downId = null; 
          };


          return { state, topComState, basisComState, mousedown, mouseup };
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

                    &:hover {
                        z-index: 1;
                        background-color: #FDFDFD;
                        box-shadow: 0 0 0 1px #D6D6D6;
                    }

                    &.down{
                        z-index: 1;
                       // margin: 1px;
                        transform: translateY(-2px);
                        background-color: #FDFDFD;
                        box-shadow: 0 0 0 1px #D6D6D6;
                        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05), 0 5px 10px 0 rgba(0, 0, 0, 0.15), 0 0 0 1px #e0e0e0;
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