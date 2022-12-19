/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        "kBgWhite": "#fefefe",
        "kSkyBlue": "#8ed7ec",
        "kDarkBlue": "#08152c",
        "kOrange": "#f87125"
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
