import fs from "fs";
import path from "path";

const outDir = path.resolve("./www");
const assetsDir = path.join(outDir, "assets");

if (!fs.existsSync(assetsDir)) {
  console.error("❌ Không tìm thấy thư mục assets sau khi build");
  process.exit(1);
}

const files = fs.readdirSync(assetsDir);

// lấy đúng file js và css thực sự build ra
const jsFiles = files.filter((f) => f.endsWith(".js"));
const cssFiles = files.filter((f) => f.endsWith(".css"));

const appConfig = {
  app: {
    appId: "2550431164744910512", // thay bằng AppID thật của bạn
    title: "Gà Rán FKT",
    version: "1.0.0",
    description: "Zalo Mini App gà rán - đặt món nhanh gọn",
    icon: "/assets/placeholder.jpg",
  },
  router: {
    entry: "/",
    pages: ["/", "/index", "/products", "/cart", "/orders", "/profile"],
  },
  listSyncJS: jsFiles.map((f) => "/assets/" + f),
  listAsyncJS: [],
  listCSS: cssFiles.map((f) => "/assets/" + f),
};

fs.writeFileSync(
  path.join(outDir, "app-config.json"),
  JSON.stringify(appConfig, null, 2)
);

console.log("✅ app-config.json generated:", appConfig);
