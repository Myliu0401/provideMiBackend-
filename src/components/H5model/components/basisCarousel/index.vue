<template>
    <div class="basisCarousel">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in props.itemData.carousel" :key="item.id">
                <img class="" style="width: 100%;" :src="item.src" />
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>



<script name="topCarouselComponent" setup>
import { reactive, onMounted, onUnmounted, ref, defineProps } from 'vue';

const props = defineProps({
    itemData: {
        default() {
            return {

            }
        }
    }
});


const state = reactive({
    mySwiper: null, // 实例 
});


onMounted(() => {
    initBasisCarousel();
});


// 初始化轮播图
function initBasisCarousel() {
    state.mySwiper = new Swiper('.basisCarousel', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: true,
        delay: 2000,

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
    });
};



</script>



<style lang="scss" scoped>
@import './index.scss';
</style>

<style lang="scss">
@import './index.scss';
</style>