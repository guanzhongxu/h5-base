import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import { resolve, extname } from "path";
import postcssPxToViewport from "postcss-px-to-viewport";
import eslintPlugin from "vite-plugin-eslint";
import AutoImport from "unplugin-auto-import/vite";
// @ts-ignore
import jsonObj from "./package.json";
import { readdirSync, rmSync } from "fs";

const mediaReg = /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i;
const imgReg = /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/;
const fontReg = /\.(woff2?|eot|ttf|otf)(\?.*)?$/i;
const dir = resolve(__dirname);

// 读取要删除的函数
function readDeleteDir(path: string) {
	readdirSync(path).forEach(item => {
		if (item.includes(jsonObj.name)) {
			const url = `${path}/${item}`;
			rmSync(url, { recursive: true });
		}
	});
}
export default ({ mode }) => {
	readDeleteDir(dir);
	const plugins = [
		vue({
			script: {
				propsDestructure: true
			}
		}),
		Components({
			resolvers: [VantResolver()]
		}),
		AutoImport({
			imports: ["vue", "vue-router"],
			dts: "autoImport.d.ts"
		})
	];
	if (mode === "development") {
		plugins.push(
			eslintPlugin({
				exclude: [resolve("./src/!*.d.ts"), resolve("foreign-country-utils/!*")]
			})
		);
	}
	const compress = {
		drop_console: false,
		drop_debugger: true
	};
	if (mode === "production") {
		compress.drop_console = true;
	}

	return defineConfig({
		plugins,
		css: {
			postcss: {
				plugins: [
					postcssPxToViewport({
						unitToConvert: "px", // 要转化的单位
						viewportWidth: 375, // UI设计稿的宽度
						unitPrecision: 6, // 转换后的精度，即小数点位数
						propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
						viewportUnit: "vmin", // 指定需要转换成的视窗单位，默认vw
						fontViewportUnit: "vmin", // 指定字体需要转换成的视窗单位，默认vw
						selectorBlackList: ["ignore-"], // 指定不转换为视窗单位的类名，
						minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
						mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
						replace: true, // 是否转换后直接更换属性值
						exclude: [],
						landscape: false // 是否处理横屏情况
					})
				]
			},
			preprocessorOptions: {
				stylus: {
					imports: [resolve("./src/assets/css/public.styl")]
				}
			}
		},
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src/"),
				components: resolve(__dirname, "./src/components/"),
				views: resolve(__dirname, "./src/views/"),
				entities: resolve(__dirname, "./src/entities"),
				public: resolve(__dirname, "public")
			}
		},
		build: {
			minify: "terser",
			terserOptions: {
				compress
			},
			target: "es2015",
			rollupOptions: {
				output: {
					assetFileNames: assetInfo => {
						const { name } = assetInfo;
						let extType = extname(name).substring(1);
						if (mediaReg.test(name)) {
							extType = "media";
						} else if (imgReg.test(name)) {
							extType = "img";
						} else if (fontReg.test(name)) {
							extType = "fonts";
						}
						return `${extType}/[name]-[hash][extname]`;
					},
					chunkFileNames: "js/[name]-[hash].js",
					entryFileNames: "js/[name]-[hash].js",
					dir: `${mode}-${jsonObj.name}`
				}
			}
		},
		base: "./"
	});
};
