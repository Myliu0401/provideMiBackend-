<template>
    <div class="cutSleeve" :class="{ active: id === activeId }" @click.stop="switchSelection">
        <slot></slot>
        <DeleteBox :id="id"/>
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
        }
    },

    setup(props, { emit }){

        // 切换选中
        function switchSelection(){
            mittBus.emit('switchCurrentActive', props.id); // 通知事件
        };

        return { switchSelection };
    }
}
</script>


<style lang="scss" scoped>
.cutSleeve{
    position: relative;

    &:hover {
        box-shadow: 0 0 0 1px #07c160;
        z-index: 1;
        .deleteBox {
            display: flex;
        }
    }

    &.active {
        box-shadow: 0 0 0 2px #07c160;
        z-index: 1;
    }
}
</style>