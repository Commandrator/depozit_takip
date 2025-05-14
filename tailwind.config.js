/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        'canvas': 'Canvas',
        'canvas-text': 'CanvasText',
        'link-text': 'LinkText',
      },
    },
  },
  plugins: [],
}