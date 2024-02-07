import useCookieStore from "@/store/useCookieStore";
import piniaObj from "@/store/pinia";
const cookieStore = useCookieStore(piniaObj);
export default () => {
	const hasPt = ref(cookieStore.cookieData.platform === "app");
	return {
		hasPt
	};
};
