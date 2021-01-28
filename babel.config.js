console.log('starting process with env = ', process.env.NODE_ENV)
const plugins = process.env.NODE_ENV === 'test' ||  process.env.NODE_ENV === 'development'?
[
  {
    "babel-plugin-istanbul": {
      extension: ['.js', '.vue'],
    }
   }
] : null

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  //plugins
}

