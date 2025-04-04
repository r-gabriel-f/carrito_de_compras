/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      backgroundImage: {
        'fondo': "url('/src/assets/img/fondo.webp')",
      },
    },
  },
  plugins: [],
}
