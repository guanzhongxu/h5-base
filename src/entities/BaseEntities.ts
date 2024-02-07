import { plainToInstance, ClassConstructor } from "class-transformer";
import { validate, ValidationError, ValidatorOptions } from "class-validator";
const defaultValidatorOptions: ValidatorOptions = {
	skipMissingProperties: false,
	stopAtFirstError: true,
	forbidUnknownValues: true
};

// 基础的数据校验类型， 包含了指定的数据校验、平面对象转类对象
export default abstract class BaseEntities {
	[key: string]: unknown;
	/**
	 * 验证对象是否符合数据格式
	 * @param config
	 */
	public async validator(config: ValidatorOptions = {}) {
		const errors = await validate(this, { ...defaultValidatorOptions, ...config });
		return BaseEntities.findError(errors);
	}

	/**
	 * 平面对象转换类对象
	 * @param Obj
	 * @param planObj
	 */
	public static transform<T>(Obj: ClassConstructor<T>, planObj: object): T {
		if (planObj instanceof Obj) return planObj;
		return plainToInstance(Obj, planObj);
	}

	private static findError(errors: ValidationError[], resultArr: string[] = []): string[] {
		const arr = errors.map(item => item.constraints);
		arr.forEach(item => {
			if (item) resultArr.push(...Object.values(item));
		});
		errors.forEach(item => {
			if (item && item.children) {
				BaseEntities.findError(item.children, resultArr);
			}
		});
		return resultArr;
	}
}
