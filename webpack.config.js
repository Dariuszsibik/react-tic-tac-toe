var path = require('path');

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
        })
    ]
    
}