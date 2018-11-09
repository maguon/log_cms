const path = require('path');

module.exports = {
    entry: {
        index:'./views/index.jsx' ,
        login:'./views/router.jsx',
        home:'./views/home.jsx',
        master:'./master.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/assets'),
        filename: '[name].js',
    },
    module: {
        rules: [

            {
                test: /\.js$/,
                loader: 'jsx-loader?harmony'
            },

            {
                test: /\.js|jsx$/, loaders: ['babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-0']
            },

            {
                test: /\.js|jsx$/,
                loaders: ['react-hot', 'babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-0'],
                include: path.join(__dirname, 'js')
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx','es6']
    },
    watchOptions: {
        aggregateTimeout: 500,
        ignored: '/node_modules/',
        poll: 1000
    }
};