<template>
    <div class="deleteBox" @click.stop="">
        <div class="deleteBox_delete">
            <el-icon class="is-loading" @click.stop="deleteItem">
                <ele-Delete />
            </el-icon>
        </div>
    </div>
</template>



<script>
import { reactive, onMounted, onUnmounted, ref } from 'vue';
import mittBus from '/@/utils/mitt'; // 事件总线

export default {

    props: {
       id: {
          default: null
       }
    },

    setup(props, { emit }) {

        // 删除
        function deleteItem(){
            mittBus.emit('deleteItem', props.id); // 触发事件
        };


        return { deleteItem }

    }
}
</script>


<style lang="scss" scoped>
.deleteBox {
    background-color: #fff;
    border-radius: 0 6px 6px 0;
    box-shadow: 0px 0px 0px 1px rgba(223, 223, 223, 0.2), 0px 3px 6px 0px rgba(0, 0, 0, 0.04);
    width: 34px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    right: -34px;
    display: none;

    .el-icon {
        animation: none;
    }


    .deleteBox_delete {
        padding: 4px;
        border-radius: 4px;
        transition: all 0.2s;
        cursor: pointer;

        &:hover {
            background-color: #555;

            .el-icon {
                color: #fff;
            }
        }
    }
}
</style>