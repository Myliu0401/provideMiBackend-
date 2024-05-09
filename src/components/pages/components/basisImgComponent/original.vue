<template>
    <div class="original" :style="{ marginTop: itemData.style.marginTop + 'px', marginBottom: itemData.style.marginBottom + 'px' }">
        <svg width="56" height="56" viewBox="0 0 28 28"><defs><linearGradient x1="50%" y1="99.707%" x2="50%" y2="5.583%" id="a"><stop stop-color="#999" offset="0%"></stop><stop stop-color="#737373" offset="100%"></stop></linearGradient></defs><path d="M19.5 6A2.5 2.5 0 0122 8.5v11a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 016 19.5v-11A2.5 2.5 0 018.5 6h11zm-2.657 8.156a1 1 0 00-1.347.006l-4.22 3.881a.5.5 0 01-.643.03l-2.731-2.087a.25.25 0 00-.402.199V19.5a1 1 0 001 1h11a1 1 0 001-1v-1.82a.5.5 0 00-.165-.371zM11 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="url(#a)" fill-rule="nonzero"></path></svg>
        <button class="button">上传图片</button>
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
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
.original {
    width: 375px;
    height: 222px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: #f7f7f7;
    flex-direction: column;

    .button {
        outline: none;
        padding: 8px 33px;
        font-size: 13px;
        color: #6B6B6B;
        letter-spacing: 0;
        line-height: 22px;
        border: 1px dashed #D6D6D6;
        border-radius: 3px;
        cursor: pointer;


        &:hover {
            color: #292929;
            background: rgba(0, 0, 0, 0.03);
            border: 1px dashed #A3A3A3;
        }


        &:active {
            background: rgba(0, 0, 0, 0.06);
        }
    }

}
</style>