import { customRef } from "vue";
export default <T>(value: T, wait = 1000) => {
	let timer = 0;
	return customRef((track, trigger) => {
		return {
			get() {
				track();
				return value;
			},
			set(val: T) {
				clearTimeout(timer);
				timer = window.setTimeout(() => {
					clearTimeout(timer);
					value = val;
					trigger();
				}, wait);
			}
		};
	});
};
