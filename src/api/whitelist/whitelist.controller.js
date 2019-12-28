const fs = require('fs');
const nodeSSH = require('node-ssh');
const ssh = new nodeSSH();

const getJSONFileSystem = (file) => {
    const jsonFile = fs.readFileSync(file, 'utf8');

    return JSON.parse(jsonFile);
};

const WHITELIST_FILE = '/home/ubuntu/minecraft/server/whitelist.json';

exports.list = (ctx) => {
    try {
        const jsonFile = getJSONFileSystem(WHITELIST_FILE);

        ctx.status = 200;
        ctx.body = {
            data: {
                results: jsonFile,
            },
        };
    } catch (e) {
        ctx.status = 500;
        ctx.body = { message: 'WhiteList File not found' };
    }
};

const sshSimpleExec = async (command) => {
    await ssh.connect({
        host: '125.141.133.20',
        username: 'ubuntu',
        port: '22',
        password : 'xhdzmsdkdl_meis1541',
        readyTimeout : 360000
    });


    ssh.exec(`screen -x minecraft -X stuff "${command}"`)
        .then(res => {
            ssh.exec('screen -x minecraft -X eval "stuff \\015"');
        });
};

exports.delete = async (ctx) => {
    const {id} = ctx.params;

    try {
        await sshSimpleExec(`whitelist remove ${id}`);

        try {
            const jsonFile = getJSONFileSystem(WHITELIST_FILE);

            ctx.status = 200;
            ctx.body = {
                data: {
                    results: jsonFile,
                },
            };
        } catch (e) {
            ctx.status = 500;
            ctx.body = { message: 'WhiteList File not found' };
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = { message: 'Unknown Error in ssh connected' };
    }
};

exports.create = async (ctx) => {
    const {name} = ctx.request.body;

    try {
        await sshSimpleExec(`whitelist add ${name}`);

        try {
            const jsonFile = getJSONFileSystem(WHITELIST_FILE);

            ctx.status = 200;
            ctx.body = {
                data: {
                    results: jsonFile,
                },
            };
        } catch (e) {
            ctx.status = 500;
            ctx.body = { message: 'WhiteList File not found' };
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = { message: 'Unknown Error in ssh connected' };
    }
};
