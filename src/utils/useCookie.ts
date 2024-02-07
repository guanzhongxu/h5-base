import Cookies from "js-cookie";
export default () => {
	const obj: Record<string, string> = Cookies.get();
	return obj;
};
