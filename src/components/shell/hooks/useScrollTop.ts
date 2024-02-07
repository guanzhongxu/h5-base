import { ListInstance } from "vant";
export default () => {
	const shellRef = ref<ListInstance>();
	const scrollTop = ref(0);

	onActivated(() => {
		const ele = shellRef.value;
		if (ele) {
			ele.$el.scrollTo({
				left: 0,
				top: scrollTop.value
			});
		}
	});
	const onScroll = (ele: HTMLElement) => {
		scrollTop.value = ele.scrollTop;
	};
	const bindScroll = () => {
		const ele = shellRef.value?.$el;
		if (ele) {
			ele.addEventListener("scroll", onScroll.bind(null, ele));
		}
	};
	const unBindScroll = () => {
		const ele = shellRef.value?.$el;
		if (ele) {
			ele.removeEventListener("scroll", onScroll.bind(null, ele));
		}
	};
	onMounted(bindScroll);
	onUnmounted(unBindScroll);

	return {
		shellRef,
		scrollTop
	};
};
