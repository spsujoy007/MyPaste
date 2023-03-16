/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        light: {
        
"primary": "#3B8FF3",
        
"secondary": "#BFDBFE",
        
"accent": "#ca60f7",
        
"neutral": "#1A2028",
        
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
