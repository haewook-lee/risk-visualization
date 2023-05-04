/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    // themes: [
    //   "light",
    //   "dark",
    //   "retro",
    //   {
    //     mytheme: {
    //       primary: "#382D62",
    //       secondary: "#e28f7c",
    //       accent: "#ba2c46",
    //       neutral: "#1D1622",
    //       "base-100": "#EEEEF2",
    //       info: "#7B9AEA",
    //       success: "#178C71",
    //       warning: "#FBB85B",
    //       error: "#F9668E",
    //     },
    //   },
    // ],
    themes: [
      {
        mytheme: {
          primary: "#369e09",

          secondary: "#9bc5f7",

          accent: "#afffd6",

          neutral: "#161E27",

          "base-100": "#EDE9F1",

          info: "#418DF1",

          success: "#33CCBA",

          warning: "#EEC159",

          error: "#EA7571",
        },
      },
    ],
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
