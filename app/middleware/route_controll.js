//登录判断
module.exports = option => {
    return async function routeControll(ctx, next) {
        const routerUrl = ctx.helper.routerUrl;
        if (!!ctx.session.user) {//登录用户，非法操作
            if (ctx.request.url == routerUrl.login) {//访问登录相关资源
                if (!ctx.helper.isAjax()) {//非Ajax 请求
                    ctx.status = 302;//重定向
                    ctx.set("location", "/");//重定向到首页
                } else {//ajax请求
                    ctx.body = {
                        success: false,
                        code: 3002,
                        message: "你已经登录",
                        location: "/"
                    }
                }
                return;
            }
        } else if (!ctx.session.user) {//没有登录用户非法操作
            if (ctx.request.url == routerUrl.logout) {//访问退出登录资源
                ctx.status = 403;//拒绝访问
                ctx.body = {
                    success: false,
                    code: 4003,
                    message: "你没有权限访问这个资源，请登录"
                }
                return;
            }
        }
        await next();
    }
};