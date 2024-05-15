

export function permissionInstruction(app){
    app.directive('authority', {
        mounted(el, binding){
            
            let userInfo = sessionStorage.getItem('vue-next-admin:userInfo');
            userInfo = userInfo ? JSON.parse(userInfo) : null;
            if(userInfo.roles[0] === 'admin'){
                return
            }
            el.remove();
        }
    });
}