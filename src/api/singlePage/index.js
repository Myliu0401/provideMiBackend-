import request from '/@/utils/request';



// 获取项目列表
export function getProjectList(data = {}) {
    return request({
        url: `/api/single/projects${splicingParameters(data)}`,
        method: 'get',
        data,
    });
};


// 创建模板
export function createTemplate(data = {}) {
    return request({
        url: `/api/single/templates`,
        method: 'post',
        data,
    });
};

// 获取模板列表
export function getTemplateList(data = {}) {
    return request({
        url: `/api/single/templates${splicingParameters(data)}`,
        method: 'get',
        data,
    });
};

// 创建项目
export function createProject(data = {}) {
    return request({
        url: `/api/single/projects`,
        method: 'post',
        data,
    });
};


// 修改项目
export function setProject(data = {}) {
    return request({
        url: `/api/single/projects/${data.id}`,
        method: 'put',
        data,
    });
};


// 修改模板
export function setTemplate(data = {}, id){
    return request({
        url: `/api/single/templates/${id}`,
        method: 'put',
        data,
    });
};


// 上传图片
export function uploadImages(data = {}){
    return request({
        url: `/api/core/files`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};


// 登录
export function login(data = {}){
    return request({
        url: `/api/core/login`,
        method: 'post',
        data,
    });
};


// 添加用户
export function addUser(data = {}){
    return request({
        url: `/api/core/users`,
        method: 'post',
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




