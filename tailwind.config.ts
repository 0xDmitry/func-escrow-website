import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anonymousPro: ["var(--anonymous-pro)"],
        courierNew: ["var(--font-courier-new)", "monospace"],
      },
      colors: {
        cover: "var(--cover)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        codePanel: "#24292e",
      },
      animation: {
        cursorBlink: "blink 1.1s step-end infinite 2s",
      },
      keyframes: {
        blink: {
          from: {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          to: {
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
