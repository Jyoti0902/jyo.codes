import fs from "node:fs";

const file = "D:/Me/2026-Projects/jyo.codes/app/_components/rabbit.tsx";
const lines = fs.readFileSync(file, "utf8").split("\n");

const START = 432;
const END = 568;
if (!lines[START - 1].startsWith("function Bunny({")) throw new Error("bad start");
if (lines[END - 1] !== "}") throw new Error("bad end");
if (lines.slice(END).some((line) => line !== "")) throw new Error("trailing code");

const next = `function Bunny({ sleeping }: { sleeping: boolean }) {
  return (
    <span
      className={\`mascot-badge relative block h-full w-full overflow-hidden rounded-full \${
        sleeping ? "mascot-napping" : ""
      }\`}
    >
      <Image
        src="/momo/momo-portrait.png"
        alt=""
        aria-hidden
        fill
        sizes="(min-width: 640px) 112px, 92px"
        className="object-contain object-bottom"
      />
    </span>
  );
}`;

fs.writeFileSync(file, [...lines.slice(0, START - 1), next, ...lines.slice(END)].join("\n"));

// The portrait cannot blink, so the blink timer goes with the old sprite.
const src = fs.readFileSync(file, "utf8");
const withoutBlinkState = src.replace("  const [blinking, setBlinking] = useState(false);\n", "");
const withoutBlinkEffect = withoutBlinkState.replace(
  `  useEffect(() => {
    if (reduce || sleeping) return;

    const id = window.setInterval(() => {
      setBlinking(true);
      window.setTimeout(() => setBlinking(false), 140);
    }, 4800);

    return () => window.clearInterval(id);
  }, [reduce, sleeping]);

`,
  "",
);
const withoutBlinkProp = withoutBlinkEffect.replace(
  `            <Bunny
              sleeping={sleeping}
              blinking={blinking}
              mood={message?.mood ?? "idle"}
            />`,
  "            <Bunny sleeping={sleeping} />",
);

for (const [name, value] of [
  ["blink state", withoutBlinkState],
  ["blink effect", withoutBlinkEffect],
  ["blink prop", withoutBlinkProp],
]) {
  if (value === src) throw new Error(`failed: ${name}`);
}

const withImport = withoutBlinkProp.replace(
  `import { Sparkles } from "./icons";`,
  `import Image from "next/image";\nimport { Sparkles } from "./icons";`,
);
if (withImport === withoutBlinkProp) throw new Error("failed: import");

fs.writeFileSync(file, withImport);
console.log("portrait wired, lines", withImport.split("\n").length);
