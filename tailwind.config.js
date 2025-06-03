/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        today: "#FFDEB0",
        leave: "#00A85F",
        holidays: "#E6F6EF",
        wfh: "#FF9500",
        late: "#E14A09",
        appointments: "#9313D8",
        projects: "#009DFF",
        notes: "#0076BF",
        holidaybar: "#B0E4CD"
      }
    }
  },
  plugins: []
};
