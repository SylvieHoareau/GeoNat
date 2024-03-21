// vue.config.js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        "path": false,
        "os": false,
        "crypto": false,
        "stream": false,
        "timers": require.resolve("timers-browserify")
      }
    }
  },
  pluginOptions: {
    foo: '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__'
  }
})
