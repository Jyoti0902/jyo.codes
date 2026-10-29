import sharp from "sharp";
import fs from "fs";
import path from "path";

const SRC = "public/momo/allmomos.jpeg";
const OUT_DIR = "public/momo/stickers";

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
  const W = info.width;
  const H = info.height;
  const C = info.channels;

  // Let's inspect the approximate grid boundaries:
  // 3 rows:
  // row 0: y from 0 to 355
  // row 1: y from 350 to 680
  // row 2: y from 675 to 1024

  // 6 columns roughly centered at:
  // 0: [0, 265]
  // 1: [265, 535]
  // 2: [535, 805]
  // 3: [805, 1060]
  // 4: [1060, 1300]
  // 5: [1300, 1536]

  const rowSlices = [
    { r: 0, y0: 0, y1: 355 },
    { r: 1, y0: 345, y1: 685 },
    { r: 2, y0: 675, y1: 1024 }
  ];

  const colSlices = [
    { c: 0, x0: 0, x1: 270 },
    { c: 1, x0: 260, x1: 540 },
    { c: 2, x0: 530, x1: 810 },
    { c: 3, x0: 800, x1: 1065 },
    { c: 4, x0: 1055, x1: 1315 },
    { c: 5, x0: 1305, x1: 1536 }
  ];

  const stickerDefs = [
    // Row 0
    { name: "01-neutral", r: 0, c: 0, mood: "idle", label: "Neutral / Gentle Smile" },
    { name: "02-wink-thumbs-up", r: 0, c: 1, mood: "happy", label: "Wink & Thumbs Up" },
    { name: "03-double-thumbs-up", r: 0, c: 2, mood: "excited", label: "Double Thumbs Up / Success" },
    { name: "04-love-chin", r: 0, c: 3, mood: "happy", label: "Sweet / Love / Heart" },
    { name: "05-thinking-question", r: 0, c: 4, mood: "curious", label: "Thinking / Question Marks" },
    { name: "06-surprised-wow", r: 0, c: 5, mood: "excited", label: "Surprised / Gasp / Wow" },

    // Row 1
    { name: "07-waving-hello", r: 1, c: 0, mood: "happy", label: "Waving Hello" },
    { name: "08-laptop-coding", r: 1, c: 1, mood: "idle", label: "Working on Laptop" },
    { name: "09-pointing-right", r: 1, c: 2, mood: "curious", label: "Pointing Right / Explore" },
    { name: "10-sleepy-zzz", r: 1, c: 3, mood: "sleepy", label: "Sleeping / Zzz / Nap" },
    { name: "11-coffee-tea", r: 1, c: 4, mood: "idle", label: "Holding Hot Coffee / Tea" },
    { name: "12-peeking-side", r: 1, c: 5, mood: "curious", label: "Peeking from Edge" },

    // Row 2
    { name: "13-idea-lightbulb", r: 2, c: 0, mood: "curious", label: "Idea / Lightbulb" },
    { name: "14-reading-book", r: 2, c: 1, mood: "idle", label: "Reading Book / Learning" },
    { name: "15-celebrate-fists", r: 2, c: 2, mood: "excited", label: "Cheering / Fists Pumped" },
    { name: "16-tired-bored", r: 2, c: 3, mood: "sleepy", label: "Bored / Sighing" },
    { name: "17-confused-hmm", r: 2, c: 4, mood: "curious", label: "Confused / Pondering" },
    { name: "18-finger-heart-wink", r: 2, c: 5, mood: "happy", label: "Finger Heart & Wink" }
  ];

  console.log("Analyzing bounds for all 18 stickers...");
  const results = [];

  for (const def of stickerDefs) {
    const rSlice = rowSlices[def.r];
    const cSlice = colSlices[def.c];

    let minX = W, maxX = -1, minY = H, maxY = -1;

    for (let y = rSlice.y0; y < rSlice.y1; y++) {
      for (let x = cSlice.x0; x < cSlice.x1; x++) {
        const idx = (y * W + x) * C;
        const red = data[idx], green = data[idx + 1], blue = data[idx + 2];
        const bright = (red + green + blue) / 3;

        // Shadow or character or colored elements:
        // Pure background is ~253
        if (bright < 246) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    console.log(`${def.name}: found bounds [${minX}, ${minY}] to [${maxX}, ${maxY}], size: ${maxX - minX + 1}x${maxY - minY + 1}`);
    results.push({ ...def, minX, minY, maxX, maxY });
  }

  return { results, W, H, C, data };
}

run();

