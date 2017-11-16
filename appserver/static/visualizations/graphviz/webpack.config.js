var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: 'visualization_source',
    node: {
        fs: 'empty'
    },
    resolve: {
        root: [
            path.join(__dirname, 'src'),
        ]
    },
    output: {
        filename: 'visualization.js',
        libraryTarget: 'amd'
    },
    externals: [
        'vizapi/SplunkVisualizationBase',
        'vizapi/SplunkVisualizationUtils'
    ]
};
