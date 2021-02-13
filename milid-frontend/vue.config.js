const prod = process.env.NODE_ENV === "production";
const github = process.env.NODE_ENV === "github";
//
// pwa config
// https://cli.vuejs.org/core-plugins/pwa.html#configuration
module.exports = {
  publicPath : github? '/MILID': (prod? '/':'/'),
  pwa:{
    name:"MILID",
    themeColor:"#260063",
  }
}