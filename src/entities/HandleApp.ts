import { parseInt } from "lodash";

interface ShareParams {
	url: string; // 分享链接
	img?: string; // 缩略图链接
	title: string; // 展⽰的标题
	dec: string; // 标题下的描述
}
const ua = navigator.userAgent;
class HandleApp {
	static get iosVersion(): { patchVersion: number; majorVersion: number; minorVersion: number } {
		HandleApp._iosVersion.majorVersion === -1 && HandleApp.getAgent();
		return HandleApp._iosVersion;
	}
	static get agent(): string {
		HandleApp._agent.length === 0 && HandleApp.getAgent();
		return HandleApp._agent;
	}
	// 当前是安卓还是ios
	private static _agent = "";
	private static _iosVersion = {
		majorVersion: -1,
		minorVersion: -1,
		patchVersion: -1
	};
	// 当前的环境
	private static getAgent() {
		const agent = ua.toLowerCase();
		HandleApp._agent = agent.indexOf("android") > -1 || agent.indexOf("adr") > -1 ? "android" : "ios";
		if (HandleApp._agent === "ios") HandleApp.getIOSVersion();
	}
	public static getIOSVersion() {
		const iOSVersionMatch = ua.match(/OS (\d+)_(\d+)_?(\d+)?/);
		if (iOSVersionMatch) {
			// 提取iOS主要版本号、次要版本号和补丁版本号
			const majorVersion = parseInt(iOSVersionMatch[1], 10);
			const minorVersion = parseInt(iOSVersionMatch[2], 10);
			const patchVersion = parseInt(iOSVersionMatch[3] || "0", 10);
			HandleApp._iosVersion = {
				majorVersion,
				minorVersion,
				patchVersion
			};
		}
	}

	// 关闭webview
	public static closeWebview() {
		HandleApp.agent === "ios" ? window.webkit.messageHandlers.closeWeb.postMessage({ url: "" }) : window.liveapp.closeWeb();
	}

	// 分享页面
	public static share(param: ShareParams) {
		HandleApp.agent === "ios"
			? window.webkit.messageHandlers.openShareTip.postMessage(param)
			: window.liveapp.openShareTip(JSON.stringify(param));
	}

	// 进入个人中心
	public static toPerson(data: { userid: number | string }) {
		HandleApp.agent === "ios" ? window.webkit.messageHandlers.toPerson.postMessage(data) : window.liveapp.toPerson(JSON.stringify(data));
	}

	// 进入直播间
	public static toLiveRoom(param: { userid: number; avatar: string }) {
		HandleApp.agent === "ios" ? window.webkit.messageHandlers.toLiveroom.postMessage(param) : window.liveapp.toLiveroom(JSON.stringify(param));
	}

	// 充值
	public static toRecharge(inLive = false) {
		HandleApp.agent === "ios" ? HandleApp.iosPay(inLive) : HandleApp.androidPay();
	}

	// 安卓充值
	public static androidPay() {
		const data = {
			app_open: "appjump",
			url: "myWallet"
		};
		window.liveapp.actionAsPhp(JSON.stringify(data));
	}

	// 苹果支付
	private static iosPay(inLive: boolean) {
		const str = { className: "MineWalletViewController" }; // 不在直播间
		if (inLive) {
			//在直播间
			str.className = "LiveRechargeViewController";
		}
		const obj = {
			app_open: "appjump",
			url: JSON.stringify(str)
		};
		window.webkit.messageHandlers.actionAsPhp.postMessage(obj); //苹果
	}

	// 获取状态栏高度(由于原生原因，目前无法获取，默认顶部padding 35px)
	public static getStatusBarHeight() {
		if (HandleApp.agent === "ios") {
			return window.webkit.messageHandlers.getStatusBarHeight.postMessage();
		} else {
			return window.liveapp.getStatusBarHeight();
		}
	}
	//跳转广场
	public static toSquare(param: { index: number }) {
		HandleApp.agent === "ios"
			? window.webkit.messageHandlers.selecetTabBarItem.postMessage(param)
			: window.liveapp.selecetTabBarItem(JSON.stringify(param));
	}
}
export default HandleApp;
