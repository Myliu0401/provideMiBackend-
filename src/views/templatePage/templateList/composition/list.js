import {
    reactive,
    onMounted,
    ref,
    watch,
    nextTick,
    onActivated,
    markRaw,
    onBeforeMount
} from 'vue';
import {
    getTemplateList
} from '/@/api/singlePage/index.js';


export default function () {
    const listData = reactive({
        loading: false,
        page: 1,
        pageSize: 10,
        total: 0,
        dateTimes: [], // 日期时间
        lists: []
    });


    onBeforeMount(() => {
        myTemplateList();
    });


    // 获取模板列表
    async function myTemplateList() {
        listData.loading = true;
        const res = await getTemplateList({
            page: listData.page
        });
        listData.loading = false;
        listData.total = res.data.meta.total;
        listData.lists = res.data.data;
    };

    // 搜索
    function search() {
        myTemplateList();
    };

    // 重置
    function reset() {
        listData.page = 1;
        listData.pageSize = 10;
        listData.dateTimes = [];
        myTemplateList();
    };

    return {
        listData,
        search,
        reset
    };
};