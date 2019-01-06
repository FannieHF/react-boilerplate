module.exports = {
    autoprefixer: {
        browsers: '> 5%'
    },
    plugins: {
        'postcss-import': {},
        'postcss-preset-env': {},
        'cssnano': {}
    },
    'postcssCssnext': {
        features: {
            autoprefixer: true
        }
    }
}