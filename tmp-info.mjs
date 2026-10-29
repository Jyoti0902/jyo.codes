import sharp from "sharp";
const { info } = await sharp("C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg").resize({ width: 760, fit: "inside" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
console.log(info);
