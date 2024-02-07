import { ref, watch } from "vue";
import router from "@/router";
import useAnimationStore from "@/store/useAnimationStore";
type AnimationName = "gIn" | "gOut" | "";
export default () => {
	const animationStore = useAnimationStore();
	const animationName = ref<AnimationName>("");
	watch(
		() => router.currentRoute.value.path,
		() => {
			if (!animationStore.animationData.isFirst) {
				if (animationStore.animationData.trigger) {
					animationName.value = animationStore.animationData.isBack ? "gOut" : "gIn";
				}
			} else {
				animationStore.handleAnimationData({ isFirst: false });
			}
		}
	);
	return {
		animationName
	};
};
