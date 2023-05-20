/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeInOut: "fadeInOut 3s infinite",
      },
      keyframes: {
        fadeInOut: {
          "0%": { opacity: 0, "backdrop-filter": "blur(5px)" },
          "50%": { opacity: 1, "backdrop-filter": "blur(0)" },
          "100%": { opacity: 0, "backdrop-filter": "blur(5px)" },
        },
      },
      colors: {
        "custom-blue-1": "#15203B",
        "custom-blue-2": "#1B2B52",
        "custom-blue-3": "#16203B",
      },
      backgroundImage: (theme) => ({
        "gradient-custom": "linear-gradient(to right, var(--tw-gradient-stops))",
      }),
    },
  },
  plugins: [],
};
