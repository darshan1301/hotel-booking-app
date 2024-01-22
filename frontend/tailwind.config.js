/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Overwrite the default sans-serif font
        serif: ["Roboto", "serif"], // Overwrite the default serif font
        mono: ["Courier New", "monospace"], // Overwrite the default monospace font
      },
    },
  },
  plugins: [],
};
