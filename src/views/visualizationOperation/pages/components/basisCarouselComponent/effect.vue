<template>
    <div class="effect">
        <img class="displayImage" :src="selectedItem.src" />
        <div class="spotBox">
            <ul class="spotBox_ul">
                <li v-for="item in itemData.carousel" :key="item.id" class="spot"
                    :class="{ active: item.id === itemData.currentId }"></li>
            </ul>
        </div>
    </div>
</template>




<script setup>
import { reactive, onMounted, onUnmounted, ref, defineProps, computed } from 'vue';
const props = defineProps({
    itemData: {
        default() {
            return {

            }
        }
    }
});


// 当前选中项
const selectedItem = computed(() => {
    const item = props.itemData.carousel.filter((item) => {
        return item.id === props.itemData.currentId;
    })[0];

    return item;
});


</script>


<style lang="scss" scoped>
.effect {

    .displayImage{
        width: 100%;
    }

    .spotBox {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);

        .spotBox_ul {
            display: flex;
            justify-content: center;
            align-items: center;

            .spot {
                width: 6px;
                height: 6px;
                border-radius: 3px;
                background-color: rgba(0, 0, 0, 0.15);
                list-style: none;
                margin: 0px 4px;

                &.active {
                    background-color: rgba(0, 0, 0, 0.5);
                }
            }
        }
    }
}
</style>