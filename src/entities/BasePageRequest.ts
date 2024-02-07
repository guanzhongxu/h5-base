import { IsInt } from "class-validator";
import BaseEntities from "entities/BaseEntities";
// 分页请求需要继承类，已自己继承了BaseEntities类
export default abstract class BasePageRequest extends BaseEntities {
	@IsInt({ message: "page 必须为number类型" })
	page = 1;
	@IsInt({ message: "page_size 必须为number类型" })
	page_size = 10;
}
