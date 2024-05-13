<template>
    <div class="rightZone">
        <component :is="componentName" :componentData="componentData"/>
    </div>
</template>


<script>
import TopImgComponent from '../components/topImgComponent/setDataComp.vue';
import TopCarouselComponent from '../components/topCarouselComponent/setDataComp.vue';
import BasisImgComponent from '../components/basisImgComponent/setDataComp.vue';
import BasisCarouselComponent from '../components/basisCarouselComponent/setDataComp.vue';
import BasisTextComponent from '../components/basisTextComponent/setDataComp.vue';
import ConvJumpLinkComponent from '../components/convJumpLinkComponent/setDataComp.vue';
import BasisBusinessCardComponent from '../components/basisBusinessCardComponent/setDataComp.vue';
import MarketingFormComponent from '../components/marketingFormComponent/setDataComp.vue';


export default {

    components: { 
        TopImgComponent, 
        BasisImgComponent, 
        BasisCarouselComponent, 
        BasisTextComponent, 
        TopCarouselComponent, 
        ConvJumpLinkComponent,
        BasisBusinessCardComponent,
        MarketingFormComponent
    },

    props: {

        // 当前选中的组件名
        componentName: {
            default: ''
        },


        // 当前选中的组件数据
        componentData: {
            default(){
                return {}
            }
        }
    },

    setup() {



        return {

        }
    }
}
</script>


<style lang="scss" scoped>
.rightZone {
    width: 380px;
    height: calc(100vh - 42px);
    //overflow: auto;
    background-color: #fff;
    box-shadow: 0 0 3px 0 rgba(223, 223, 223, 0.65);
}
</style>