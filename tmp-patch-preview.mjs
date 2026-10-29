import fs from "node:fs";
import sharp from "sharp";

const SRC = "C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

const base = () => sharp(data, { raw: { width: W, height: H, channels: C } });

// Skin patch to hide the right earring, hair patch to hide the left one.
const skinPatch = await base()
  .extract({ left: 768, top: 780, width: 38, height: 165 })
  .resize(100, 200, { fit: "fill" })
  .png()
  .toBuffer();
const hairPatch = await base()
  .extract({ left: 302, top: 505, width: 72, height: 215 })
  .resize(100, 198, { fit: "fill" })
  .png()
  .toBuffer();

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5"/>
    </filter>
    <mask id="mLeft">
      <rect x="276" y="714" width="108" height="204" rx="34" fill="#fff" filter="url(#soft)"/>
    </mask>
    <mask id="mRight">
      <rect x="803" y="740" width="107" height="207" rx="34" fill="#fff" filter="url(#soft)"/>
    </mask>
  </defs>
  <g mask="url(#mLeft)">
    <image href="data:image/png;base64,${hairPatch.toString("base64")}" x="276" y="714" width="108" height="204" preserveAspectRatio="none"/>
  </g>
  <g mask="url(#mRight)">
    <image href="data:image/png;base64,${skinPatch.toString("base64")}" x="803" y="740" width="107" height="207" preserveAspectRatio="none"/>
  </g>
</svg>`;

await base()
  .composite([{ input: Buffer.from(svg) }])
  .removeAlpha()
  .png()
  .toFile(`${TMP}/76-patched.png`);
console.log("wrote 76-patched");
