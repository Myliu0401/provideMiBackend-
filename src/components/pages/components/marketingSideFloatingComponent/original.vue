<template>
    <div class="original">
        <div class="iconBox" :style="{ backgroundColor: itemData.style.backgroundColor }">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" :fill="itemData.style.color">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M14.14 23.7391C20.7895 23.7391 26.18 19.0517 26.18 13.2696C26.18 7.48739 20.7895 2.8 14.14 2.8C7.49047 2.8 2.09998 7.48739 2.09998 13.2696C2.09998 15.1765 2.68629 16.9644 3.71071 18.5043C4.19613 19.234 3.68824 20.331 3.25273 21.2717C2.90717 22.0181 2.60718 22.666 2.88519 22.9539C3.29677 23.3801 3.78026 23.2157 4.52413 22.9627L4.52415 22.9627C5.19944 22.7331 6.08931 22.4304 7.33476 22.4304C8.26476 22.4304 8.7561 22.636 9.06047 22.7634L9.06049 22.7634C9.09876 22.7794 9.13407 22.7942 9.16693 22.8071C10.6828 23.4057 12.3666 23.7391 14.14 23.7391ZM14.14 17.9809C17.8044 17.9809 17.8044 14.84 17.8044 14.84H10.4757C10.4757 14.84 10.4757 17.9809 14.14 17.9809Z"
                    :fill="itemData.style.color"></path>
            </svg>

            <span class="titleName" :style="{ color: itemData.style.color }">{{ itemData.contentText }}</span>
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
    padding: 8px;

    .iconBox {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        background-color: rgba(233, 233, 233, 0.8);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;


        .titleName{
            font-size: 11px;
        }
    }
}
</style>