// 一个简体中文转换到 繁体或英语的工具函数，繁体已使用工具转换完成， 英语需自行配置在 englishConfig 对象中
import * as OpenCC from "opencc-js";
const converter = OpenCC.Converter({ from: "cn", to: "hk" });
const currentLang = (navigator.language || navigator.languages[0]).toLowerCase();
// 配置英文模版
const englishConfig: Record<string, string> = {};

export default (str: string) => {
	if (currentLang.includes("-tw") || currentLang.includes("-hk")) {
		return converter(str);
	}
	return englishConfig[str];
};
