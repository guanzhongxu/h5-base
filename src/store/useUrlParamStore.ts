import { defineStore } from "pinia";
import { reactive } from "vue";
import useUrlData from "@/utils/useUrlData";
import { useStorage } from "foreign-country-utils";
import { encode } from "@/utils/useCrypto";
const { set } = useStorage();
type UrlData = Record<string, string>;
const useUrlParamStore = defineStore("useUrlParamStore", () => {
	const urlData = reactive<UrlData>(useUrlData());
	function handleUrlData(key: keyof UrlData | UrlData, value?: UrlData[keyof UrlData] | null) {
		if (typeof key === "string") {
			if (value) {
				urlData[key] = value;
			} else {
				delete urlData[key];
			}
		} else {
			Object.assign(urlData, key);
		}
		const temp: Record<string, string> = {};
		for (const k in urlData) {
			temp[encode(k)] = encode(urlData[k]);
		}
		set(encode("useUrlParamStore"), temp);
	}
	handleUrlData(urlData);
	return {
		urlData,
		handleUrlData
	};
});

export default useUrlParamStore;
