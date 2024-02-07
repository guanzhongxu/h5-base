import { createRouter, createWebHashHistory } from "vue-router";
import BASEURL from "@/router/baseUrl";
import useCreateRoutes from "@/router/useCreateRoutes";
const router = createRouter({
	history: createWebHashHistory(BASEURL),
	routes: useCreateRoutes()
});
export default router;
