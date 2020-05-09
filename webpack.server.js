const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports={
    target:'node',
    entry:'./server.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'build'),
        publicPath:'/build'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                loader:'babel-loader',
                exclude:'/node_modules',
                options:{
                    presets:[
                        '@babel/preset-env',
                            '@babel/preset-react'
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
                options:{
                    modules:true,
                    sourceMap:true
                }
            }
        ]
    },
    externals:[webpackNodeExternals()]
}