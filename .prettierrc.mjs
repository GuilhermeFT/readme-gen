/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */

const config = {
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  bracketSameLine: false,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['tv', 'cva'],
}

export default config
