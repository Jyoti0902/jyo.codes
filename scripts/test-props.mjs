import sharp from "sharp";

async function testProps() {
  const { data, info } = await sharp("public/momo/WhatsApp Image 2026-10-29 at 3.30.14 PM.jpeg")
    .raw()
    .toBuffer({ resolveWithObject: true });

  const W = info.width, H = info.height, C = info.channels;

  // Let's test Sticker 9: Row 1, Col 3 (sleepy with zzz)
  // x: from 800 to 1065, y: from 358 to 685
  const x0 = 800, x1 = 1066, y0 = 358, y1 = 686;
  const cropW = x1 - x0, cropH = y1 - y0;

  console.log(`Testing Sticker 9 (Sleepy): ${cropW}x${cropH}`);

  // 1. Find all seed pixels (character OR colored props like zzz)
  const isSeed = new Uint8Array(cropW * cropH);
  const queue = [];

  for (let cy = 0; cy < cropH; cy++) {
    for (let cx = 0; cx < cropW; cx++) {
      const gx = x0 + cx;
      const gy = y0 + cy;
      const gidx = (gy * W + gx) * C;
      const r = data[gidx], g = data[gidx + 1], b = data[gidx + 2];
      const bright = (r + g + b) / 3;
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      const sat = mx > 0 ? (mx - mn) / mx : 0;

      // Character or prop pixel
      if (bright < 225 || (sat > 0.06 && bright < 248)) {
        const cpos = cy * cropW + cx;
        isSeed[cpos] = 1;
        queue.push(cpos);
      }
    }
  }

  console.log("Seeds in Sticker 9:", queue.length);

  // 2. BFS expansion into white border (bright >= 247)
  const inSticker = new Uint8Array(isSeed);
  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr % cropW;
    const cy = Math.floor(curr / cropW);

    const neighbors = [
      [cx - 1, cy],
      [cx + 1, cy],
      [cx, cy - 1],
      [cx, cy + 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < cropW && ny >= 0 && ny < cropH) {
        const npos = ny * cropW + nx;
        if (!inSticker[npos]) {
          const gx = x0 + nx;
          const gy = y0 + ny;
          const gidx = (gy * W + gx) * C;
          const r = data[gidx], g = data[gidx + 1], b = data[gidx + 2];
          const bright = (r + g + b) / 3;

          // If bright >= 247, expand into white border
          if (bright >= 247) {
            inSticker[npos] = 1;
            queue.push(npos);
          }
        }
      }
    }
  }

  console.log("Total sticker pixels after expansion:", queue.length);

  // 3. Build RGBA buffer
  const rgba = Buffer.alloc(cropW * cropH * 4);
  for (let cy = 0; cy < cropH; cy++) {
    for (let cx = 0; cx < cropW; cx++) {
      const cpos = cy * cropW + cx;
      const gidx = ((y0 + cy) * W + (x0 + cx)) * C;
      const dstIdx = cpos * 4;

      rgba[dstIdx] = data[gidx];
      rgba[dstIdx + 1] = data[gidx + 1];
      rgba[dstIdx + 2] = data[gidx + 2];
      rgba[dstIdx + 3] = inSticker[cpos] ? 255 : 0;
    }
  }

  // 4. Smooth alpha & trim
  const rawImg = sharp(rgba, { raw: { width: cropW, height: cropH, channels: 4 } });
  const alphaRaw = await rawImg.clone().extractChannel(3).raw().toBuffer({ resolveWithObject: true });
  const smoothedAlpha = await sharp(alphaRaw.data, { raw: { width: cropW, height: cropH, channels: 1 } })
    .blur(0.8)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgbRaw = await rawImg.clone().removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const finalCut = await sharp(rgbRaw.data, { raw: { width: cropW, height: cropH, channels: 3 } })
    .joinChannel(smoothedAlpha.data, { raw: { width: cropW, height: cropH, channels: 1 } })
    .trim()
    .png()
    .toFile("public/momo/test_sticker_09_sleepy.png");

  console.log("Saved test_sticker_09_sleepy.png:", finalCut.width, "x", finalCut.height);
}

testProps();

