const nodeSSH = require('node-ssh');
const ssh = new nodeSSH();

const SSH_CLIENT_INFO = {
  host: 'mc.gaemoregi.com',
  username: 'ubuntu',
  port: '22',
  password : 'xhdzmsdkdl_meis1541',
  readyTimeout : 360000
};

const sshSimpleExec = async (command) => {
  await ssh.connect(SSH_CLIENT_INFO);

  ssh.exec(`screen -x minecraft -X stuff "${command}"`)
    .then(() => {
      ssh.exec('screen -x minecraft -X eval "stuff \\015"');
    });
};

module.exports = {
  sshSimpleExec,
};