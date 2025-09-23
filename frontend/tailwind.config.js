module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        accent: "#FF8C42",
        gold: "#D4AF37",
        success: "#10B981",
        neutralBg: "#F8FAFC"
      },
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui"] }
    }
  },
  plugins: []
}
