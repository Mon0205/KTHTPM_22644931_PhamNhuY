import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PluginsPage() {
  const [plugins, setPlugins] = useState([]);

  const fetchPlugins = async () => {
    try {
      const res = await api.get("/plugins");
      setPlugins(res.data);
    } catch (error) {
      console.error("Lỗi lấy plugin:", error);
    }
  };

  useEffect(() => {
    fetchPlugins();
  }, []);

  const handleToggle = async (plugin) => {
    try {
      await api.put(`/plugins/${plugin.id}`, {
        is_enabled: !plugin.is_enabled,
      });

      alert(
        "Đã cập nhật trạng thái plugin. Hãy restart backend để plugin load lại.",
      );
      fetchPlugins();
    } catch (error) {
      console.error("Lỗi cập nhật plugin:", error);
    }
  };

  return (
    <div>
      <h1>Quản lý plugin</h1>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        {plugins.length === 0 ? (
          <p>Không có plugin nào.</p>
        ) : (
          plugins.map((plugin) => (
            <div
              key={plugin.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>{plugin.name}</h3>
                <p style={{ margin: "4px 0 0", color: "#666" }}>
                  {plugin.is_enabled ? "Đang bật" : "Đang tắt"}
                </p>
              </div>

              <button
                onClick={() => handleToggle(plugin)}
                style={{
                  background: plugin.is_enabled ? "#dc2626" : "#16a34a",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                {plugin.is_enabled ? "Tắt plugin" : "Bật plugin"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
