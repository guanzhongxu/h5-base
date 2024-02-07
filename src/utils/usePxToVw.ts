// px 转 vw
// 重要: UI设计稿的宽度 需要和vite.config.ts 中的一致！！！
const viewportWidth = 375;
export default (size: number) => `${(size / viewportWidth) * 100}vw`;
