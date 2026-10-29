import fs from "node:fs";
const f = "D:/Me/2026-Projects/jyo.codes/tmp-build.mjs";
let s = fs.readFileSync(f, "utf8");
s = s.replace(
`const leftLock = \`<g>
  <path d="M\${286} \${706} C 258 790, 254 880, 272 990 L 386 990 C 356 900, 356 790, 396 716 C 372 690, 330 682, 286 706 Z" fill="url(#hairGrad)"/>
</g>\`;
const rightLock = \`<g>
  <path d="M\${812} \${742} C 792 830, 796 910, 816 1000 L 928 1000 C 906 910, 902 826, 918 748 C 892 726, 844 722, 812 742 Z" fill="url(#hairGrad)"/>
</g>\`;`,
`const leftLock = \`<path d="M170 402 C 148 472, 149 544, 165 624 L 248 624 C 221 548, 221 470, 252 404 C 226 384, 195 382, 170 402 Z" fill="url(#hairGrad)"/>\`;
const rightLock = \`<path d="M492 450 C 474 512, 478 578, 494 648 L 578 648 C 559 582, 556 512, 568 454 C 542 434, 514 434, 492 450 Z" fill="url(#hairGrad)"/>\`;`);
fs.writeFileSync(f, s);
console.log(s.includes("M170 402") ? "ok" : "FAILED replace");
