/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kanban: {
          blue: "#2266e1",
          green: "#7cf6a6",
          purple: "#aa30ff",
          gray: "#dfdfe4",
        },
      },
    },
  },
  plugins: [],
};
