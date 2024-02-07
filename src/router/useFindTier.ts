import { RouteMeta } from "vue-router";

export default () => {
	const temp = import.meta.glob<RouteMeta>("../views/**/pageConfig.ts", {
		eager: true,
		import: "default"
	});
	return Object.entries<RouteMeta>(temp);
};
