const { decode } = require('../extends/helper')

module.exports = (keys) => async (ctx, next) => {
    let { white } = ctx.app.config;
    // white.some(item => {
    //     console.log(ctx.method, item.method)
    //     console.log(ctx.method == item.method)
    //     console.log(ctx.path == item.path)
    // });

    let flag = white.some(item => ctx.method == item.method && ctx.path == item.path);

    console.log(flag, "flag")


    //白名单
    if (flag) {
        await next()
        return
    }

    let token = ctx.get('token');

    try {
        let data = await decode(token, ctx.app.config.keys);
        let { iat } = data;

        let currentTime = Date.now() - iat;
        //七天免登录   7*24*60*60*1000
        let times = 604800000;
        //如果过期
        if (currentTime > times) {
            ctx.status = 401;
            ctx.body = {
                code: 0,
                msg: "用户信息已过期！请重新登录！"
            }
        }
        //否则
        await next()
    } catch (err) {
        ctx.status = 401;
        ctx.body = {
            code: '0',
            msg: "用户权限可能被篡改！"
        }
    }


}