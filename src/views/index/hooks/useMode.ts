const modeList = [
	{
		label: "缩小优先",
		value: "volume"
	},
	{
		label: "清晰优先",
		value: "quality"
	},
	{
		label: "自定义",
		value: "custom"
	}
];

const useMode = () => {
	const currentMode = ref(modeList[0].value);
	const handleMode = (value: string) => {
		currentMode.value = value;
	};
	return {
		currentMode,
		handleMode,
		modeList
	};
};

export default useMode;
