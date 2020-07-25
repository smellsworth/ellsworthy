/**
 * This file is created just for svelte-check command
 * to make it aware about includePaths param of scss
 */
const sveltePreprocess = require("svelte-preprocess")

const preprocess = sveltePreprocess({
  postcss: true,
  scss: {
    includePaths: ["src/style-utils"],
  },
})

module.exports = {
  preprocess,
  dev: true,
  hydratable: true,
  emitCss: true,
}
