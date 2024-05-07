<template>
    <div class="effect">
          <div class="textarea">{{ itemData.text }}</div>
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



</script>


<style lang="scss" scoped>
.effect{
    .textarea{

    }
}
</style>