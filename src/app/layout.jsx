import { Poppins } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
const poppins = Poppins({
  weight: ["200", "400", "500", "600", "700"],
});

const RootLayout = ({ children }) => {
  return (
    <NextAuthProvider>
      <html className={`${poppins.className}`}>
        <body className="">{children}</body>
      </html>
    </NextAuthProvider>
  );
};
export default RootLayout;
