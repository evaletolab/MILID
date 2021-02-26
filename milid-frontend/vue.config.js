const prod = process.env.NODE_ENV === "production";
const github = process.env.NODE_ENV === "github";
//
// pwa config
// https://cli.vuejs.org/core-plugins/pwa.html#configuration
module.exports = {
  publicPath : github? '/MILID': (prod? '/':'/'),
  pwa:{
    name:"MILID",
    themeColor:"#6900FF",
    appleMobileWebAppCapable: true,
    appleMobileWebAppStatusBarStyle:'#6900FF',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      // swSrc: 'dev/sw.js',
      // ...other Workbox options...
    }

  }
}