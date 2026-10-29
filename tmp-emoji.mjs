import fs from "node:fs";
const file = "D:/Me/2026-Projects/jyo.codes/lib/rabbit.ts";
let src = fs.readFileSync(file, "utf8");
src = src.replaceAll("\u{1F43E}", "\u2728");   // paw prints -> sparkles
src = src.replaceAll("\u{1F430}", "\u{1F44B}"); // bunny -> wave
fs.writeFileSync(file, src);
const left = (src.match(/[\u{1F43E}\u{1F430}]/gu) || []).length;
console.log("leftover paw/bunny emoji:", left);
