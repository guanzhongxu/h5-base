type BaseType = symbol | string | number | null | unknown | boolean;
interface BaseResponse<T> {
	data: T;
	msg: string;
	code: number;
}

interface DataObj {
	[key: string]: BaseType | Array<BaseType> | Array<Record<string, BaseType>>;
}
