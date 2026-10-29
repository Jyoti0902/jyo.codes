import sharp from "sharp";

const SRC = "C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";
const W = 1254;
const H = 1254;

// Hair from just above the ear covers the left jhumka; clean cheek from the
// other side of the face covers the right one.
const hairPatch = await sharp(SRC)
  .extract({ left: 283, top: 470, width: 96, height: 220 })
  .png()
  .toBuffer();
const skinPatch = await sharp(SRC)
  .extract({ left: 410, top: 742, width: 96, height: 205 })
  .png()
  .toBuffer();

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="10"/>
    </filter>
    <mask id="mLeft">
      <path d="M286 742 C 286 700, 380 700, 380 742 L 380 902 C 380 944, 286 944, 286 902 Z" fill="#fff" filter="url(#soft)"/>
    </mask>
    <mask id="mRight">
      <path d="M818 766 C 818 724, 900 724, 900 766 L 900 928 C 900 970, 818 970, 818 928 Z" fill="#fff" filter="url(#soft)"/>
    </mask>
  </defs>
  <g mask="url(#mLeft)">
    <image href="data:image/png;base64,${hairPatch.toString("base64")}" x="283" y="694" width="96" height="220" preserveAspectRatio="none"/>
  </g>
  <g mask="url(#mRight)">
    <image href="data:image/png;base64,${skinPatch.toString("base64")}" x="810" y="744" width="96" height="205" preserveAspectRatio="none"/>
  </g>
</svg>`;

await sharp(SRC)
  .composite([{ input: Buffer.from(svg) }])
  .removeAlpha()
  .png()
  .toFile(`${TMP}/92-patch.png`);
console.log("ok");
