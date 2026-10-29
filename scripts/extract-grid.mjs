import sharp from "sharp";
import fs from "fs";
import path from "path";

const SRC = "public/momo/WhatsApp Image 2026-10-29 at 3.30.14 PM.jpeg";
const OUT_DIR = "public/momo/stickers";

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const cells = [
  // Row 0
  { id: "01-neutral", r: 0, c: 0, x0: 0, x1: 267, y0: 0, y1: 358, mood: "idle", name: "neutral" },
  { id: "02-wink-thumbs-up", r: 0, c: 1, x0: 267, x1: 538, y0: 0, y1: 358, mood: "happy", name: "thumbs_up" },
  { id: "03-double-thumbs-up", r: 0, c: 2, x0: 538, x1: 808, y0: 0, y1: 358, mood: "excited", name: "double_thumbs" },
  { id: "04-love-chin", r: 0, c: 3, x0: 808, x1: 1049, y0: 0, y1: 358, mood: "happy", name: "love" },
  { id: "05-thinking-question", r: 0, c: 4, x0: 1049, x1: 1285, y0: 0, y1: 358, mood: "curious", name: "thinking" },
  { id: "06-surprised-wow", r: 0, c: 5, x0: 1285, x1: 1536, y0: 0, y1: 358, mood: "excited", name: "surprised" },

  // Row 1
  { id: "07-waving-hello", r: 1, c: 0, x0: 0, x1: 277, y0: 358, y1: 688, mood: "happy", name: "waving" },
  { id: "08-laptop-coding", r: 1, c: 1, x0: 277, x1: 547, y0: 358, y1: 688, mood: "idle", name: "coding" },
  { id: "09-pointing-right", r: 1, c: 2, x0: 547, x1: 800, y0: 358, y1: 688, mood: "curious", name: "pointing" },
  { id: "10-sleepy-zzz", r: 1, c: 3, x0: 800, x1: 1067, y0: 358, y1: 688, mood: "sleepy", name: "sleepy" },
  { id: "11-coffee-tea", r: 1, c: 4, x0: 1067, x1: 1326, y0: 358, y1: 688, mood: "idle", name: "coffee" },
  { id: "12-peeking-side", r: 1, c: 5, x0: 1326, x1: 1536, y0: 358, y1: 688, mood: "curious", name: "peeking" },

  // Row 2
  { id: "13-idea-lightbulb", r: 2, c: 0, x0: 0, x1: 277, y0: 688, y1: 1024, mood: "curious", name: "idea" },
  { id: "14-reading-book", r: 2, c: 1, x0: 277, x1: 540, y0: 688, y1: 1024, mood: "idle", name: "reading" },
  { id: "15-celebrate-fists", r: 2, c: 2, x0: 540, x1: 801, y0: 688, y1: 1024, mood: "excited", name: "celebrate" },
  { id: "16-tired-bored", r: 2, c: 3, x0: 801, x1: 1040, y0: 688, y1: 1024, mood: "sleepy", name: "bored" },
  { id: "17-confused-hmm", r: 2, c: 4, x0: 1040, x1: 1279, y0: 688, y1: 1024, mood: "curious", name: "confused" },
  { id: "18-finger-heart-wink", r: 2, c: 5, x0: 1279, x1: 1536, y0: 688, y1: 1024, mood: "happy", name: "finger_heart" }
];

async function extractAll() {
  const meta = await sharp(SRC).metadata();
  console.log("Source size:", meta.width, "x", meta.height);

  for (const cell of cells) {
    const width = cell.x1 - cell.x0;
    const height = cell.y1 - cell.y0;

    const outPath = path.join(OUT_DIR, `${cell.id}.png`);
    await sharp(SRC)
      .extract({ left: cell.x0, top: cell.y0, width, height })
      .png()
      .toFile(outPath);

    console.log(`Extracted: ${cell.id}.png (${width}x${height})`);
  }
}

extractAll();

