import fs from "fs";
import path from "path";

const wwwDir = path.resolve("./www");
const indexPath = path.join(wwwDir, "index.html");

try {
  if (!fs.existsSync(indexPath)) {
    console.warn("⚠️ Không tìm thấy www/index.html, bỏ qua fix-index-html.mjs");
    process.exit(0);
  }

  let html = fs.readFileSync(indexPath, "utf-8");
  const original = html;

  // xoá tất cả <script> trong file (nếu có)
  html = html.replace(/<script[^>]*>.*?<\/script>/gis, "");

  if (html !== original) {
    fs.writeFileSync(indexPath, html, "utf-8");
    console.log("✅ index.html đã được làm sạch, chỉ còn <div id=\"root\"></div>");
  } else {
    console.log("ℹ️ index.html không có <script>, không cần chỉnh sửa");
  }
} catch (err) {
  console.error("❌ Lỗi fix-index-html.mjs:", err.message);
  process.exit(1);
}
