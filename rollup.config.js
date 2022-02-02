import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

var uglify = require("@lopatnov/rollup-plugin-uglify")
const isProduction = process.env.NODE_ENV === 'production'

export default { 
    input: 'src/main.js',
    output: {
        file: 'build/main.min.js',
        format: 'iife'
    },
    plugins: [
        resolve({
            mainFields: ['browser', 'jsnext:main', 'module', 'main']
        }),
        commonjs(),
        replace({ENV: JSON.stringify(process.env.NODE_ENV || 'development')}),
        (isProduction && uglify())
        
    ]
}