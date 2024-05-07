<template>
    <Original v-if="!thereDetermine()" :itemData="props.itemData"/>
    <Effect v-else :itemData="props.itemData"/>
</template>



<script setup name="topCarouselComponent">
import { reactive, onMounted, onUnmounted, ref, defineProps } from 'vue';
import Original from './original.vue';
import Effect from './effect.vue';

const props = defineProps({
    itemData: {
        default(){
            return {}
        }
    }
});


// 判断是否有数据
function thereDetermine(){
      for(let i = 0; i < props.itemData.carousel.length; i++){
          const item = props.itemData.carousel[i];
          if(item.src){
              return true
          }
      }

      return false;
};



</script>


<style lang="scss" scoped></style>