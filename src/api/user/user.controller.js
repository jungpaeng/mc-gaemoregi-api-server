const fs = require('fs');
const ssh = require('../../lib/ssh');
const time = require('../../lib/time');

const {sshSimpleExec} = ssh;
const {sleep} = time;

const USER_LIST_FILE = '/home/ubuntu/minecraft/server/plugins/saveConcurrencyUser/concurrencyUser.txt';

exports.list = async (ctx) => {
  try {
    await sshSimpleExec(`savecurrencyuser`);

    await sleep(1000);
    const file = fs.readFileSync(USER_LIST_FILE, 'utf8');
    const userList = file.split('\r\n')
      .filter(item => !!item && !['\r', '\n'].includes(item));

    ctx.body = {
      results: {
        data: userList,
        count: userList.length,
      }
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = { message: 'User File not found' };
  }
};
