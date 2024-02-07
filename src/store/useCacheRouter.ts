import { defineStore } from "pinia";

const useCacheRouter = defineStore("useCacheRouter", () => {
	const cacheRouter = reactive<string[]>([]);
	/**
	 * 处理缓存路由
	 * @param routerName 要处理的路由名字
	 * @param isDelete 是否要从缓存列表中删除要处理的路由名字
	 */
	const handleRouter = (routerName: string, isDelete = false) => {
		if (isDelete) {
			deleteRouter(routerName);
		} else {
			addRouter(routerName);
		}
	};

	const addRouter = (routerName: string) => {
		const routerIndex = cacheRouter.findIndex(item => item === routerName);
		if (routerIndex === -1) cacheRouter.push(routerName);
	};
	const deleteRouter = (routerName: string) => {
		const deleteRouterIndex = cacheRouter.findIndex(item => item === routerName);
		if (deleteRouterIndex !== -1) cacheRouter.splice(deleteRouterIndex, 1);
	};
	return {
		cacheRouter,
		handleRouter
	};
});

export default useCacheRouter;
