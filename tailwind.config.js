import { blackA } from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...blackA,
      },
      screens: {
        xs: '460px',
      },
    },
  },
  plugins: [],
}
