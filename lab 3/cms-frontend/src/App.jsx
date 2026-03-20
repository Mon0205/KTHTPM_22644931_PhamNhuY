import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import PostsPage from "./pages/PostsPage";
import ThemesPage from "./pages/ThemesPage";
import PluginsPage from "./pages/PluginsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/posts" replace />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="themes" element={<ThemesPage />} />
        <Route path="plugins" element={<PluginsPage />} />
      </Route>
    </Routes>
  );
}
