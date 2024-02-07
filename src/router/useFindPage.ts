const components = import.meta.glob("../views/**/*.vue");
// 查询vue文件
export default (key: string) => components[key];
