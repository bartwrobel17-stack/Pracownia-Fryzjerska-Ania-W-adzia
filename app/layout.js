import "./globals.css";

export const metadata = {
  title: "Ania&Władzia | Pracownia Fryzjerska",
  description: "Pracownia Fryzjerska Ania&Władzia we Wrocławiu."
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
