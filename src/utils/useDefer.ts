import { Ref } from "vue";

export default <T>(arr: T[] | string) => {
	let currentTrack: Ref<number> | null = ref(0);
	let timer = 0;
	let total = arr.length;
	if (isProxy(arr)) {
		watch(
			() => arr,
			() => {
				total = arr.length;
				cancelAnimationFrame(timer);
				draw(total);
			},
			{
				deep: true
			}
		);
	}
	const draw = (total: number) => {
		if (currentTrack) {
			if (currentTrack.value > total) {
				cancelAnimationFrame(timer);
				return;
			}
			currentTrack.value++;
		}
		timer = requestAnimationFrame(draw.bind(null, total));
	};
	onUnmounted(() => {
		currentTrack = null;
	});
	return (current: number) => {
		if (timer === 0) draw(total);
		if (currentTrack) {
			return currentTrack.value > current;
		}
		return false;
	};
};
