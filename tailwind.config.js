/** @type {import('tailwindcss').Config} */
const figmaVariables = require('./figma-exports/extend_config.js');

module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      ...figmaVariables.theme.extend
    },
  },
  plugins: [],
}
