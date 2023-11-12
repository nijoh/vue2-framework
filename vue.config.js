const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 跨域问题解决
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8081', // 注意！此处为后端提供的真实接口
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          // 如果接口中是没有api的，那就直接置空，'^/api': ''，
          // 如果接口中有api，那就得写成{'^/api':'/api'}
          '^/api': ''
        }
      }
    }
  }
})
