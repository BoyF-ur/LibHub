/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    fontFamily: {
      display: ['Kumbh Sans', "Poppins", "sans-serif"],
      NunitoSans: ['Nunito Sans','san-serif'],
    },
    extend: {
      colors:{
        primary: "#05B6D3",
        secondary: "#EF863E",
        pornhub: { 
          200: '#ff9900',
          300: '#ffbb00',
        }
      },
      screens:{
        md:"501px",
        sm:"430px",
        lg:"772px",
        vsm:"100px",
        vlg:"910px"
      }
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
  plugins: [],
}