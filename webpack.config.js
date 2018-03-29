const path = require('path')
const HTMLPlugin=require('html-webpack-plugin')
const webpack=require('webpack')
const isDev=process.env.NODE_ENV==='development'
const config = {
    target:'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpeg|jpg|png|gif|svg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options:{
                            limit: 10000,
                        name: '[name].[ext]'
                        }
                    }
                ] 
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NOOE_ENV:isDev?'"development"':'"production"'
            }
        }),
        new HTMLPlugin()
    ]
}
//开发环境和正式环境选择
if(isDev){
    //修改之后只更新修改部分
    config.devtool='#cheap-module-eval-source-map' 
    config.devServer={
        port:8000,
        host:'0.0.0.0',
        overlay:{
            errors:true,
        },
        //热加载
        hot:true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports=config