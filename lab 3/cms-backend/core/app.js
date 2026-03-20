import express from "express";
import cors from "cors";
import { loadPlugins } from "./pluginManager.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CMS Core is running",
  });
});

await loadPlugins(app);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
