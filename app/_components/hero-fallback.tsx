export function HeroFallback() {
  return (
    <div
      aria-hidden
      className="relative mx-auto aspect-square w-full max-w-[520px]"
    >
      <div className="absolute inset-[16%] rounded-full bg-accent/10 blur-3xl" />

      {/* Orbit rings */}
      <div className="absolute inset-[4%] rounded-full border border-line" />
      <div className="absolute inset-[10%] rounded-full border border-dashed border-line-strong" />
      <div className="orbit-spin absolute inset-[10%] rounded-full">
        <span className="absolute top-0 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_var(--accent)]" />
        <span className="absolute bottom-[8%] left-[14%] size-1 rounded-full bg-accent-2" />
      </div>
      <div className="absolute inset-[20%] rounded-full border border-line" />

      {/* Core */}
      <div className="absolute inset-[27%] overflow-hidden rounded-full bg-[radial-gradient(circle_at_32%_26%,#b8ffd0_0%,#16c7a0_30%,#0a5a4c_66%,#06231e_100%)] shadow-[inset_-26px_-30px_70px_#00000080,0_50px_120px_-30px_var(--glow)]">
        <div className="absolute inset-0 rounded-full bg-[linear-gradient(120deg,transparent_35%,#ffffff26_48%,transparent_60%)]" />
        <div className="absolute top-1/2 left-1/2 h-[140%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/15" />
        <div className="absolute top-1/2 left-1/2 h-[62%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/10" />
        <div className="absolute top-1/2 left-1/2 h-[140%] w-[92%] -translate-x-1/2 -translate-y-1/2 rotate-[28deg] rounded-[50%] border border-white/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_115%,#a3f66b33,transparent_55%)]" />
      </div>

      {/* Floating technology chips */}
      <div className="animate-float absolute top-[13%] left-0 flex items-center gap-2 rounded-full border border-line bg-elevated/80 px-3 py-1.5 font-mono text-[10px] text-muted shadow-xl backdrop-blur">
        <span className="size-1.5 rounded-full bg-accent" />
        TypeScript
      </div>

      <div className="animate-float-delayed absolute right-0 bottom-[16%] flex items-center gap-2 rounded-full border border-line bg-elevated/80 px-3 py-1.5 font-mono text-[10px] text-muted shadow-xl backdrop-blur">
        <span className="size-1.5 rounded-full bg-accent-2" />
        REST API
      </div>

      <div className="absolute bottom-[4%] left-[18%] flex items-center gap-2 rounded-full border border-line bg-elevated/80 px-3 py-1.5 font-mono text-[10px] text-muted shadow-xl backdrop-blur">
        <span className="size-1.5 rounded-full bg-accent" />
        AWS
      </div>
    </div>
  );
}
