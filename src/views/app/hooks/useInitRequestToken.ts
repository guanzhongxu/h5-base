import { decode } from "@/utils/useCrypto";
import useRequestData from "@/store/useRequestData";
import useUrlParamStore from "@/store/useUrlParamStore";
import useCookieStore from "@/store/useCookieStore";

/**
 * token优先级
 * 1、第一级：使用url地址上的token（默认是已加密的，所以进行解密，如解析失败 ，则直接赋值）
 * 2、第二级：使用cookie中的token
 * 3、第三级：使用cookie中的userid
 * 4、第四级：使用cookie中的app_token
 */
export default () => {
	const cookieStore = useCookieStore();
	const urlParamStore = useUrlParamStore();
	const requestStore = useRequestData();
	if (urlParamStore.urlData.token) {
		try {
			requestStore.handle("token", decodeURIComponent(decode(urlParamStore.urlData.token)));
		} catch {
			requestStore.handle("token", urlParamStore.urlData.token);
		}
	} else if (cookieStore.cookieData.token) {
		requestStore.handle("token", cookieStore.cookieData.token?.toString() || "");
	} else if (cookieStore.cookieData.userid) {
		requestStore.handle("token", cookieStore.cookieData.userid);
	} else if (cookieStore.cookieData.app_token) {
		requestStore.handle("token", cookieStore.cookieData.app_token);
	}
};
