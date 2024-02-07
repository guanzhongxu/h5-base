/**
 * 这是一个倒计时的worker
 * 入参是一个对象(使用的时候用注意JSON.stringify) 如： {
 *   type: string,
 *   data: jsonString
 * }
 * 当前函数 只接收type等于countDown的消息
 * data转成对象之后的数据结构如下: {
 *   targetTimeEventName: string,
 *   targetTime: string | number
 * }
 */
interface Data {
	targetTimeEventName: string;
	targetTime: string | number;
}

import dayjs, { Dayjs } from "dayjs";
self.onmessage = ev => {
	try {
		const { type, data } = ev.data;
		//  倒计时函数
		if (type === "countDown") {
			const { targetTimeEventName, targetTime } = JSON.parse(data) as Data;
			if (!targetTimeEventName || !targetTime) {
				self.postMessage({
					type: "error",
					message: "定时器参数不正确"
				});
				return;
			}
			countDown(dayjs(targetTime), targetTimeEventName);
		}
	} catch {
		self.postMessage({
			type: "error",
			message: "定时器参数不正确"
		});
	}
};
// 倒数计时
const countDown = (targetTime: Dayjs, targetTimeEventName: string) => {
	let timer = 0;
	const handleCount = () => {
		if (targetTime <= dayjs()) {
			//时间到了
			cancelAnimationFrame(timer);
			timer = 0;
			self.postMessage({
				type: "countDown",
				data: JSON.stringify({
					targetTimeEventName
				})
			});
		} else {
			timer = requestAnimationFrame(handleCount);
		}
	};
	handleCount();
};

export {};
