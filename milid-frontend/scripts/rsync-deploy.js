
const execa = require("execa");
// requires sshpass and rsync to work
// implements password based rsync deploy
// sshpass -p 1234 rsync -avzrO . bflh_admin@demainlalune.ch:sites/test.demainlalune.ch

module.exports = async function rsync_deploy(options) {

  const password = options.password;
  const user = options.user;
  const host = options.host;
  const target_directory = options.target_directory;

  const args = [
    '-p', password,
    'rsync', '-avzrO', '--no-perms', '--delete',
    './dist/',
    `${user}@${host}:${target_directory}`,
  ];

  try {
    await execa("sshpass", args);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
    throw new Error(e);
  }
}