import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.error("Lỗi lấy bài viết:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Tiêu đề không được để trống");
      return;
    }

    try {
      await api.post("/posts", form);
      setForm({ title: "", content: "" });
      fetchPosts();
    } catch (error) {
      console.error("Lỗi tạo bài viết:", error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      fetchPosts();
    } catch (error) {
      console.error("Lỗi xóa bài viết:", error);
    }
  };

  return (
    <div>
      <h1>Quản lý bài viết</h1>

      <form
        onSubmit={handleCreatePost}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ marginBottom: "12px" }}>
          <label>Tiêu đề</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Nội dung</label>
          <textarea
            rows="4"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Tạo bài viết
        </button>
      </form>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Danh sách bài viết</h2>

        {loading ? (
          <p>Đang tải...</p>
        ) : posts.length === 0 ? (
          <p>Chưa có bài viết nào.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              style={{
                padding: "14px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <h3 style={{ marginBottom: "6px" }}>{post.title}</h3>
              <p style={{ marginBottom: "8px" }}>{post.content}</p>
              <button
                onClick={() => handleDeletePost(post.id)}
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Xóa
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
