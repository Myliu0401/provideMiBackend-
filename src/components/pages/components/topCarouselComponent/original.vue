<template>
    <div class="original">
        <svg width="56" height="56" viewBox="0 0 28 28"><defs><linearGradient x1="50%" y1="99.707%" x2="50%" y2="5.583%" id="a"><stop stop-color="#999" offset="0%"></stop><stop stop-color="#737373" offset="100%"></stop></linearGradient></defs><path d="M19.5 6A2.5 2.5 0 0122 8.5v11a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 016 19.5v-11A2.5 2.5 0 018.5 6h11zm-3.905 8.082l-.099.08-4.22 3.881a.5.5 0 01-.567.077l-.076-.048-2.731-2.086a.25.25 0 00-.395.142l-.007.057V19.5a1 1 0 00.883.993l.117.007h11a1 1 0 00.993-.883l.007-.117v-1.82a.5.5 0 00-.107-.31l-.058-.061-3.492-3.153a1 1 0 00-1.248-.074zM24 9a2 2 0 012 2v6a2 2 0 01-2 2h-1v-1.5h1a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5h-1V9h1zM5 9v1.5H4a.5.5 0 00-.5.5v6a.5.5 0 00.5.5h1V19H4a2 2 0 01-2-2v-6a2 2 0 012-2h1zm6 .5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="url(#a)" fill-rule="nonzero"></path></svg>
        <div class="spotBox">
            <ul class="spotBox_ul">
                <li v-for="item in itemData.carousel" :key="item.id" class="spot" :class="{ active: item.id === itemData.currentId }"></li>
            </ul>
        </div>
   </div>
</template>


<script>

export default {
    props: {
        itemData: {
            default() {
                return {

                }
            }
        }
    },
    setup(props, { emit }){
       // console.log(props.itemData, '======')
    }
}

</script>


<style lang="scss" scoped>
.original{
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 222px;
   background-color: #f7f7f7;


   .spotBox{
       position: absolute;
       bottom: 10px;
       left: 50%;
       transform: translateX(-50%);
       .spotBox_ul{
           display: flex;
           justify-content: center;
           align-items: center;
           .spot{
              width: 6px;
              height: 6px;
              border-radius: 3px;
              background-color: rgba(0, 0, 0, 0.15);
              list-style: none;
              margin: 0px 4px;

              &.active{
                background-color: rgba(0, 0, 0, 0.5);
              }
           }
       }
   }
}
</style>