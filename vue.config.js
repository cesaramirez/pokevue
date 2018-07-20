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

  lintOnSave: undefined,

  org: {
    vue: {
      pwa: {
        name: 'PokeVue'
      }
    }
  }
};
