import sharp from "sharp";
const { data, info } = await sharp("C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg").resize({ width: 760, fit: "inside" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
console.log("len", data.length, "expect", info.width * info.height * info.channels, info.width, info.height, info.channels);
const buf = Buffer.alloc(info.width * info.height * 3);
for (let i = 0; i < buf.length; i++) buf[i] = data[i];
await sharp(buf, { raw: { width: info.width, height: info.height, channels: 3 } }).png().toFile("C:/Users/skumar1/AppData/Local/Temp/opencode/82-copy.png");
const m = await sharp("C:/Users/skumar1/AppData/Local/Temp/opencode/82-copy.png").metadata();
console.log(m.width, m.height);
