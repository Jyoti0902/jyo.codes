import { SectionHeading } from "@/app/_components/section-heading";
import { Reveal } from "@/app/_components/reveal";
import {
  CommandPrompt,
  TerminalWindow,
  WindowBar,
} from "@/app/_components/terminal";
import { MapPin } from "@/app/_components/icons";
import { site } from "@/lib/site";

const SCOPES = [
  "feat(app)",
  "feat(ui)",
  "feat(api)",
  "feat(auth)",
  "chore(infra)",
  "fix(perf)",
];

/** Deterministic short hash so the "commits" are stable across renders. */
function commitHash(input: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return (hash >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

function EducationJson() {
  return (
    <div className="code-scroll">
      <pre className="font-mono text-[11.5px] leading-[1.9]">
        <code>
          <span className="text-faint">[</span>
          {site.education.map((entry, index) => (
            <span key={entry.degree}>
              {"\n  "}
              <span className="text-faint">{"{"}</span>
              {"\n    "}
              <span className="text-info">&quot;degree&quot;</span>
              <span className="text-faint">: </span>
              <span className="text-accent-2">&quot;{entry.degree}&quot;</span>
              <span className="text-faint">,</span>
              {"\n    "}
              <span className="text-info">&quot;school&quot;</span>
              <span className="text-faint">: </span>
              <span className="text-accent-2">&quot;{entry.school}&quot;</span>
              <span className="text-faint">,</span>
              {"\n    "}
              <span className="text-info">&quot;period&quot;</span>
              <span className="text-faint">: </span>
              <span className="text-accent-2">&quot;{entry.period}&quot;</span>
              {"\n  "}
              <span className="text-faint">
                {"}"}
                {index < site.education.length - 1 ? "," : ""}
              </span>
            </span>
          ))}
          {"\n"}
          <span className="text-faint">]</span>
        </code>
      </pre>
    </div>
  );
}

export function Experience() {
  const { experience } = site;

  return (
    <section
      id="experience"
      className="relative scroll-mt-20 border-t border-line py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="02"
          command="git log --graph --oneline"
          title="Where the production work happens."
          description="Real applications, real users — with ownership across front-end systems, secure APIs and deployment."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:gap-6">
          <Reveal>
            <div className="window flex h-full flex-col p-5 sm:p-6">
              <p className="font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
                # current branch
              </p>

              <p className="mt-2 font-mono text-[12px] text-accent">
                main → production
              </p>

              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
                {experience.role}
              </h3>

              <p className="mt-1.5 text-[14px] text-muted">
                {experience.company}
              </p>

              <ul className="mt-4 space-y-1.5 font-mono text-[11px] text-faint">
                <li className="flex items-center gap-2">
                  <span className="text-muted">type</span>
                  {experience.type}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-muted">since</span>
                  {experience.period}
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="size-3" />
                  {experience.location}
                </li>
              </ul>

              <p className="mt-5 text-[13px] leading-relaxed text-muted">
                {experience.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {experience.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto grid grid-cols-2 gap-4 border-t border-line pt-5">
                <div>
                  <p className="font-mono text-xl font-medium tracking-tight">
                    2.5+
                  </p>
                  <p className="mt-0.5 text-[11px] text-faint">
                    years in production
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xl font-medium tracking-tight">
                    5
                  </p>
                  <p className="mt-0.5 text-[11px] text-faint">
                    client platforms
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="window overflow-hidden">
              <WindowBar title="git log --author=jyoti" meta="main" />

              <div className="border-b border-line bg-canvas/50 px-3.5 py-2.5">
                <CommandPrompt command="git log --graph --oneline" />
              </div>

              <div className="border-b border-line px-3.5 py-3 font-mono text-[10.5px] leading-[1.8] text-faint">
                <p>
                  <span className="text-muted">commit</span>{" "}
                  <span className="text-accent-2">7f2a9c1</span>{" "}
                  <span className="text-accent">(HEAD → main, origin/main)</span>
                </p>
                <p>
                  <span className="text-muted">Author:</span> Jyoti{" "}
                  &lt;{site.email}&gt;
                </p>
                <p>
                  <span className="text-muted">Date:</span> {experience.period}
                </p>
              </div>

              <ol className="divide-y divide-line">
                {experience.bullets.map((bullet, index) => (
                  <li
                    key={bullet}
                    className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 px-3.5 py-3 font-mono text-[11.5px] transition-colors hover:bg-elevated/60"
                  >
                    <span aria-hidden className="text-accent">
                      *
                    </span>
                    <span className="text-accent-2">
                      {commitHash(bullet)}
                    </span>
                    <span className="text-info">
                      {SCOPES[index % SCOPES.length]}
                    </span>
                    <span className="min-w-[12rem] flex-1 leading-relaxed text-muted">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="flex items-center justify-between gap-3 border-t border-line bg-elevated/60 px-3.5 py-1.5 font-mono text-[9px] tracking-wide text-faint uppercase">
                <span>{experience.bullets.length} commits</span>
                <span className="text-accent">working tree clean</span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <CommandPrompt command="cat education.json" className="text-muted" />
          <TerminalWindow
            title="~/education.json"
            meta="read-only"
            className="mt-3"
            bodyClassName="p-4 sm:p-5"
          >
            <EducationJson />
          </TerminalWindow>
        </Reveal>
      </div>
    </section>
  );
}
