import fs from "node:fs";
const f = "D:/Me/2026-Projects/jyo.codes/app/_components/rabbit.tsx";
let s = fs.readFileSync(f, "utf8");

const start = s.indexOf("function Bunny({ sleeping }: { sleeping: boolean }) {");
if (start < 0) throw new Error("Bunny not found");
const replacement = `function Bunny({ sleeping }: { sleeping: boolean }) {
  return (
    <span
      className={\`mascot-badge relative block h-full w-full overflow-hidden rounded-full \${
        sleeping ? "mascot-napping" : ""
      }\`}
    >
      <Image
        src="/momo/momo-portrait.png"
        alt=""
        width={442}
        height={640}
        priority
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[112%] w-full object-cover object-top"
      />
    </span>
  );
}
`;
s = s.slice(0, start) + replacement;

s = s.replace(
`import {
  AnimatePresence,`,
`import Image from "next/image";
import {
  AnimatePresence,`);
fs.writeFileSync(f, s);
console.log("ok");
