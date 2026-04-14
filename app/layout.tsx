import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <nav style={{ padding: "10px", borderBottom: "1px solid gray" }}>
          <Link href="/">Home</Link> |{" "}
          <Link href="/blog">Blog</Link> |{" "}
          <Link href="/add">Add Blog</Link>
        </nav>

        <main style={{ padding: "20px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}