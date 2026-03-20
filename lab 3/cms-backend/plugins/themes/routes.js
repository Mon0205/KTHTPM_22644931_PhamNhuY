import express from "express";
import { getThemes, activateTheme } from "./service.js";

export default function registerThemesPlugin(app) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const themes = await getThemes();
      res.json(themes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.put("/activate/:id", async (req, res) => {
    try {
      await activateTheme(req.params.id);
      res.json({ message: "Theme activated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.use("/api/themes", router);
}
