import { RouteMeta, RouteRecordRaw } from "vue-router";
import useFindTier from "@/router/useFindTier";

export default () => {
	const components = import.meta.glob("../views/**/*.vue");
	const routes: RouteRecordRaw[] = [];
	const obj: Record<number, { path: string; mate: RouteMeta }[]> = {};
	useFindTier().map(([path, mate]) => {
		const key = path.replace("/pageConfig.ts", "").split("/").length;
		if (!obj[key]) {
			obj[key] = [];
		}
		obj[key].push({
			path,
			mate
		});
	});
	const tempRouter: RouteRecordRaw[] = [];
	const createR = (arr: { path: string; mate: RouteMeta }[], tier: number) => {
		arr.forEach(item => {
			const temp = item.path.replace("/pageConfig.ts", "");
			const last = temp.split("/")?.pop() || "";
			const name = `${last.slice(0, 1).toUpperCase()}${last.slice(1)}`;
			const lastPath = `/${name}.vue`;
			let path = item.path.replace("../views", "").replace("/pageConfig.ts", "");
			path = `/${path.split("/").filter(Boolean).join("/")}`;
			const route: RouteRecordRaw = {
				path,
				name,
				component: components[`${temp}${lastPath}`],
				meta: item.mate,
				children: [],
				redirect: undefined
			};
			if (tier === 0) {
				routes.push(route);
			} else {
				const has = tempRouter.filter(i => temp.includes(i.path));
				const redirect = route.path;
				route.path = route.path.split("/").at(-1) || "";
				const obj: RouteRecordRaw = has.length === 1 ? has[0] : (has.at(-1) as RouteRecordRaw);
				obj.children?.push(route);
				if (item.mate.redirect) {
					obj.redirect = redirect;
				}
			}
			tempRouter.push(route);
		});
	};
	let i = 0;
	for (const objKey in obj) {
		createR(obj[objKey], i);
		i++;
	}
	routes.push({
		path: "/:pathMatch(.*)*",
		redirect: "/index"
	});

	return routes;
};
