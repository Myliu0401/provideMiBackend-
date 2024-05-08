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
    getProjectList
} from '/@/api/singlePage/index.js';


export default function () {
    const listData = reactive({
        dateTimes: [], // 日期时间
        projectName: '', // 项目名
        page: 1,
        pageSize: 10,
        total: 0,
        lists: [],
        loading: false
    });


    onBeforeMount(() => {
        getLists();
    });


    // 获取列表数据
    async function getLists() {
        listData.loading = true;
        const res = await getProjectList({ page: listData.page });
        listData.loading = false;
        listData.total = res.data.meta.total;
        listData.lists = res.data.data;
    };


    // 搜索
    function search(){
        getLists();
    };

    // 重置
    function reset(){
        listData.page = 1;
        listData.pageSize = 10;
        listData.projectName = '';
        listData.dateTimes = [];
        getLists();
    };

    return {
        listData,
        search,
        reset
    };
};