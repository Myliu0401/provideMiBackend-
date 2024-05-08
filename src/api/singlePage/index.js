import request from '/@/utils/request';



// 获取项目列表
export function getProjectList(data = {}) {
    return request({
        url: `/api/single/projects${splicingParameters(data)}`,
        method: 'get',
        data,
    });
};


// 拼接参数
function splicingParameters(para = {}) {
    let canshu = '?';
    for (let key in para) {
        canshu += `${key}=${para[key]}&`
    };

    return canshu.length === 1 ? '' : canshu.slice(0, -1);
};