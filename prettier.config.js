// /** @type {import('prettier').Config} */
export default {
	singleQuote: false,
	semi: true,
	bracketSpacing: true,
	trailingComma: "all",
	printWidth: 100,
	tabWidth: 2,
	useTabs: false,
	endOfLine: "lf",

	plugins: ["prettier-plugin-tailwindcss"],
	tailwindFunctions: ["cn", "cva"],
};