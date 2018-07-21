//eslint-disable-next-line
const path = require("path");

function resolve(dir) {
  //eslint-disable-next-line
  return path.join(__dirname, "", dir);
}

//eslint-disable-next-line
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        styles: resolve("src/assets/scss")
      }
    }
  },
  pwa: {
    name: "PokeVue",
    themeColor: "#ee1515",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "src/registerServiceWorker.js"
      // ...other Workbox options...
    }
  }
};
