import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f8" }}>
      <Navbar />
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "24px" }}>
        <Outlet />
      </main>
    </div>
  );
}
