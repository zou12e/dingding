const schedule = require('node-schedule');
const rp = require('request-promise');
const moment = require('moment');

module.exports = function () {
    // 每个星期一 10：00：00
    schedule.scheduleJob('0 0 10 * * 1', function () {
    });

    // 每隔5秒
    schedule.scheduleJob('*/5 * * * * *', function () {
        // sendMsg(`现在时间： ${moment().format('HH:mm:ss')}`);
    });
};

const sendMsg = function (msg) {
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
                'content': msg
            }
        },
        json: true
    };
    rp(options);
};
