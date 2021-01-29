module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: '/',
  configureWebpack: { externals: {'vuetify/lib': 'vuetify/lib'} }
}