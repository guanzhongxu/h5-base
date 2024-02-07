import dayjs from "dayjs";

const proxyColors = () => {
	let index = 0;
	const consoleColors: string[] = ["#409eff", "#67c23a", "#e6a23c", "#f56c6c"];
	return {
		get() {
			return consoleColors[index++ % consoleColors.length];
		}
	};
};
const colors = proxyColors();
export default <T>(params: T, method: "get" | "post", url: string) => {
	if (typeof params === "object") {
		console.log(
			"%c %s %c %s %c %s %c %s",
			`color:${colors.get()};`,
			`请求时间:${dayjs().format("YYYY-MM-DD HH:mm:ss")},`,
			`color:${colors.get()};`,
			`请求方法:${method},`,
			`color:${colors.get()};`,
			`请求地址:${url},`,
			`color:${colors.get()};`,
			`请求参数:${JSON.stringify(params)};`
		);
	}
};
