/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#05B6D3",
        secondary: "#EF863E",
        pornhub: { 
          200: '#ff9900',
          300: '#ffbb00',
        }
      },
      fontFamily: {
        KumbhSans: ['Kumbh Sans', 'san-serif'],
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-in-out',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}

