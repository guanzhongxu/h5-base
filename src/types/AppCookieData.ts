import Platform from "@/types/Platform";
import InLive from "@/types/InLive";
/**
 *  isOnLiveRoom = true 并且roomIdentifier有值，说明当前用户是已观众身份进入直播间
 *  isOnLiveRoom = false 并且roomIdentifier为空，说明当前用户是已主播身份进入直播间
 *  aes加密
 *      count = 128
 *      key = Hy7pawh7PNkiNttFRm35iGPrXnhhprtB
 *      iv = JhyETrRHXKCdayck
 */
interface AppCookieData {
	platform?: Platform;
	userid?: string; // aes加密后再base64编码后的字符串
	app_token?: string; // 用户token
	source?: string; // app包名，包含"com.bang.live.app"则是Bei系列包或者模块
	isOnLiveRoom?: InLive; // 是否在直播间内 1在 0不在
	roomIdentifier?: string; //观众所在直播间房间号，多个房间以，分割
	token?: string; // 自己手动添加的token
}

export default AppCookieData;
