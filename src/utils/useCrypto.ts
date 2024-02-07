import { enc, AES, mode, pad } from "crypto-js";

const { Pkcs7 } = pad;
const { ECB } = mode;
const key = "gxsysj";
const config = {
	mode: ECB,
	padding: Pkcs7
};
export const encode = (value: string) => {
	return AES.encrypt(value, enc.Utf8.parse(key), config).toString();
};

export const decode = (value: string) => {
	return AES.decrypt(value, enc.Utf8.parse(key), config).toString(enc.Utf8);
};
