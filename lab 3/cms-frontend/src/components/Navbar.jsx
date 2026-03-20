import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  color: isActive ? "#fff" : "#d1d5db",
  background: isActive ? "#2563eb" : "transparent",
  padding: "10px 14px",
  borderRadius: "8px",
  fontWeight: "600",
});

export default function Navbar() {
  return (
    <nav
      style={{
        background: "#111827",
        padding: "16px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "#fff", marginRight: "20px" }}>CMS Admin</h2>

        <NavLink to="/posts" style={linkStyle}>
          Bài viết
        </NavLink>

        <NavLink to="/themes" style={linkStyle}>
          Theme
        </NavLink>

        <NavLink to="/plugins" style={linkStyle}>
          Plugin
        </NavLink>
      </div>
    </nav>
  );
}
