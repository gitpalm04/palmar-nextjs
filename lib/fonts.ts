import localFont from "next/font/local"

export const kanit = localFont({
  src: [
    {
      path: "../fonts/Kanit/Kanit-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Kanit/Kanit-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Kanit/Kanit-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-kanit",
})