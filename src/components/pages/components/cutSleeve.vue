<template>
    <div class="cutSleeve" :class="{ 
        active: id === activeId, 
        disabled: disabled, 
        sideFixing: componentName === 'marketingSideFloatingComponent' 
    }" @click.stop="switchSelection">
        <slot></slot>
        <DeleteBox :id="id" />
    </div>
</template>



<script>
import DeleteBox from './deleteBox.vue';
import { reactive, onMounted, onUnmounted, ref } from 'vue';
import mittBus from '/@/utils/mitt'; // 事件总线

export default {

    components: { DeleteBox },

    props: {
        // 选中的id
        activeId: {
            default: null
        },

        // 该项的id
        id: {
            default: null
        },

        // 是否进行操作
        disabled: {
            default: false
        },


        // 组件名
        componentName: {
            default: ''
        }
    },

    setup(props, { emit }) {

        // 切换选中
        function switchSelection() {
            mittBus.emit('switchCurrentActive', props.id); // 通知事件
        };

        return { switchSelection };
    }
}
</script>


<style lang="scss" scoped>
.cutSleeve {
    position: relative;

    &:not(.disabled):hover {
       

        .deleteBox {
            display: flex;
        }
    }

    &:not(.active):hover {
        box-shadow: 0 0 0 1px #07c160;
        z-index: 1;
    }

    &.active {
        box-shadow: 0 0 0 2px #07c160;
        z-index: 1;
    }


    &.sideFixing{
         position: absolute;
         right: 0px;
         bottom: 100px;
         z-index: 111;


         &:hover{
            z-index: 111;
         }
    }
}
</style>