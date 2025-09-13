/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gilroy: ['Gilroy', 'sans-serif'],
      },
      animation: {
        shimmer: "shimmer 1.5s infinite linear",
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backgroundImage: {
        shimmer: "linear-gradient(to right, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
