/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        light: {
        
"primary": "#609966",
        
"secondary": "#9DC08B",
        
"accent": "#EDF1D6",
        
"neutral": "#40513B",
        
"info": "#33A9D1",
        
"success": "#48E5B6",
        
"warning": "#EBB505",
        
"error": "#F54D74",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
