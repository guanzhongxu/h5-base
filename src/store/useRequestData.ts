import { defineStore } from "pinia";
import { reactive } from "vue";

const useRequestData = defineStore("useRequestData", () => {
	const requestData = reactive<Record<string, string>>({});
	const handle = (key: string, value: string | null) => {
		if (value) {
			requestData[key] = value;
		} else {
			delete requestData[key];
		}
	};

	return {
		handle,
		requestData
	};
});
export default useRequestData;
