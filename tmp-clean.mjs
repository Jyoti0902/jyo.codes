import fs from "node:fs";
const file = "D:/Me/2026-Projects/jyo.codes/app/_components/rabbit.tsx";
let src = fs.readFileSync(file, "utf8");
const before = src;
src = src.replace('import Image from "next/image";\n', "");
if (src === before) throw new Error("import not found");
fs.writeFileSync(file, src);
console.log("removed next/image import");
