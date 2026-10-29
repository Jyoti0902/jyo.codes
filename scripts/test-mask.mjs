import sharp from "sharp";

async function testMask() {
  const { data, info } = await sharp("public/momo/test_s00.png")
    .raw()
    .toBuffer({ resolveWithObject: true });

  const W = info.width, H = info.height, C = info.channels;

  // 1. Mark character pixels (dark or colored)
  const isChar = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * C;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      const bright = (r + g + b) / 3;
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      const sat = mx > 0 ? (mx - mn) / mx : 0;
      // Character is either dark or has color saturation
      if (bright < 228 || (sat > 0.06 && bright < 248)) {
        isChar[y * W + x] = 1;
      }
    }
  }

  // 2. From the boundary of the image, flood fill the outer background
  // Background pixels are connected to the border, and have:
  // (bright >= 248 && sat < 0.05) OR (shadow: bright < 248 && sat < 0.05 AND NOT separated by white border)
  
  // Even easier:
  // What is definitely OUTSIDE?
  // Let's flood fill from all 4 borders:
  // A pixel (x,y) is outside if it can be reached from the border without crossing the character OR the white border.
  // How to know if we crossed the white border?
  // The white border is adjacent to the character and surrounded by shadow!
  
  // Let's test a simple queue flood-fill from borders:
  // If we only flood fill pixels where:
  // isChar is 0, AND:
  // Let's see: can we flood fill from borders where bright >= 249?
  // All edge pixels have bright >= 240.
  
  // Let's check what pixels are within Euclidean distance R of the character!
  // If the white border is ~18px wide:
  // If we dilate isChar by 18 pixels:
  // Does it cover the entire white border?
  // Let's measure:
}

testMask();

