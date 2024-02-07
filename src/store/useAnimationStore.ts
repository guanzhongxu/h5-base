import { defineStore } from "pinia";
import { reactive } from "vue";

interface AnimationData {
	isBack: boolean;
	trigger: boolean;
	isFirst: boolean;
}

export default defineStore("useAnimationStore", () => {
	const animationData = reactive<AnimationData>({
		isBack: false,
		trigger: false,
		isFirst: true
	});
	const handleAnimationData = (param: Partial<AnimationData>) => {
		Object.assign(animationData, param);
	};

	return {
		animationData,
		handleAnimationData
	};
});
