const Router = require('koa-router');
const rp = require('request-promise');

const router = new Router({
    prefix: '/dingding/api'
});

// 测试
router.get('/test', async ctx => {
    const WEBHOOK_TOKEN = 'https://oapi.dingtalk.com/robot/send?access_token=dd4f325eb1dd24e8f9a426c07f9fa1e73a00993efb157a42a83b6d584ba0c32b';
    const options = {
        method: 'POST',
        uri: WEBHOOK_TOKEN,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: {
            'msgtype': 'text',
            'text': {
                'content': '你们好无聊！'
            }
        },
        json: true
    };
    const data = await rp(options);
    ctx.success(data, 'test ok');
});

module.exports = router;
