import { site } from "@/lib/site";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
      {children}
    </p>
  );
}

function ProjectCard({
  index,
  project,
}: {
  index: number;
  project: (typeof site.projects)[number];
}) {
  return (
    <a
      href={project.href}
      className="group relative flex flex-col gap-4 rounded-2xl border border-line bg-elevated/70 p-6 transition duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-elevated"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          aria-hidden
          className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        >
          ↗
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium tracking-tight text-ink">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">
          {project.description}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <span className="font-mono text-[11px] tracking-wider text-muted uppercase group-hover:text-accent">
        {project.linkLabel}
      </span>
    </a>
  );
}

export default function Home() {
  return (
    <div id="top" className="mx-auto w-full max-w-5xl px-6">
      {/* Hero */}
      <section className="flex flex-col justify-center pt-24 pb-24 sm:pt-32 sm:pb-28">
        {site.available && (
          <div className="mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-elevated/60 px-3 py-1.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
              Available for new work
            </span>
          </div>
        )}

        <h1 className="max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          Building thoughtful software{" "}
          <span className="bg-gradient-to-r from-accent via-emerald-200 to-sky-300 bg-clip-text text-transparent">
            for the web.
          </span>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {site.hero.subheading}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-white"
          >
            See my work
            <span aria-hidden>↓</span>
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent/60 hover:bg-accent-soft"
          >
            Get in touch
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-2 py-2.5 text-sm text-muted transition-colors hover:text-ink"
          >
            GitHub <span aria-hidden>↗</span>
          </a>
        </div>

        <p className="mt-14 font-mono text-xs text-muted">
          {site.role} · {site.location}
        </p>
      </section>

      {/* Work */}
      <section id="work" className="scroll-mt-24 border-t border-line py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-3">
            <Eyebrow>01 / Work</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Selected work
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted">
            A few things I&apos;ve designed, built and shipped — plus the tools
            behind them.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.projects.map((project, index) => (
            <ProjectCard key={project.title} index={index} project={project} />
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 border-t border-line py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
          <div className="space-y-3">
            <Eyebrow>02 / About</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              A developer who sweats the details
            </h2>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              {site.about.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="divide-y divide-line border-y border-line">
              {site.stack.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-3 py-5 sm:grid-cols-[7rem_1fr] sm:items-start"
                >
                  <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-line bg-elevated/60 px-2.5 py-1 text-xs text-ink/90"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 border-t border-line py-20">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-elevated/60 p-8 sm:p-12">
          <div
            aria-hidden
            className="absolute -top-24 -right-16 size-72 rounded-full bg-accent/10 blur-[90px]"
          />

          <div className="relative space-y-6">
            <Eyebrow>03 / Contact</Eyebrow>
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Have something worth building? Let&apos;s talk.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              I&apos;m open to freelance projects and full-time roles. The
              fastest way to reach me is email — I usually reply within a day.
            </p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2">
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 border-b border-line pb-1 font-mono text-base text-ink transition-colors hover:border-accent hover:text-accent sm:text-lg"
              >
                {site.email}
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
              >
                github.com/Jyoti0902 <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
