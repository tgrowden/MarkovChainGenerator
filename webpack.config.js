const webpack = require('webpack')
const path = require('path')
const buildPath = __dirname
const nodeModulesPath = path.resolve(__dirname, 'node_modules')

const config = {
    entry: [path.join(__dirname, '.github', 'entry.js')],
  // Render source-map file for final build
    devtool: 'source-map',
  // output config
    output: {
        path: buildPath, // Path of output file
        filename: 'bundle.js', // Name of output file
    },
    plugins: [
    // Define production build to allow React to strip out unnecessary checks
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),

    // Allows error warnings but does not stop compiling.
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/, // All .js files
                loaders: ['babel-loader?presets[]=react,presets[]=es2015'], // react-hot is like browser sync and babel loads jsx and es6-7
                exclude: [nodeModulesPath],
            },
        ],
    },
}

module.exports = config
