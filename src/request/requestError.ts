import { closeToast } from "vant";
import { RequestError } from "@/types/RequestError";
import Tips from "entities/Tips";
const errorList: RequestError[] = [
	[(msg: string) => msg.includes("Network Error"), () => Tips.showDataError("网络错误")],
	[(msg: string) => msg.includes("timeout"), () => Tips.showDataError("30秒内后端未返回数据，请求超时!")],
	[(msg: string) => msg.includes("500"), msg => Tips.showDataError(msg || "后端出错")]
];
export default (msg: string) => {
	const has = errorList.find(item => item[0](msg));
	closeToast(true);
	if (has) {
		has[1](msg);
	} else {
		Tips.showDataError(msg);
	}
};
