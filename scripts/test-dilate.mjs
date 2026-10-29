import sharp from "sharp";

async function testDilate() {
  const { data, info } = await sharp("public/momo/WhatsApp Image 2026-10-29 at 3.30.14 PM.jpeg")
    .raw()
    .toBuffer({ resolveWithObject: true });

  const W = info.width, H = info.height, C = info.channels;

  // Let's test Sticker 9: Row 1, Col 3 (sleepy with zzz)
  const x0 = 800, x1 = 1066, y0 = 358, y1 = 686;
  const cropW = x1 - x0, cropH = y1 - y0;

  // 1. Find all character / prop pixels
  const isChar = new Uint8Array(cropW * cropH);

  for (let cy = 0; cy < cropH; cy++) {
    for (let cx = 0; cx < cropW; cx++) {
      const gx = x0 + cx;
      const gy = y0 + cy;
      const gidx = (gy * W + gx) * C;
      const r = data[gidx], g = data[gidx + 1], b = data[gidx + 2];
      const bright = (r + g + b) / 3;
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      const sat = mx > 0 ? (mx - mn) / mx : 0;

      // Character or colored prop pixel
      if (bright < 225 || (sat > 0.06 && bright < 248)) {
        isChar[cy * cropW + cx] = 255;
      }
    }
  }

  // 2. Dilate isChar by R=14 pixels using sharp blur + threshold (fast, perfect smooth morphology)
  // Blurring a binary mask and thresholding it is a mathematically exact smooth dilation!
  const charMaskImg = sharp(Buffer.from(isChar), { raw: { width: cropW, height: cropH, channels: 1 } });
  
  // A gaussian blur with sigma=4.5 thresholded at > 15 creates a smooth uniform ~14px dilation with rounded corners!
  const blurredMask = await charMaskImg
    .blur(4.5)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const stickerMask = new Uint8Array(cropW * cropH);
  for (let i = 0; i < cropW * cropH; i++) {
    // If the blurred mask is > 10, it's inside the dilated sticker boundary
    if (blurredMask.data[i] > 10) {
      stickerMask[i] = 255;
    }
  }

  // 3. Create RGBA buffer
  // Inside isChar: use original image pixel colors
  // Inside stickerMask (white border): set to crisp clean white (255, 255, 255)
  // Outside: alpha = 0
  const rgba = Buffer.alloc(cropW * cropH * 4);
  for (let cy = 0; cy < cropH; cy++) {
    for (let cx = 0; cx < cropW; cx++) {
      const pos = cy * cropW + cx;
      const gidx = ((y0 + cy) * W + (x0 + cx)) * C;
      const dstIdx = pos * 4;

      if (isChar[pos]) {
        // Character pixel
        rgba[dstIdx] = data[gidx];
        rgba[dstIdx + 1] = data[gidx + 1];
        rgba[dstIdx + 2] = data[gidx + 2];
        rgba[dstIdx + 3] = 255;
      } else if (stickerMask[pos]) {
        // White die-cut border!
        rgba[dstIdx] = 255;
        rgba[dstIdx + 1] = 255;
        rgba[dstIdx + 2] = 255;
        rgba[dstIdx + 3] = 255;
      } else {
        // Outside transparent
        rgba[dstIdx] = 0;
        rgba[dstIdx + 1] = 0;
        rgba[dstIdx + 2] = 0;
        rgba[dstIdx + 3] = 0;
      }
    }
  }

  // 4. Smooth alpha edge (1.0px blur on alpha) and trim!
  const rawImg = sharp(rgba, { raw: { width: cropW, height: cropH, channels: 4 } });
  const alphaRaw = await rawImg.clone().extractChannel(3).raw().toBuffer({ resolveWithObject: true });
  const smoothedAlpha = await sharp(alphaRaw.data, { raw: { width: cropW, height: cropH, channels: 1 } })
    .blur(0.8)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgbRaw = await rawImg.clone().removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const trimmed = await sharp(rgbRaw.data, { raw: { width: cropW, height: cropH, channels: 3 } })
    .joinChannel(smoothedAlpha.data, { raw: { width: cropW, height: cropH, channels: 1 } })
    .trim()
    .png()
    .toFile("public/momo/test_sticker_09_perfect.png");

  console.log("SUCCESS! Saved test_sticker_09_perfect.png, size:", trimmed.width, "x", trimmed.height);
}

testDilate();

