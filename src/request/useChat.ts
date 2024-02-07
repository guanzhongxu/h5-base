export default () => {
	const lowercase = [...Array(26)].map((item, index) => index + 97).map(item => String.fromCharCode(item));
	const numCase = [...Array(10)].map((item, index) => index + 48).map(item => String.fromCharCode(item));
	const uppercase = [...Array(26)].map((item, index) => index + 65).map(item => String.fromCharCode(item));
	return [...numCase, ...uppercase, ...lowercase];
};
