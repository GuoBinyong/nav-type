/* 
开发 和 生产两种模式公共的 webpack 配置文件
https://github.com/GuoBinyong/library-webpack-template
*/

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const tools = require('./tools');
const npmConfig = require("../package.json");


function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}


/**
 * 生成 Webpack 配置对象
 * @param  projectConfig : ProjecConfig    项目配置对象
 */
module.exports = function createWebpackConfig(projectConfig) {


  function assetsPath(_path) {
    return path.posix.join(projectConfig.staticOutDirectory, _path)
  }

  var libraryName = projectConfig.library || tools.stringToCamelFormat(npmConfig.name);
  

  const wpConfig = {
    target: projectConfig.target,  //node  web 等等
    context: path.resolve(__dirname, '../'),
    entry: {
      [libraryName]: projectConfig.entry,
    },
    output: {
      filename: projectConfig.filename || '[name].js',
      library: libraryName,
      libraryTarget: projectConfig.libraryTarget,
      libraryExport: projectConfig.libraryExport,
    },
    externals: projectConfig.externals,
    resolve: {
      extensions: projectConfig.extensions,
      alias: projectConfig.alias,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: tools.createBabelPresets("js")
            }
          },
          exclude: /node_modules/
        },
        {
          test: /\.jsx$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: tools.createBabelPresets("jsx")
            }
          },
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: assetsPath('img/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: assetsPath('media/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      ]
    },
    plugins: [],
  }


  // 配置插件：开始

  let plugins = wpConfig.plugins || [];



  // 拷贝静态资源插件
  const staticDirectory = projectConfig.staticDirectory;
  if (staticDirectory) {
    // https://github.com/ampedandwired/html-webpack-plugin
    const copyPlugin = new CopyWebpackPlugin([
      {
        from: resolve(staticDirectory),
        to: projectConfig.staticOutDirectory,
        ignore: ['.*']
      }
    ]);

    plugins.push(htmlPlugin);
  }



  let baReport = projectConfig.bundleAnalyzerReport;
  if (baReport === undefined){
    baReport = process.env.npm_config_report;
  }

  
  if (baReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    let baOpts = projectConfig.bundleAnalyzerOptions || {};
    if(!baOpts.analyzerPort){
      baOpts.analyzerPort = "auto";
    }
    plugins.push(new BundleAnalyzerPlugin(baOpts));
  }



  wpConfig.plugins = plugins;
  // 配置插件：结束


  return wpConfig;
}