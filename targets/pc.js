module.exports = function (env) {
    var reactjsPaths = [
        'node_modules/react/dist/react.js',
        'node_modules/react-dom/dist/react-dom.js',
        'release/js/server.js',
        'release/js/loading.js',
        'release/js/prompt.js',
        'node_modules/echarts/dist/echarts.js'
    ];
    var reactminjsPaths = [
        'node_modules/react/dist/react.min.js',
        'node_modules/react-dom/dist/react-dom.min.js',
        'release/js/server.js',
        'release/js/loading.js',
        'release/js/prompt.js',
        'node_modules/echarts/dist/echarts.js'
    ];

    function jsPath(path) {
        return 'js/' + path;
    }

    var shimjsPaths = [
        jsPath('polyfills/es5-shim.js'),
        jsPath('polyfills/es5-sham.js'),
        jsPath('polyfills/es6-shim.js'),
        jsPath('polyfills/es6-sham.js'),
    ];

    return {
        commonJS: {
            react: env == 'dev' ? reactjsPaths : reactminjsPaths,
            polyfill:shimjsPaths,
            jiathis: [jsPath('libs/jiathis.js')],
            legacy: [jsPath('libs/pickerdate/legacy.js')],
            picker: [jsPath('libs/pickerdate/picker.js')],
            pickerdate: [jsPath('libs/pickerdate/picker.date.js')]
        },
        webpackEntry:{
            home:'./js/views/pc/pages/Index/Home.js',
            aboutUs:'./js/views/pc/pages/AboutUs/Home.js',
            login:'./js/views/pc/pages/UserLogin/Login/Home.js',
            register:'./js/views/pc/pages/UserLogin/Register/Home.js',
            forgetpwd:'./js/views/pc/pages/UserLogin/Forgetpwd/Home.js',
            plist:'./js/views/pc/pages/InvestPc/Plist/Home.js',
            prodetail: './js/views/pc/pages/InvestPc/ProDetail/ProDetail.js',
            viewfile:'./js/views/pc/pages/InvestPc/ProDetail/ViewFile.js',
            accountcenter: './js/views/pc/pages/UserPc/Home.js',
            server: './js/widget/Server.js',
            loading: './js/widget/Loading.js',
            prompt:'./js/widget/Prompt.js',
            feedback: './js/views/pc/pages/AboutUs/Feedback.js',
            protocol:'./js/widget/Agreement.js',
            lib: './js/libs/avatorEditor.js'
        },
        pages: [
            {
                title: '长富云理财-首页',
                template: 'pc-index.html',
                output: 'index.html',
                js: ['polyfill.js','react.js','home.js'],
                css: ['global.css','common.css','index.css', 'indexBanner.css', 'service.css'],
                prerender:true
            },
            {
                title: '长富云理财-关于我们',
                template: 'pc-detail.html',
                output: 'aboutUs.html',
                js: ['polyfill.js','react.js','aboutUs.js'],
                css: ['global.css', 'common.css', 'aboutUs.css', 'service.css'],
                prerender:true
            },
            {
                title: '长富云理财-登录',
                template: 'pc.html',
                output: 'login.html',
                js: ['polyfill.js','react.js','login.js'],
                css: ['global.css', 'common.css', 'login.css', 'service.css'],
                prerender:true
            },
            {
                title: '长富云理财-注册',
                template: 'pc.html',
                output: 'register.html',
                js: ['polyfill.js','react.js','register.js'],
                css: ['global.css', 'common.css', 'register.css', 'service.css'],
                prerender:true
            },
            {
                title: '长富云理财-找回密码',
                template: 'pc.html',
                output: 'forgetpwd.html',
                js: ['polyfill.js','react.js','forgetpwd.js'],
                css: ['global.css', 'common.css', 'forgetpwd.css', 'service.css'],
                prerender:true
            },
            {
                title: '长富云理财-投资列表',
                template: 'pc.html',
                output: 'plist.html',
                js: ['polyfill.js','react.js','plist.js'],
                css: ['global.css', 'common.css', 'plist.css', 'service.css'],
                prerender:true
            },
            {
                title: '长富云理财-产品详情',
                template: 'pc-detail.html',
                output: 'prodetail.html',
                js: ['polyfill.js', 'react.js', 'prodetail.js'],
                css: ['global.css', 'common.css', 'prodetail.css', 'service.css'],
                prerender: true
            },
            {
                title: '长富云理财-文件预览',
                template: 'pc.html',
                output: 'viewfile.html',
                js: ['polyfill.js', 'react.js', 'viewfile.js'],
                css: ['global.css', 'common.css', 'prodetail.css', 'service.css'],
                prerender: true
            },
            {
                title: '长富云理财-账户中心',
                template: 'pc-account.html',
                output: 'accountcenter.html',
                js: ['polyfill.js','react.js','lib.js','accountcenter.js'],
                css: ['global.css', 'common.css', 'accountcenter.css', 'service.css', 'datePicker.css'],
                prerender:true
            },
            {
                title: '反馈',
                template: 'pc-feedback.html',
                output: 'feedback.html',
                js: ['polyfill.js', 'react.js', 'feedback.js'],
                css: ['global.css', 'common.css', 'aboutUs.css', 'service.css'],
                prerender: true
            },
            {
                title: '长富云理财师服务协议',
                template: 'pc.html',
                output: 'protocol.html',
                js: ['polyfill.js', 'react.js', 'protocol.js'],
                css: ['global.css', 'common.css', 'aboutUs.css', 'service.css'],
                prerender: true
            },
        ]
    }
}