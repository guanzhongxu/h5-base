import "reflect-metadata";
import { createApp } from "vue";
import App from "views/app/App.vue";
import pinia from "@/store/pinia";
import router from "@/router";
import { Lazyload } from "vant";
import vShowImg from "@/directives/showImage";

const app = createApp(App);
app.use(pinia);
app.directive("showImage", vShowImg);
app.use(Lazyload, {
	lazyComponent: true
});
app.use(router);
app.mount("#app");
