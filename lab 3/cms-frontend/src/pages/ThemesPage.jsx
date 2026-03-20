import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ThemesPage() {
  const [themes, setThemes] = useState([]);

  const fetchThemes = async () => {
    try {
      const res = await api.get("/themes");
      setThemes(res.data);
    } catch (error) {
      console.error("Lỗi lấy theme:", error);
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const handleActivate = async (id) => {
    try {
      await api.put(`/themes/activate/${id}`);
      fetchThemes();
    } catch (error) {
      console.error("Lỗi kích hoạt theme:", error);
    }
  };

  return (
    <div>
      <h1>Quản lý theme</h1>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        {themes.length === 0 ? (
          <p>Không có theme nào.</p>
        ) : (
          themes.map((theme) => (
            <div
              key={theme.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>{theme.name}</h3>
                <p style={{ margin: "4px 0 0", color: "#666" }}>
                  {theme.is_active ? "Đang sử dụng" : "Chưa kích hoạt"}
                </p>
              </div>

              {!theme.is_active && (
                <button
                  onClick={() => handleActivate(theme.id)}
                  style={{
                    background: "#16a34a",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Kích hoạt
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
