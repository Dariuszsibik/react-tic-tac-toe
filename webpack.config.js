var path = require('path');

var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    watch: true,
    devtool: 'source-map',



    plugins: [
        new webpack.ProvidePlugin({
            $: ['jquery'],
            jQuery: ['jquery'],
            'window.jQuery': 'jquery',
        }),

        new BrowserSyncPlugin ({
            host: 'localhost',
            port: 9100,
            prox: 'http://localhost:3001', 
        }, {
            reload: false,
        })
    ]
    
}