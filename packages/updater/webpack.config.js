var path = require('path')

module.exports = {
  entry: './lib/library.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'UMB',
    libraryExport: 'default'
  }
}
