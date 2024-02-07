import { useStorage } from "foreign-country-utils";
import { decode, encode } from "@/utils/useCrypto";
import { cloneDeep } from "lodash";
const { get } = useStorage();
// 获取url地址参数
const reg = /^http[^?]*\?/;
const itemReg = /[^?]*=/;
/**
 * 特别说明：
 * 1、如果是这样的地址：http://192.168.4.143:5173/#/index?name=5464&backUrl=http://121345465.com?name=999&age=99966656
 *    得到的结果是
 *    {
 *     "name": "5464",
 *     "backUrl": "http://121345465.com?name=999",
 *     "age": "99966656"
 *    }， 所以如果url地址上需要添加；链接，并且链接上需要带参，就需要在跳转当前项目之前 进行url地址包装
 * 2、该方法是从本地的session 里面取值， 并进行了参数的解密
 */
export default (readOld = true) => {
	let storage: Record<string, string> | string = {};
	readOld && (storage = get<Record<string, string>>(encode("useUrlParamStore"), true) || {});
	if (typeof storage === "string") {
		storage = {};
	} else {
		for (const key in storage) {
			storage[decode(key)] = decode(storage[key]);
			delete storage[key];
		}
	}
	const result: Record<string, string> = cloneDeep(storage);
	const href = decodeURIComponent(location.href);
	if (!href.includes("?")) return result;
	const paramsStr = decodeURIComponent(location.href).replace(reg, "");
	if (paramsStr.length > 0 && !paramsStr.includes("&")) {
		addValue(result, paramsStr);
	} else if (paramsStr.includes("&")) {
		paramsStr.split("&").forEach(item => addValue(result, item));
	}
	return result;
};

const addValue = (obj: Record<string, string>, str: string) => {
	const value = str.replace(itemReg, "");
	const key = str.split(value)[0].split("=")[0];
	obj[key] = value;
};
