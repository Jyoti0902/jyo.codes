// Fills the jewellery areas with the *local* hair / skin tone, measured from
// clean pixels of the same class in a wide window. That keeps highlights and
// shadows where they belong, so a rebuilt patch blends into its surroundings.
const boxMean = (test, radius) => {
  const sum = new Float64Array((W + 1) * (H + 1) * 4);
  for (let y = 0; y < H; y++) {
    let rowR = 0, rowG = 0, rowB = 0, rowN = 0;
    for (let x = 0; x < W; x++) {
      const p = y * W + x;
      if (!hole[p] && test(p)) {
        rowR += data[p * C];
        rowG += data[p * C + 1];
        rowB += data[p * C + 2];
        rowN++;
      }
      const up = y * (W + 1) + x + 1;
      const here = (y + 1) * (W + 1) + x + 1;
      sum[here * 4] = sum[up * 4] + rowR;
      sum[here * 4 + 1] = sum[up * 4 + 1] + rowG;
      sum[here * 4 + 2] = sum[up * 4 + 2] + rowB;
      sum[here * 4 + 3] = sum[up * 4 + 3] + rowN;
    }
  }
  return (x, y) => {
    const x0 = Math.max(0, x - radius);
    const x1 = Math.min(W - 1, x + radius);
    const y0 = Math.max(0, y - radius);
    const y1 = Math.min(H - 1, y + radius);
    const a = y0 * (W + 1) + x0;
    const b = y0 * (W + 1) + x1 + 1;
    const c = (y1 + 1) * (W + 1) + x0;
    const d = (y1 + 1) * (W + 1) + x1 + 1;
    const n = sum[d * 4 + 3] - sum[b * 4 + 3] - sum[c * 4 + 3] + sum[a * 4 + 3];
    if (n < 40) return null;
    return [
      (sum[d * 4] - sum[b * 4] - sum[c * 4] + sum[a * 4]) / n,
      (sum[d * 4 + 1] - sum[b * 4 + 1] - sum[c * 4 + 1] + sum[a * 4 + 1]) / n,
      (sum[d * 4 + 2] - sum[b * 4 + 2] - sum[c * 4 + 2] + sum[a * 4 + 2]) / n,
    ];
  };
};

const hairMean = boxMean((p) => lum[p] < 95 && !(lum[p] > 240 && sat[p] < 10), 26);
const skinMean = boxMean((p) => sat[p] > 40 && lum[p] > 100 && lum[p] < 240, 26);
const skinWide = boxMean((p) => sat[p] > 25 && lum[p] > 95 && lum[p] < 245, 60);

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x;
    if (!hole[p]) continue;
    let tone = null;
    if (cls[p] === HAIR) {
      tone = hairMean(x, y) ?? hairWide(x, y);
    } else if (cls[p] === SKIN) {
      tone = skinMean(x, y) ?? skinWide(x, y);
    } else {
      tone = [252, 252, 252];
    }
    if (!tone) {
      tone = [200, 150, 120];
    }
    for (let c = 0; c < 3; c++) px[p * 3 + c] = tone[c];
  }
}
