import sharp from "sharp";
const { data, info } = await sharp("C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg").resize({ width: 760, fit: "inside" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const px = new Float32Array(W * H * 3);
for (let p = 0; p < W * H; p++) { px[p*3] = data[p*3]; px[p*3+1] = data[p*3+1]; px[p*3+2] = data[p*3+2]; }
const radius = 4, sigmaSpace = 3.4, sigmaColor = 42;
const out = new Float32Array(px.length);
const space = [];
for (let d = -radius; d <= radius; d++) for (let e = -radius; e <= radius; e++) space.push([d, e, Math.exp(-(d*d+e*e)/(2*sigmaSpace*sigmaSpace))]);
const colorScale = -1/(2*sigmaColor*sigmaColor);
let nan = 0, zero = 0;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const p = (y*W+x)*3;
  const cr = px[p], cg = px[p+1], cb = px[p+2];
  let sr=0, sg=0, sb=0, sw=0;
  for (const [d,e,ws] of space) {
    const nx = x+d, ny = y+e;
    if (nx<0||ny<0||nx>=W||ny>=H) continue;
    const q = (ny*W+nx)*3;
    const dr = px[q]-cr, dg = px[q+1]-cg, db = px[q+2]-cb;
    const w = ws*Math.exp((dr*dr+dg*dg+db*db)*colorScale);
    sr += px[q]*w; sg += px[q+1]*w; sb += px[q+2]*w; sw += w;
  }
  out[p] = sr/sw; out[p+1] = sg/sw; out[p+2] = sb/sw;
}
for (let i = 0; i < out.length; i++) { if (Number.isNaN(out[i])) nan++; else if (out[i] === 0) zero++; }
console.log("len", out.length, "nan", nan, "zero", zero);
const buf = Buffer.alloc(W*H*3);
for (let i = 0; i < buf.length; i++) buf[i] = Math.max(0, Math.min(255, Math.round(out[i])));
await sharp(buf, { raw: { width: W, height: H, channels: 3 } }).png().toFile("C:/Users/skumar1/AppData/Local/Temp/opencode/85-one.png");
console.log("wrote");
