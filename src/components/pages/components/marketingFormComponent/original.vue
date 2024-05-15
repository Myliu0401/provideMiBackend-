<template>
    <div class="original" :style="{
        paddingTop: itemData.style.paddingTop + 'px',
        paddingBottom: itemData.style.paddingBottom + 'px'
    }">
        <div class="listArea" v-for="item in itemData.forms" :key="item.id">
            <div type="text" class="input" disabled>{{ item.tips }}</div>
        </div>

        <div class="promptTtem">
            <div class="promptTtem_icon">
                <el-icon size="9" color="#fff"><ele-Select /></el-icon>
            </div>
            <p class="promptTtem_p">已阅读并同意《个人信息及隐私保护条款》</p>

        </div>


        <div class="promptButton">
            <button class="button" :style="{
                color: itemData.style.color,
                backgroundColor: itemData.style.backgroundColor,
                border: `2px solid ${itemData.style.borderColor}`
            }">{{ itemData.buttonText }}</button>
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
            display: flex;
            align-items: center;
            color: #afafaf;
        }
    }


    .promptTtem {
        display: flex;
        align-items: center;


        .promptTtem_icon {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #a1a1a1;
        }

        .promptTtem_p {
            margin-left: 10px;
            color: #777;
            font-size: 13px;
        }
    }


    .promptButton {
        margin-top: 20px;

        .button {
            outline: none;
            border: none;
            background-color: transparent;
            height: 40px;
            display: flex;
            border-radius: 4px;
            width: 100%;
            cursor: pointer;
            align-items: center;
            justify-content: center;

        }


    }
}
</style>