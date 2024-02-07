module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ["eslint:recommended", "plugin:vue/vue3-essential", "plugin:@typescript-eslint/recommended"],
	overrides: [
		{
			files: ["*.d.ts", "src/types/*", "src/**/apis.ts"],
			rules: {
				"no-unused-vars": 0
			}
		}
	],
	parser: "vue-eslint-parser",
	parserOptions: {
		ecmaVersion: "latest",
		parser: "@typescript-eslint/parser",
		sourceType: "module"
	},
	plugins: ["vue", "@typescript-eslint"],
	rules: {
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"vue/valid-define-emits": 0,
		"@typescript-eslint/ban-ts-comment": 0,
		"vue/multi-word-component-names": 0,
		"vue/no-mutating-props": 0,
		"prefer-template": 2,
		"@typescript-eslint/no-explicit-any": 2,
		"linebreak-style": 0,
		"no-debugger": 1,
		"no-mixed-spaces-and-tabs": 0,
		"vue/no-setup-props-destructure": 0,
		"no-undef": 0,
		"max-params": ["error", 3],
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_" // 使用正则匹配需要忽略的参数
			}
		]
	}
};