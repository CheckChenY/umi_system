
// ref: https://umijs.org/config/
import { resolve } from "path";
export default {
    treeShaking: true,
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        ['umi-plugin-react', {
            antd: true,
            dva: true,
            dynamicImport: false,
            title: 'app_express',
            dll: false,

            routes: {
                exclude: [
                    /models\//,
                    /services\//,
                    /model\.(t|j)sx?$/,
                    /service\.(t|j)sx?$/,
                    /components\//,
                ],
            },
        }],
    ],
    alias: {
        '@utils': resolve(__dirname, "./src/utils"),
        '@api': resolve(__dirname, "./src/api"),
        '@com': resolve(__dirname, "./src/components"),
        // '@cot': resolve(__dirname, "./src/constants"),
        '@assets': resolve(__dirname, "./src/assets"),
        // '@public': resolve(__dirname, "./public"),
        '@const': resolve(__dirname, "./src/const"),
        // '@goeasy': resolve(__dirname, "./"),
        // 系统配置
        // '@platformConfig': resolve(__dirname, "./src/config/platform.config"),
        // '@services': resolve(__dirname, "./src/services"),
    },
    proxy: {
        "/api": {
            "target": "http://218.206.237.209:8088/",
            "changeOrigin": true,
            "pathRewrite": { "^/api": "" }
        },
        "/host": {
            "target": "http://127.0.0.1:8888/",
            "changeOrigin": true,
            "pathRewrite": { "^/host": "" }
        },
        "/local": {
            "target": "http://10.168.1.200:8080/",
            "changeOrigin": true,
            "pathRewrite": { "^/local": "" }
        },
        "/lang": {
            "target": "http://10.168.1.210:8080/",
            "changeOrigin": true,
            "pathRewrite": { "^/lang": "" }
        }
    }
}
