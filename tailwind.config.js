module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: { max: "767px" },
        xxl: "1980px",
      },
      fontSize: {
        "13px": "13px",
        // base: "0.75rem",
        // xs: "0.65rem",
      },
      colors: {
        delta: { 400: "#A1A199", 500: "#95958C" },
        mercury: "#E5E5E5",
        mercury2: "#E4E4DA",
        cararra: "#F3F2EE",
        chicago: "#616153",
      },
      margin: {
        "120px": "120px",
      },
      fontFamily: {
        timesnow: ["Times Now", "serif"],
        beviet: ["Be Vietnam Pro", "sans-serif"],
      },
      letterSpacing: {
        "2em": ".2em",
      },
    },
  },
  plugins: [],
};
