import { Http } from "foreign-country-utils";
import requestError from "@/request/requestError";
import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import usePrint from "@/request/usePrint";
const ENV = import.meta.env;
const baseUrl = ENV.VITE_BASE_URL;
const timeout = 30 * 1000;

// 以下是基础请求，可自行添加加密方式
export const http = new Http(baseUrl, timeout, {}, [
	{
		request: {
			before(config: InternalAxiosRequestConfig) {
				// 请求前添加
				const { data, method, params, url = "" } = config;
				// 打印请求参数
				if (method === "get") {
					ENV.MODE !== "production" && usePrint(params || {}, method, url);
				}
				if (method === "post") {
					ENV.MODE !== "production" && usePrint(data || {}, method, url);
				}
				return config;
			}
		},
		response: {
			success(result) {
				// 请求后添加
				return result;
			},
			error(err) {
				// 请求错误提醒
				requestError(err.message);
				return Promise.reject(err);
			}
		}
	}
]);

export const get = <T, D = DataObj>(url: string, params?: D, config?: AxiosRequestConfig<D>): Promise<BaseResponse<T>> =>
	http.get(url, params, config);
export const post = <T, D = DataObj>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<BaseResponse<T>> =>
	http.post<BaseResponse<T>, D>(url, data, config);
export const upload = <T>(url: string, data: FormData, config?: AxiosRequestConfig): Promise<BaseResponse<T>> =>
	http.upload<BaseResponse<T>>(url, data, config);
export const remove = <T, D = DataObj>(url: string, params?: D, config?: AxiosRequestConfig<D>) =>
	http.delete<BaseResponse<T>, D>(url, params, config);
export const put = <T, D = DataObj>(url: string, params?: D, config?: AxiosRequestConfig<D>) => http.put<BaseResponse<T>, D>(url, params, config);
