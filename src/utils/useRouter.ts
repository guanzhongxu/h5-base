import router from "@/router";
import { RouteLocationRaw } from "vue-router";
import useAnimationStore from "@/store/useAnimationStore";
import { throttle } from "lodash";
import useCacheRouter from "@/store/useCacheRouter";
import piniaObj from "@/store/pinia";
const wait = 250;
const cacheRouterStore = useCacheRouter(piniaObj);
export default () => {
	const animationStore = useAnimationStore();
	const push = throttle(async (to: RouteLocationRaw) => {
		const routerName = router.currentRoute.value.name;
		if (routerName) cacheRouterStore.handleRouter(routerName.toString());
		animationStore.handleAnimationData({
			isBack: false,
			trigger: true
		});
		await router.push(to);
		reduction();
	}, wait);

	const go = throttle(async (delta: number) => {
		const routerName = router.currentRoute.value.name;
		if (routerName) cacheRouterStore.handleRouter(routerName.toString(), true);
		animationStore.handleAnimationData({
			isBack: true,
			trigger: true
		});
		router.go(delta);
		reduction();
	}, wait);

	// 还原
	const reduction = () => {
		setTimeout(() => {
			animationStore.handleAnimationData({
				isBack: false,
				trigger: false
			});
		}, wait);
	};

	return {
		push,
		go
	};
};
