const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-blue": "#9cdbff",
        "teal": "#2ce4e7",
        "dark-blue": "#0F131F",
    },
  },
  plugins: [],
}
});
