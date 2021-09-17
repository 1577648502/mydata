const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  runtimeCompiler: true,
  devServer: {
      open: false,
      host: 'localhost',
      port: 8080,
      https: false,
      //以上的ip和端口是我们本机的;下面为需要跨域的
      proxy: { //配置跨域
          '/api': {  // 这里和方法里 axios里的 url匹配   （本行为第9行）
              target: 'https://caps.runde.pro/api/index.php', //这里后台的地址模拟的;应该填写你们真实的后台接口  // 这里和后台地址完全匹配
              ws: true,
              changOrigin: true, //允许跨域
              pathRewrite: {
                  '^/api': '' //请求的时候使用这个api就可以 // 这里和  第9行匹配
              }
          },
          '/Hm': {  // 这里和方法里 axios里的 url匹配   （本行为第9行）
            target: 'https://restapi.amap.com/v3/geocode/regeo', //这里后台的地址模拟的;应该填写你们真实的后台接口  // 这里和后台地址完全匹配
            ws: true,
            changOrigin: true, //允许跨域
            pathRewrite: {
                '^/Hm': '' //请求的时候使用这个api就可以 // 这里和  第9行匹配
            }
        }
      },
    //   proxy: { //配置跨域
         
    //   }

  },
  


  
  configureWebpack: {
    plugins: [
        new CopyWebpackPlugin([
            { from: 'node_modules/@liveqing/liveplayer/dist/component/crossdomain.xml'},
            { from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer.swf'},
            { from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer-lib.min.js', to: 'js/'},
        ])
      ],
      performance: {
          hints: 'warning',
          //入口起点的最大体积
          maxEntrypointSize: 50000000,
          //生成文件的最大体积
          maxAssetSize: 30000000,
          //只给出 js 文件的性能提示
          assetFilter: function(assetFilename) {
              return assetFilename.endsWith('.js');
          }
      },

      
  },
  publicPath: './',
 
   

}