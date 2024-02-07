/**
 * 这是一个图片展示的指令，用于在ios14及以下展示png类型的图片，ios14以上使用webp类型的图片， 安卓一律使用webp类型的图片
 */
import { Directive, DirectiveBinding } from "vue";
import handleApp from "entities/HandleApp";

const ENV = import.meta.env;

interface OnError {
	(): void;
}

export interface ShowImageDirective {
	src: string;
	onError?: OnError;
	isBack?: boolean;
}

interface HandleImg {
	ele: HTMLImageElement;
	src: string;
	onError: OnError;
}

interface HandleBackImg {
	ele: HTMLDivElement;
	src: string;
	onError: OnError;
}

let baseDir = `${location.origin}${location.pathname}`;
let errorPath = "";
if (ENV.MODE === "development") {
	baseDir += "public/";
}
baseDir += "images";
errorPath = `${baseDir}/error/error.png`;
// 正常图片处理
const handleImg = ({ ele, src, onError }: HandleImg) => {
	const [dirPath, fileName] = src.split("/");
	if (handleApp.agent === "ios" && handleApp.iosVersion.minorVersion < 14) {
		ele.src = `${baseDir}/${dirPath}/png/${fileName}.png`;
	} else {
		ele.src = `${baseDir}/${dirPath}/webp/${fileName}.webp`;
	}
	ele.onerror = onError;
};
// 背景图片处理
const handleBackImg = ({ ele, src, onError }: HandleBackImg) => {
	let image: HTMLImageElement | null = new Image();
	image.onload = () => {
		image = null;
	};
	image.onerror = () => {
		onError();
		image = null;
	};
	const [dirPath, fileName] = src.split("/");
	if (handleApp.agent === "ios" && handleApp.iosVersion.minorVersion < 14) {
		// ios版本小于14，则使用png类型的图片
		ele.style.backgroundImage = `url(${baseDir}/${dirPath}/png/${fileName}.png)`;
		image.src = `${baseDir}/${dirPath}/png/${fileName}.png`;
	} else {
		ele.style.backgroundImage = `url(${baseDir}/${dirPath}/webp/${fileName}.webp)`;
		image.src = `${baseDir}/${dirPath}/webp/${fileName}.webp`;
	}
};
const render = (ele: HTMLImageElement, binding: DirectiveBinding<ShowImageDirective | string>, vNode: globalThis.VNode) => {
	let src: string;
	let onError: OnError = () => {
		ele.src = errorPath;
	};
	if (vNode.props?.onError) {
		onError = vNode.props.onError;
	}
	if (typeof binding.value === "string") {
		// 默认是img标签， 进行src处理和错误函数绑定
		src = binding.value;
		handleImg({ ele, src, onError });
	} else {
		src = binding.value.src;
		binding.value.onError && (onError = binding.value.onError);
		if (binding.value.isBack) {
			// 默认是div 标签 是背景图片处理
			onError = () => {
				ele.style.backgroundImage = `url(${errorPath})`;
			};
			if (vNode.props?.onError) {
				onError = vNode.props.onError;
			}
			handleBackImg({ ele, src, onError });
		} else {
			// img标签 进行src处理和错误函数绑定
			handleImg({ ele, src, onError });
		}
	}
};

const vShowImg: Directive = {
	beforeMount(ele, binding: DirectiveBinding<ShowImageDirective | string>, vNode) {
		const value = binding.value;
		if (isProxy(value)) watch(() => value, render.bind(null, ele, binding, vNode), { deep: true });
		render(ele, binding, vNode);
	}
};

export default vShowImg;
