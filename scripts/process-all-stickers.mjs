import sharp from "sharp";
import fs from "fs";
import path from "path";

const SRC = "public/momo/WhatsApp Image 2026-10-29 at 3.30.14 PM.jpeg";
const OUT_DIR = "public/momo/stickers";

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// 18 stickers arranged in 3 rows x 6 columns
const stickerDefs = [
  // Row 0
  {
    id: "01-neutral",
    filename: "momo-neutral.png",
    name: "neutral",
    label: "Neutral Smile",
    row: 0,
    col: 0,
    x0: 0,
    x1: 267,
    y0: 0,
    y1: 358,
    mood: "idle",
    expression: "Calm, friendly forward gaze with a gentle smile",
    tags: ["idle", "default", "smile", "calm"]
  },
  {
    id: "02-wink-thumbs-up",
    filename: "momo-wink-thumbs-up.png",
    name: "wink_thumbs",
    label: "Wink & Thumbs Up",
    row: 0,
    col: 1,
    x0: 267,
    x1: 538,
    y0: 0,
    y1: 358,
    mood: "happy",
    expression: "Playful wink with right thumb up and action lines",
    tags: ["happy", "thumbs-up", "wink", "success", "great"]
  },
  {
    id: "03-double-thumbs-up",
    filename: "momo-double-thumbs-up.png",
    name: "double_thumbs",
    label: "Double Thumbs Up",
    row: 0,
    col: 2,
    x0: 538,
    x1: 808,
    y0: 0,
    y1: 358,
    mood: "excited",
    expression: "Double thumbs up, radiant smile, joyful sparkle",
    tags: ["excited", "double-thumbs", "cheer", "sparkle", "celebrate"]
  },
  {
    id: "04-love-chin",
    filename: "momo-love-chin.png",
    name: "love_chin",
    label: "Sweet Smile & Heart",
    row: 0,
    col: 3,
    x0: 808,
    x1: 1049,
    y0: 0,
    y1: 358,
    mood: "happy",
    expression: "Chin resting in hand, warm smile with pink heart",
    tags: ["love", "heart", "sweet", "friendly", "contact"]
  },
  {
    id: "05-thinking-question",
    filename: "momo-thinking-question.png",
    name: "thinking",
    label: "Thinking with Questions",
    row: 0,
    col: 4,
    x0: 1049,
    x1: 1285,
    y0: 0,
    y1: 358,
    mood: "curious",
    expression: "Hand on chin looking up with question marks (??)",
    tags: ["curious", "thinking", "question", "inspect", "details"]
  },
  {
    id: "06-surprised-wow",
    filename: "momo-surprised-wow.png",
    name: "surprised",
    label: "Surprised / Wow",
    row: 0,
    col: 5,
    x0: 1285,
    x1: 1536,
    y0: 0,
    y1: 358,
    mood: "excited",
    expression: "Surprised expression, open round mouth with exclamation marks",
    tags: ["surprised", "wow", "gasp", "shock", "excited"]
  },

  // Row 1
  {
    id: "07-waving-hello",
    filename: "momo-waving-hello.png",
    name: "waving",
    label: "Waving Hello",
    row: 1,
    col: 0,
    x0: 0,
    x1: 277,
    y0: 358,
    y1: 688,
    mood: "happy",
    expression: "Friendly waving hand hello with motion lines",
    tags: ["greeting", "hello", "welcome", "wave", "hero"]
  },
  {
    id: "08-laptop-coding",
    filename: "momo-laptop-coding.png",
    name: "coding",
    label: "Working on Laptop",
    row: 1,
    col: 1,
    x0: 277,
    x1: 547,
    y0: 358,
    y1: 688,
    mood: "idle",
    expression: "Typing and engineering on laptop with Apple logo",
    tags: ["coding", "laptop", "work", "developer", "engineering"]
  },
  {
    id: "09-pointing-right",
    filename: "momo-pointing-right.png",
    name: "pointing",
    label: "Pointing Right / Explore",
    row: 1,
    col: 2,
    x0: 547,
    x1: 800,
    y0: 358,
    y1: 688,
    mood: "curious",
    expression: "Enthusiastically pointing right with yellow action bursts",
    tags: ["explore", "pointing", "project", "work", "cta"]
  },
  {
    id: "10-sleepy-zzz",
    filename: "momo-sleepy-zzz.png",
    name: "sleepy",
    label: "Sleeping / Zzz",
    row: 1,
    col: 3,
    x0: 800,
    x1: 1067,
    y0: 358,
    y1: 688,
    mood: "sleepy",
    expression: "Head resting on folded arms sleeping peacefully with floating zzz",
    tags: ["sleepy", "nap", "zzz", "idle", "rest"]
  },
  {
    id: "11-coffee-tea",
    filename: "momo-coffee-tea.png",
    name: "coffee",
    label: "Hot Coffee / Tea",
    row: 1,
    col: 4,
    x0: 1067,
    x1: 1326,
    y0: 358,
    y1: 688,
    mood: "idle",
    expression: "Holding steaming white coffee/tea mug with two hands",
    tags: ["coffee", "tea", "break", "about", "chill"]
  },
  {
    id: "12-peeking-side",
    filename: "momo-peeking-side.png",
    name: "peeking",
    label: "Peeking from Edge",
    row: 1,
    col: 5,
    x0: 1326,
    x1: 1536,
    y0: 358,
    y1: 688,
    mood: "curious",
    expression: "Peeking playfully from behind a border with yellow sparkle",
    tags: ["peeking", "peek", "curious", "sidebar", "nav"]
  },

  // Row 2
  {
    id: "13-idea-lightbulb",
    filename: "momo-idea-lightbulb.png",
    name: "idea",
    label: "Idea / Lightbulb",
    row: 2,
    col: 0,
    x0: 0,
    x1: 277,
    y0: 688,
    y1: 1024,
    mood: "curious",
    expression: "Finger raised in epiphany with glowing yellow lightbulb",
    tags: ["idea", "lightbulb", "insight", "problem-solving", "architecture"]
  },
  {
    id: "14-reading-book",
    filename: "momo-reading-book.png",
    name: "reading",
    label: "Reading Book / Study",
    row: 2,
    col: 1,
    x0: 277,
    x1: 540,
    y0: 688,
    y1: 1024,
    mood: "idle",
    expression: "Looking down studying an open blue hardcover book",
    tags: ["reading", "education", "degree", "learning", "books"]
  },
  {
    id: "15-celebrate-fists",
    filename: "momo-celebrate-fists.png",
    name: "celebrate",
    label: "Celebrate & Cheering",
    row: 2,
    col: 2,
    x0: 540,
    x1: 801,
    y0: 688,
    y1: 1024,
    mood: "excited",
    expression: "Both fists pumped in celebration with closed-eye joyful grin",
    tags: ["celebrate", "cheering", "stats", "success", "winner"]
  },
  {
    id: "16-tired-bored",
    filename: "momo-tired-bored.png",
    name: "tired",
    label: "Tired / Bored",
    row: 2,
    col: 3,
    x0: 801,
    x1: 1040,
    y0: 688,
    y1: 1024,
    mood: "sleepy",
    expression: "Resting cheek on hand looking tired/bored with sweat mark",
    tags: ["bored", "tired", "sigh", "sleepy", "waiting"]
  },
  {
    id: "17-confused-hmm",
    filename: "momo-confused-hmm.png",
    name: "confused",
    label: "Confused / Hmm",
    row: 2,
    col: 4,
    x0: 1040,
    x1: 1279,
    y0: 688,
    y1: 1024,
    mood: "curious",
    expression: "Pouting thoughtfully with hand scratching chin and swirl bubble",
    tags: ["confused", "hmm", "thinking", "curious", "debugging"]
  },
  {
    id: "18-finger-heart-wink",
    filename: "momo-finger-heart-wink.png",
    name: "finger_heart",
    label: "Finger Heart & Wink",
    row: 2,
    col: 5,
    x0: 1279,
    x1: 1536,
    y0: 688,
    y1: 1024,
    mood: "happy",
    expression: "Cute wink with Korean finger heart (🫰) and floating pink heart",
    tags: ["finger-heart", "wink", "korean-heart", "contact", "love"]
  }
];

async function processSticker(fullData, W, H, C, def) {
  const cropW = def.x1 - def.x0;
  const cropH = def.y1 - def.y0;

  // Extract raw crop buffer
  const cropRGB = Buffer.alloc(cropW * cropH * C);
  for (let cy = 0; cy < cropH; cy++) {
    for (let cx = 0; cx < cropW; cx++) {
      const srcIdx = ((def.y0 + cy) * W + (def.x0 + cx)) * C;
      const dstIdx = (cy * cropW + cx) * C;
      cropRGB[dstIdx] = fullData[srcIdx];
      cropRGB[dstIdx + 1] = fullData[srcIdx + 1];
      cropRGB[dstIdx + 2] = fullData[srcIdx + 2];
    }
  }

  // 1. Mark character / prop pixels (dark or colored)
  const isChar = new Uint8Array(cropW * cropH);
  for (let cy = 0; cy < cropH; cy++) {
    for (let cx = 0; cx < cropW; cx++) {
      const idx = (cy * cropW + cx) * C;
      const r = cropRGB[idx], g = cropRGB[idx + 1], b = cropRGB[idx + 2];
      const bright = (r + g + b) / 3;
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      const sat = mx > 0 ? (mx - mn) / mx : 0;

      // Character / prop pixel
      if (bright < 225 || (sat > 0.06 && bright < 248)) {
        isChar[cy * cropW + cx] = 1;
      }
    }
  }

  // 2. Fill enclosed holes (eye whites, teeth, highlights, laptop screen)
  const isOutside = new Uint8Array(cropW * cropH);
  const outQueue = new Int32Array(cropW * cropH);
  let oHead = 0, oTail = 0;

  for (let x = 0; x < cropW; x++) {
    if (!isChar[x]) { isOutside[x] = 1; outQueue[oTail++] = x; }
    const bot = (cropH - 1) * cropW + x;
    if (!isChar[bot]) { isOutside[bot] = 1; outQueue[oTail++] = bot; }
  }
  for (let y = 0; y < cropH; y++) {
    const left = y * cropW;
    if (!isChar[left] && !isOutside[left]) { isOutside[left] = 1; outQueue[oTail++] = left; }
    const right = y * cropW + cropW - 1;
    if (!isChar[right] && !isOutside[right]) { isOutside[right] = 1; outQueue[oTail++] = right; }
  }

  while (oHead < oTail) {
    const curr = outQueue[oHead++];
    const cx = curr % cropW;
    const cy = Math.floor(curr / cropW);

    if (cx > 0) { const n = curr - 1; if (!isChar[n] && !isOutside[n]) { isOutside[n] = 1; outQueue[oTail++] = n; } }
    if (cx < cropW - 1) { const n = curr + 1; if (!isChar[n] && !isOutside[n]) { isOutside[n] = 1; outQueue[oTail++] = n; } }
    if (cy > 0) { const n = curr - cropW; if (!isChar[n] && !isOutside[n]) { isOutside[n] = 1; outQueue[oTail++] = n; } }
    if (cy < cropH - 1) { const n = curr + cropW; if (!isChar[n] && !isOutside[n]) { isOutside[n] = 1; outQueue[oTail++] = n; } }
  }

  for (let i = 0; i < cropW * cropH; i++) {
    if (!isOutside[i]) {
      isChar[i] = 1;
    }
  }

  // 3. BFS morphological dilation for uniform white die-cut border (R = 13 px)
  const R = 13;
  const dist = new Int16Array(cropW * cropH).fill(-1);
  const queue = new Int32Array(cropW * cropH);
  let head = 0, tail = 0;

  for (let i = 0; i < cropW * cropH; i++) {
    if (isChar[i]) {
      dist[i] = 0;
      queue[tail++] = i;
    }
  }

  while (head < tail) {
    const curr = queue[head++];
    const d = dist[curr];
    if (d >= R) continue;

    const cx = curr % cropW;
    const cy = Math.floor(curr / cropW);

    if (cx > 0 && dist[curr - 1] === -1) { dist[curr - 1] = d + 1; queue[tail++] = curr - 1; }
    if (cx < cropW - 1 && dist[curr + 1] === -1) { dist[curr + 1] = d + 1; queue[tail++] = curr + 1; }
    if (cy > 0 && dist[curr - cropW] === -1) { dist[curr - cropW] = d + 1; queue[tail++] = curr - cropW; }
    if (cy < cropH - 1 && dist[curr + cropW] === -1) { dist[curr + cropW] = d + 1; queue[tail++] = curr + cropW; }
  }

  // 4. Build RGBA buffer with smooth anti-aliased border
  const rgba = Buffer.alloc(cropW * cropH * 4);
  for (let cy = 0; cy < cropH; cy++) {
    for (let cx = 0; cx < cropW; cx++) {
      const pos = cy * cropW + cx;
      const srcIdx = pos * C;
      const dstIdx = pos * 4;
      const d = dist[pos];

      if (d === 0) {
        // Character
        rgba[dstIdx] = cropRGB[srcIdx];
        rgba[dstIdx + 1] = cropRGB[srcIdx + 1];
        rgba[dstIdx + 2] = cropRGB[srcIdx + 2];
        rgba[dstIdx + 3] = 255;
      } else if (d > 0 && d <= R - 2) {
        // Crisp die-cut white border
        rgba[dstIdx] = 255;
        rgba[dstIdx + 1] = 255;
        rgba[dstIdx + 2] = 255;
        rgba[dstIdx + 3] = 255;
      } else if (d === R - 1) {
        // Anti-aliased outer edge
        rgba[dstIdx] = 255;
        rgba[dstIdx + 1] = 255;
        rgba[dstIdx + 2] = 255;
        rgba[dstIdx + 3] = 190;
      } else if (d === R) {
        // Soft feather
        rgba[dstIdx] = 255;
        rgba[dstIdx + 1] = 255;
        rgba[dstIdx + 2] = 255;
        rgba[dstIdx + 3] = 75;
      } else {
        // Transparent outside
        rgba[dstIdx] = 0;
        rgba[dstIdx + 1] = 0;
        rgba[dstIdx + 2] = 0;
        rgba[dstIdx + 3] = 0;
      }
    }
  }

  // 5. Save transparent cutout
  const outTransparent = path.join(OUT_DIR, def.filename);
  const trimmed = await sharp(rgba, { raw: { width: cropW, height: cropH, channels: 4 } })
    .trim()
    .png()
    .toFile(outTransparent);

  // Also save a version with the original id (e.g. 01-neutral.png)
  const idTransparent = path.join(OUT_DIR, `${def.id}.png`);
  await sharp(rgba, { raw: { width: cropW, height: cropH, channels: 4 } })
    .trim()
    .png()
    .toFile(idTransparent);

  return {
    ...def,
    width: trimmed.width,
    height: trimmed.height,
    path: `/momo/stickers/${def.filename}`
  };
}

async function run() {
  const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
  console.log(`Loaded ${SRC}: ${info.width}x${info.height}`);

  const results = [];
  for (const def of stickerDefs) {
    const res = await processSticker(data, info.width, info.height, info.channels, def);
    console.log(`[OK] ${def.id} -> ${def.filename} (${res.width}x${res.height})`);
    results.push(res);
  }

  // Save stickers manifest JSON
  const manifestPath = path.join(OUT_DIR, "stickers.json");
  fs.writeFileSync(manifestPath, JSON.stringify(results, null, 2));
  console.log(`Saved manifest to ${manifestPath}`);
}

run();

