const ssh = require('../../lib/ssh');
const file = require('../../lib/file');

const {sshSimpleExec} = ssh;
const {getJSONFileSystem} = file;

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

exports.delete = async (ctx) => {
    const {id} = ctx.params;

    try {
        await sshSimpleExec(`whitelist remove ${id}`);
        ctx.body = { message: 'Whitelist Deleted!' };
    } catch (e) {
        ctx.status = 500;
        ctx.body = { message: 'Unknown Error in ssh connected' };
    }
};

exports.create = async (ctx) => {
    const {name} = ctx.request.body;

    try {
        await sshSimpleExec(`whitelist add ${name}`);
        ctx.body = { message: 'Whitelist Add!' };
    } catch (e) {
        ctx.status = 500;
        ctx.body = { message: 'Unknown Error in ssh connected' };
    }
};
