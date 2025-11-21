/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.2 } },
        float: { '0%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-6px)' }, '100%': { transform: 'translateY(0px)' } }
      },
      animation: {
        blink: 'blink 1s infinite',
        float: 'float 4s ease-in-out infinite'
      },
      colors: {
        botGreen: '#D1FAE5',
        userYellow: '#FEF3C7',
        chaos: '#FFEDD5'
      }
    }
  },
  plugins: []
}
