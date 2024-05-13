<template>
    <div class="original" :style="{ 
        paddingTop: itemData.style.paddingTop + 'px',  
        paddingBottom: itemData.style.paddingBottom + 'px'
    }">
        <div class="listArea">
            <input type="text" placeholder="姓名" class="input" disabled/>
        </div>
    </div>
</template>



<script>
export default {
    props: {
        itemData: {
            default() {
                return {}
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.original {
    padding: 0px 30px;

    .listArea {
        .input {
            font-size: 16px;
            height: 44px;
            border-radius: 4px;
            background: rgba(0, 0, 0, 0.05);
            width: 100%;
            outline: none;
            color: #222222;
            box-sizing: border-box;
            border: none;
            padding: 0px 12px;
            margin-bottom: 10px;
        }
    }
}
</style>