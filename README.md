#### 一个基础移动端的空项目，主要采用vue ^3.2.45,vue-router ^4.1.6, eslint ^8.4.10, postcss-px-to-viewport ^1.1.1 , stylus ^0.59.0, vite ^4.0.0;
#### 已引入环境变量，如需修改，请自行修改;
#### 打包时只有在生产环境下关闭console输出，路由在所有环境为hash模式，路由baseurl为package.name，打包时关闭eslint代码检查，生产环境自动关闭vconsole调试工具
#### 所有全局interface均放在`src/interface`文件夹中
#### 所有全局type均放在`src/types`文件夹中
#### 所有全局实体类均放在 `src/entities`文件夹中
#### 路由创建在页面同级下创建 `pageConfig.ts` 请参考 `views/index/pageConfig.ts`
#### 自动引入vue相关的函数， 具体函数详情见 `autoImport.d.ts`
#### ！！！重要： 代码提交请执行 npm run commit 然后按照实际情况进行选择， 代码会自动格式化
#### 页面布局中如果使用components/shell 作为根组件，样式需要进行 props 传递
#### 开发环境下 给了默认了的 token（userid） +7Nco8JTEGD1U6A76dr9lA==(国内测试环境)


####  简介：
##### entities中的 HandleApp 是与 app端 交互的方法， 里面包含了当前的设备类型 如果是ios则会包含ios的版本信息等
##### utils中的 useCookie 是为了获取 cookie中存储的数据， 如果有userid 则会被base64 编码
##### useCrypto中 有加密和解密方法（不是请求的，请求的加解密是另外一个） ，一般会用登录成功之后 url地址上的token进行解密 或者 加解密 本地存储
##### useDebounce中 是自定义ref 可以进行数据收集时防抖操作
##### useDefer是一个高阶函数， 因为它将会返回一个新的函数， 通常会用在进行数据列表渲染的时候
##### usePxToVw使用将px转为vw的一个工具函数，十分简单，只需要注意工具中的viewportWidth 和 vite.config.ts 中的一致即可
##### useRouter 使用包含路由跳转和返回的函数， 我们通常使用它进行页面的跳转，因为这样会给页面切换添加动效， 并且 我们在写页面的时候 通常会将页面包含在 components/shell 组件中， 这样我们可以近似的模拟app的缓存页面功能
##### useUrlData 用于获取路由参数的工具函数
##### useUserIdDecode 是用于 userId解密的， 因为app注入到cookie中的userid是加密的，所以在有些情况下 如何想拿到解密后的userid，可以使用此工具函数

