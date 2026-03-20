import { pool } from "../../core/db.js";

export async function getAllPosts() {
  const [rows] = await pool.query("SELECT * FROM posts ORDER BY id DESC");
  return rows;
}

export async function createPost(title, content) {
  const [result] = await pool.query(
    "INSERT INTO posts (title, content) VALUES (?, ?)",
    [title, content],
  );

  return {
    id: result.insertId,
    title,
    content,
  };
}

export async function deletePost(id) {
  await pool.query("DELETE FROM posts WHERE id = ?", [id]);
}
