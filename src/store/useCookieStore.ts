import { defineStore } from "pinia";
import useCookie from "@/utils/useCookie";
import { reactive } from "vue";
import AppCookieData from "@/types/AppCookieData";
import Cookie from "js-cookie";

const useCookieStore = defineStore("useCookieStore", () => {
	const cookieData = reactive<AppCookieData>(useCookie());
	const handleCookieData = (obj: Partial<AppCookieData>) => {
		Object.assign(cookieData, obj);
		type Key = keyof AppCookieData;
		let k: Key;
		for (k in obj) {
			Cookie.set(k, obj[k]?.toString() || "");
		}
	};
	return {
		cookieData,
		handleCookieData
	};
});

export default useCookieStore;
