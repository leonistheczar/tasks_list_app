/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/.{html}", "./js/*{.js}"],
  theme: {
    screens: {
      // For mobile screens
      'sm':  '319px',
      // For larger mobiles screens or Tablets
      'md':  '768px',
      // Generally for small sized laptops (notebooks)
      'lg':  '1024px',
      // For larger screens (Monitors)
      'xl': '1440px',
    },
    extend: {},
    fontFamily: {
      'DM Sans': 'DM Sans , sans-serif',
    },
  },
  plugins: [],
}

