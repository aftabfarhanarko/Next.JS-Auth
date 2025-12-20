import { Poppins } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import Navbar from "@/components/Navbar";
const poppins = Poppins({
  weight: ["200", "400", "500", "600", "700"],
});

const RootLayout = ({ children }) => {
  return (
    <NextAuthProvider>
      <html className={`${poppins.className}`}>
        <body className="">
          <Navbar></Navbar>
          {children}
          
          </body>
      </html>
    </NextAuthProvider>
  );
};
export default RootLayout;
