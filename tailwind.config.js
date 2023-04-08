/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        kanban: {
          blue: '#2266e1',
          green: '#7cf6a6',
          purple: '#aa30ff',
          gray: '#fafafa',
        },
      },
      screens: {
        xs: '540px',
        // => @media (min-width: 540px) { ... }
      },
      boxShadow: {
        '3xl': '0px 16px 70px rgba(0, 0, 0, 0.5)',
      },
      opacity: {
        65: '0.65',
      },
    },
  },
  plugins: [],
};
