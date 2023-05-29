/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        container: "850px",
        containerCampaign: "420px",
        containerDetails: "790px",
        containerCampaignEmpty: "175px",
      },
      width: { container: "798px", containerCampaign: "798px" },
      colors: {
        superfluid: {
          100: "#6AC886",
          200: "#6FD08C33",
        },
        darkBlue: "#001B2E",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
