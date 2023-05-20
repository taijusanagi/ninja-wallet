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
        "custom-1": "#15203B",
        "custom-2": "#1B2B52",
        "custom-3": "#1E2845",
        "custom-4": "#414970",
      },
      backgroundImage: (theme) => ({
        "gradient-custom": "linear-gradient(to right, var(--tw-gradient-stops))",
      }),
    },
  },
  plugins: [],
};
