/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        default: {
          primary: "#609966",

          secondary: "#9DC08B",

          accent: "#EDF1D6",

          neutral: "#40513B",

          info: "#33A9D1",

          success: "#48E5B6",

          warning: "#EBB505",

          error: "#F54D74",
        },
      },
      {
        cl_redbull: {
          primary: "#E74646",

          secondary: "#FA9884",

          accent: "#FFF3E2",

          neutral: "#E74646",

          info: "#33A9D1",

          success: "#48E5B6",

          warning: "#EBB505",

          error: "#F54D74",
        },
      },
      {
        cl_bluedream: {
          primary: "#0B2447",

          secondary: "#576CBC",

          accent: "#A5D7E8",

          neutral: "#0B2447",

          info: "#33A9D1",

          success: "#48E5B6",

          warning: "#EBB505",

          error: "#F54D74",
        },
      },
      {
        cl_blackberry: {
          primary: "#000000",

          secondary: "#000000",

          accent: "#1c1c1c",

          neutral: "#0E8388",

          info: "#33A9D1",

          success: "#48E5B6",

          warning: "#EBB505",

          error: "#F54D74",
        },
      },
      {
        cl_teal: {
          primary: "#100F0F",

          secondary: "#0F3D3E",

          accent: "#E2DCC8",

          neutral: "#100F0F",

          info: "#33A9D1",

          success: "#48E5B6",

          warning: "#EBB505",

          error: "#F54D74",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
