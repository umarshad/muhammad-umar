import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");
const svgPath = path.join(publicDir, "batman-favicon.svg");

async function generate() {
  try {
    await sharp(svgPath)
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, "icon-192.png"));
    console.log("Created public/icon-192.png");

    await sharp(svgPath)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, "icon-512.png"));
    console.log("Created public/icon-512.png");
  } catch (err) {
    console.error("Failed to generate PWA icons:", err.message);
    process.exit(1);
  }
}

generate();
