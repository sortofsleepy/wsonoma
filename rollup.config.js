import typescript from 'rollup-plugin-typescript'

export default {
    input:'./src/app.ts',
    output:[
        {

            format:"iife",
            file:"./public/app.js"
        }
    ],
    plugins:[
        typescript()
    ]
}