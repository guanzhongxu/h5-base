import router from "@/router";

/**
 * 如何是在微信内则 标题为空，否则标题为pageConfig.ts中的 title 字段的值
 */
interface IParams {
	title: string;
}
const isWeiXin = navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
export default ({ title = "" }: IParams) => {
	const defaultTitle = ref("");

	const initDefaultTitle = () => {
		const pageTitle = router.currentRoute.value.meta.title || "";
		document.title = title.length > 0 ? title : pageTitle.toString();
		if (isWeiXin) {
			defaultTitle.value = "";
		} else if (pageTitle && typeof pageTitle === "string") {
			defaultTitle.value = document.title;
		}
	};
	initDefaultTitle();
	onActivated(initDefaultTitle);
	return {
		defaultTitle
	};
};
