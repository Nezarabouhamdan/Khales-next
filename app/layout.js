import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import "../fonts/style.css";
import ClientProviders from "@/provider/ClientProvaders";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import { footerData } from "../data/FooterData";
import StyledComponentsRegistry from "@/utils/registry";

export const metadata = {
  title: "Home",
  description:
    "Welcome to Khales. Explore our luxury design and project management solutions.",
  keywords: [
    "Khales",
    "Luxury Design",
    "Interior Design",
    "Architecture",
    "Project Management",
    "Construction",
    "Khales Projects",
  ],
  authors: [{ name: "Khales Team", url: "https://www.khales.ae/" }],
  creator: "Khales",
  metadataBase: new URL("https://www.khales.ae/"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StyledComponentsRegistry>
          <ClientProviders>
            <div className="uc-embed" uc-embed-show-toggle="true"></div>
            <Navbar />
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
            />
            <Link
              href="https://api.whatsapp.com/send?phone=+971504204279&text=مرحبا! "
              className="float"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-whatsapp my-float"></i>
            </Link>
            <main>{children}</main>
            <Footer footerData={footerData} />
          </ClientProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
