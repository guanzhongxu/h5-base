import { useWindowSize } from "@vant/use";
import { debounce } from "lodash";
export default () => {
	const ele: HTMLDivElement | null = document.querySelector("#app");
	const setSize = debounce(() => {
		const { width, height } = useWindowSize();
		if (ele) {
			ele.style.width = `${width.value}px`;
			ele.style.height = `${height.value}px`;
		}
	}, 100);
	setSize();
	window.addEventListener("resize", setSize);
};
