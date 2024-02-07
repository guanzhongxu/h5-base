import { ToastOptions, ToastType } from "vant/lib/toast/types";
import { showDialog, showFailToast, showLoadingToast, showSuccessToast, showToast } from "vant";
import { DialogOptions } from "vant/lib/dialog/types";
const defaultOption: ToastOptions = {
	duration: 0,
	forbidClick: true,
	message: "加载中...",
	overlay: true
};
export default class Tips {
	// 加载相关
	static showLoading(options: string | ToastOptions = {}) {
		let config: ToastOptions = { ...defaultOption };
		if (typeof options === "string") {
			config.message = options;
		} else {
			config = {
				...config,
				...options
			};
		}
		return showLoadingToast(config);
	}
	// 数据校验出错弹窗
	static showDataError(message: string, options: DialogOptions = {}) {
		return showDialog({
			title: "提示",
			message,
			...options
		});
	}
	// 轻提醒
	static showToast(options: string | ToastOptions = {}, type: ToastType = "success") {
		switch (type) {
			case "success":
				return showSuccessToast(options);
			case "fail":
				return showFailToast(options);
			case "html":
			case "text":
			case "loading":
				return showToast(options);
		}
	}
}
