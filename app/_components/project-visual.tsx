import type { Project } from "@/lib/site";

/**
 * These are hand-built "interface studies" — original CSS compositions that
 * evoke each product's domain. They are deliberately labelled as studies in
 * the UI so they are never mistaken for real screenshots.
 */

function Frame({
  title,
  tag,
  children,
}: {
  title: string;
  tag: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[0_40px_90px_-50px_var(--glow)]">
      <div className="flex shrink-0 items-center gap-2 border-b border-line bg-elevated/80 px-3.5 py-2.5">
        <span className="size-2 rounded-full bg-ink/20" />
        <span className="size-2 rounded-full bg-ink/12" />
        <span className="size-2 rounded-full bg-ink/8" />
        <span className="ml-2 truncate font-mono text-[10px] tracking-wide text-muted">
          {title}
        </span>
        <span className="ml-auto shrink-0 rounded-full border border-line px-2 py-0.5 font-mono text-[8px] tracking-[0.16em] text-muted uppercase">
          {tag}
        </span>
      </div>

      <div className="relative min-h-0 flex-1 p-3 sm:p-4">{children}</div>

      <div className="flex shrink-0 items-center justify-between gap-3 border-t border-line px-3.5 py-1.5">
        <span className="font-mono text-[8px] tracking-[0.14em] text-muted/70 uppercase">
          Interface study — original composition
        </span>
        <span className="font-mono text-[8px] text-muted/40">Not a screenshot</span>
      </div>

      <div className="preview-sheen pointer-events-none absolute inset-0 opacity-50" />
    </div>
  );
}

function DotGrid({ className = "" }: { className?: string }) {
  return <div className={`dot-grid pointer-events-none absolute inset-0 ${className}`} />;
}

function BookingPreview() {
  return (
    <Frame title="dialysisongo.com" tag="Patient booking">
      <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-[1.12fr_0.88fr]">
        <div className="flex min-w-0 flex-col rounded-lg border border-line bg-elevated/70 p-3.5">
          <span className="font-mono text-[9px] tracking-[0.2em] text-accent uppercase">
            Care search
          </span>
          <p className="mt-2 text-[16px] leading-[1.15] font-semibold tracking-[-0.02em]">
            Find dialysis care
            <br />
            while you travel
          </p>

          <div className="mt-3 flex items-center gap-2 rounded-md border border-line bg-canvas/70 px-2.5 py-2">
            <span className="size-2 shrink-0 rounded-full bg-accent" />
            <span className="truncate text-[11px] text-muted">Punjab, India</span>
            <span className="ml-auto font-mono text-[9px] text-muted/70">Change</span>
          </div>

          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {["Mon 12", "Tue 13", "Wed 14"].map((day, index) => (
              <span
                key={day}
                className={`rounded border px-1 py-1.5 text-center font-mono text-[9px] ${
                  index === 1
                    ? "border-accent/45 bg-accent-soft text-accent"
                    : "border-line text-muted"
                }`}
              >
                {day}
              </span>
            ))}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="rounded bg-accent-fill px-2.5 py-1.5 text-[10px] font-medium text-accent-fill-ink">
              Search clinics
            </span>
            <span className="rounded border border-line px-2 py-1.5 text-[10px] text-muted">
              Filters
            </span>
            <span className="ml-auto font-mono text-[9px] text-muted/60">EN · PT</span>
          </div>

          <div className="mt-auto space-y-1.5 pt-3">
            {["City Care Dialysis", "Sunrise Renal Centre"].map((name) => (
              <div
                key={name}
                className="flex items-center gap-2 rounded border border-line bg-canvas/40 px-2 py-1.5"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                <span className="truncate text-[10px] text-ink/85">{name}</span>
                <span className="ml-auto shrink-0 font-mono text-[8px] text-accent">
                  Available
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden overflow-hidden rounded-lg border border-line bg-canvas/60 sm:block">
          <DotGrid className="opacity-70" />

          <svg
            aria-hidden
            viewBox="0 0 200 240"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full text-accent/45"
          >
            <path
              d="M42 62 C70 92 86 118 108 132 S148 168 158 196"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="3 4"
            />
          </svg>

          <span className="absolute top-[22%] left-[18%] grid size-7 place-items-center rounded-full border border-accent/40 bg-elevated text-[9px] text-accent shadow-[0_0_0_5px_var(--accent-soft)]">
            +
          </span>
          <span className="absolute top-[50%] left-[46%] grid size-7 place-items-center rounded-full border border-accent/40 bg-elevated text-[9px] text-accent shadow-[0_0_0_5px_var(--accent-soft)]">
            +
          </span>
          <span className="absolute bottom-[24%] left-[70%] size-2.5 rounded-full bg-accent-2 shadow-[0_0_0_5px_color-mix(in_oklab,var(--accent-2)_16%,transparent)]" />

          <div className="absolute inset-x-2.5 bottom-2.5 rounded-md border border-line bg-elevated/95 px-2.5 py-2 backdrop-blur">
            <p className="text-[11px] font-medium">3 verified clinics nearby</p>
            <p className="mt-0.5 font-mono text-[8px] tracking-wide text-muted">
              Patient · Clinic · Admin
            </p>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function CrmPreview() {
  const columns = [
    { label: "New enquiry", count: "02", cards: ["Website enquiry", "Referral"] },
    { label: "Site visit", count: "01", cards: ["Property viewing"] },
    { label: "Contract", count: "01", cards: ["Offer accepted"] },
  ];

  return (
    <Frame title="crm.sunnyhomes.com.au" tag="Sales CRM">
      <div className="grid h-full grid-cols-[1fr] gap-3 sm:grid-cols-[46px_1fr]">
        <div className="hidden flex-col items-center gap-2 rounded-lg border border-line bg-elevated/60 py-2.5 sm:flex">
          <span className="grid size-7 place-items-center rounded-md bg-accent/15 font-mono text-[11px] text-accent">
            S
          </span>
          <span className="h-px w-5 bg-line" />
          {["▤", "◫", "◇", "⌂"].map((glyph, index) => (
            <span
              key={glyph}
              className={`grid size-6 place-items-center rounded text-[11px] ${
                index === 0 ? "bg-accent-soft text-accent" : "text-muted/60"
              }`}
            >
              {glyph}
            </span>
          ))}
          <span className="mt-auto size-6 rounded-full border border-line bg-canvas/60" />
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-semibold tracking-[-0.02em]">
              Pipeline overview
            </p>
            <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[8px] tracking-wide text-muted">
              SWR
            </span>
          </div>

          <div className="mt-3 grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3">
            {columns.map((column, columnIndex) => (
              <div
                key={column.label}
                className={`flex min-w-0 flex-col rounded-md border border-line bg-canvas/40 p-2 ${
                  columnIndex === 2 ? "hidden sm:flex" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="truncate font-mono text-[8px] tracking-[0.1em] text-muted uppercase">
                    {column.label}
                  </span>
                  <span className="font-mono text-[8px] text-muted/50">{column.count}</span>
                </div>

                <div className="mt-2 space-y-1.5">
                  {column.cards.map((card, cardIndex) => (
                    <div
                      key={card}
                      className={`rounded border px-2 py-1.5 ${
                        columnIndex === 2
                          ? "border-accent/35 bg-accent-soft"
                          : "border-line bg-elevated/80"
                      }`}
                    >
                      <p className="truncate text-[10px] leading-tight text-ink/90">{card}</p>
                      <div className="mt-1.5 flex items-center gap-1">
                        <span className="size-3 rounded-full bg-ink/12" />
                        <span className="h-px flex-1 bg-line-strong" />
                        {cardIndex === 0 ? (
                          <span className="font-mono text-[7px] text-accent">New</span>
                        ) : (
                          <span className="font-mono text-[7px] text-muted/60">Open</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {column.cards.length < 2 && (
                  <div className="mt-1.5 rounded border border-dashed border-line px-2 py-1.5 text-center font-mono text-[8px] text-muted/40">
                    + Add lead
                  </div>
                )}

                {columnIndex === 0 && (
                  <div className="mt-auto hidden pt-2 sm:block">
                    <div className="flex h-8 items-end gap-1">
                      {[42, 66, 50, 82, 58, 92].map((height, index) => (
                        <span
                          key={index}
                          className={`flex-1 rounded-sm ${
                            index > 3 ? "bg-accent/60" : "bg-ink/10"
                          }`}
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                    <p className="mt-1 font-mono text-[7px] text-muted/60">Lead activity</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

function VenuePreview() {
  return (
    <Frame title="tracevenue.com" tag="Event platform">
      <div className="flex h-full flex-col gap-2.5">
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line pb-2">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] tracking-tight text-ink">
              trace<span className="text-accent">venue</span>
            </span>
            <span className="h-3 w-px bg-line-strong" />
            <span className="hidden font-mono text-[9px] text-muted sm:inline">
              Organiser workspace
            </span>
          </div>
          <div className="flex items-center gap-1">
            {["Customer", "Vendor", "Provider"].map((role, index) => (
              <span
                key={role}
                className={`rounded-full border px-2 py-0.5 font-mono text-[8px] ${
                  index === 0
                    ? "border-accent/40 bg-accent-soft text-accent"
                    : "border-line text-muted/70"
                }`}
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-2 gap-2 sm:grid-cols-[0.95fr_1.05fr_0.9fr]">
          <div className="hidden min-w-0 flex-col rounded-lg border border-line bg-elevated/70 p-2.5 sm:flex">
            <div className="flex items-center gap-2">
              <div className="grid size-10 shrink-0 place-items-center rounded-md border border-accent/30 bg-accent-soft text-center font-mono text-[9px] leading-[1.15] text-accent">
                18
                <br />
                MAR
              </div>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium">Annual conference</p>
                <p className="font-mono text-[8px] text-muted">Multi-role · bookings</p>
              </div>
            </div>

            <div className="mt-2.5 flex flex-wrap gap-1">
              {["Venue", "Catering", "Décor", "AV"].map((chip, index) => (
                <span
                  key={chip}
                  className={`rounded-full border px-1.5 py-0.5 font-mono text-[8px] ${
                    index === 0
                      ? "border-accent/30 bg-accent-soft text-accent"
                      : "border-line text-muted/70"
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div>

            <p className="mt-3 border-t border-line pt-2 font-mono text-[8px] tracking-[0.12em] text-muted uppercase">
              Schedule
            </p>
            <div className="mt-1.5 space-y-1">
              {[
                ["Setup", "09:00"],
                ["Doors open", "11:00"],
                ["Session", "12:30"],
              ].map(([label, time]) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded border border-line bg-canvas/45 px-2 py-1"
                >
                  <span className="size-1 rounded-full bg-accent/70" />
                  <span className="truncate text-[9px] text-muted">{label}</span>
                  <span className="ml-auto font-mono text-[8px] text-muted/60">{time}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto rounded-md border border-line bg-canvas/50 px-2 py-1.5">
              <p className="font-mono text-[8px] text-muted">Attendees</p>
              <div className="mt-1 flex items-center gap-1">
                {[0, 1, 2].map((index) => (
                  <span
                    key={index}
                    className="size-3.5 rounded-full border border-canvas bg-ink/15"
                  />
                ))}
                <span className="font-mono text-[8px] text-muted/60">+ guests</span>
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col rounded-lg border border-line bg-elevated/70 p-2.5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[8px] tracking-[0.12em] text-muted uppercase">
                Quotations
              </p>
              <span className="font-mono text-[8px] text-muted/50">04</span>
            </div>
            <div className="mt-2 space-y-1.5">
              {[
                ["Venue partner", "Quote received", true],
                ["Catering partner", "Quote received", true],
                ["Décor partner", "Awaiting", false],
                ["AV partner", "Quote received", true],
              ].map(([name, status, done]) => (
                <div
                  key={String(name)}
                  className="flex items-center gap-2 rounded border border-line bg-canvas/45 px-2 py-1.5"
                >
                  <span
                    className={`size-1.5 shrink-0 rounded-full ${
                      done ? "bg-accent" : "bg-ink/25"
                    }`}
                  />
                  <span className="truncate text-[10px] text-ink/85">{name}</span>
                  <span
                    className={`ml-auto shrink-0 font-mono text-[7px] ${
                      done ? "text-accent" : "text-muted/60"
                    } hidden sm:inline`}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-auto space-y-1.5 pt-2">
              <div className="flex items-center gap-2 rounded-md border border-line bg-canvas/45 px-2 py-1.5">
                <span className="size-1.5 rounded-full bg-accent-2" />
                <span className="font-mono text-[8px] text-muted">REST · WebSockets</span>
              </div>
              <div className="rounded-md border border-accent/25 bg-accent-soft px-2 py-1.5 text-center text-[9px] text-accent">
                Compare quotations
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col rounded-lg border border-accent/25 bg-accent-soft/50 p-2.5">
            <p className="font-mono text-[8px] tracking-[0.12em] text-accent uppercase">
              Contract
            </p>
            <ol className="mt-2 space-y-2">
              {["Booking confirmed", "Quotations compared", "Contract review", "Signed"].map(
                (step, index) => (
                  <li key={step} className="flex items-start gap-1.5">
                    <span
                      className={`mt-0.5 grid size-3.5 shrink-0 place-items-center rounded-full font-mono text-[7px] ${
                        index < 2
                          ? "bg-accent-fill text-accent-fill-ink"
                          : "border border-accent/40 text-accent"
                      }`}
                    >
                      {index < 2 ? "✓" : index + 1}
                    </span>
                    <span className="text-[9px] leading-tight text-muted">{step}</span>
                  </li>
                ),
              )}
            </ol>

            <p className="mt-3 border-t border-accent/20 pt-2 font-mono text-[8px] tracking-[0.12em] text-muted uppercase">
              Documents
            </p>
            <div className="mt-1.5 space-y-1">
              {["Event brief", "Vendor terms"].map((doc) => (
                <div
                  key={doc}
                  className="flex items-center gap-1.5 rounded border border-line bg-canvas/45 px-1.5 py-1"
                >
                  <span className="font-mono text-[7px] text-accent">PDF</span>
                  <span className="truncate text-[8px] text-muted">{doc}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto rounded bg-accent-fill px-2 py-1 text-center text-[9px] font-medium text-accent-fill-ink">
              Send contract
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function VitalsPreview() {
  return (
    <Frame title="vitalwatch365.com" tag="Remote care">
      <div className="flex h-full flex-col gap-2.5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[15px] font-semibold tracking-[-0.02em]">Patient overview</p>
            <p className="font-mono text-[8px] text-muted">
              Remote monitoring · care plan
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 font-mono text-[8px] tracking-wide text-accent">
            <span className="size-1.5 rounded-full bg-accent" />
            Live
          </span>
        </div>

        <div className="grid flex-1 grid-cols-[1.35fr_1fr] gap-2.5">
          <div className="flex min-h-0 flex-col rounded-lg border border-line bg-elevated/65 p-2.5">
            <div className="flex items-center justify-between font-mono text-[8px] text-muted">
              <span>Vitals signal</span>
              <span className="text-muted/60">24h</span>
            </div>
            <svg
              viewBox="0 0 240 70"
              className="mt-1.5 w-full flex-1 text-accent"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <polyline
                points="0,52 22,52 28,52 33,26 38,62 44,38 50,52 70,52 78,52 83,20 88,64 94,34 100,52 124,52 132,52 137,28 142,60 148,40 154,52 178,52 186,52 191,22 196,63 202,36 208,52 232,52 240,52"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <line x1="0" y1="66" x2="240" y2="66" stroke="currentColor" strokeOpacity="0.12" />
            </svg>
            <div className="mt-1 grid grid-cols-3 gap-1 font-mono text-[8px] text-muted/70">
              {["Stable", "On track", "Daily"].map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>

          <div className="grid min-h-0 grid-cols-1 gap-1.5">
            {[
              ["Care plans", "Personalised"],
              ["Virtual PT", "Guided sessions"],
              ["Alerts", "Notifications"],
            ].map(([title, meta]) => (
              <div
                key={title}
                className="flex items-center gap-2 rounded border border-line bg-canvas/45 px-2 py-1.5"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-accent/70" />
                <div className="min-w-0">
                  <p className="truncate text-[10px] text-ink/90">{title}</p>
                  <p className="truncate font-mono text-[7px] text-muted/70">{meta}</p>
                </div>
                <span className="ml-auto text-[9px] text-muted/50">→</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-md border border-line bg-elevated/50 px-2.5 py-2">
          <span className="grid size-5 place-items-center rounded-full border border-accent/30 bg-accent-soft text-[8px] text-accent">
            ✓
          </span>
          <span className="text-[10px] text-ink/85">Progress tracking</span>
          <span className="mx-1 h-px flex-1 bg-line-strong" />
          <span className="font-mono text-[8px] text-muted">Reusable components</span>
        </div>
      </div>
    </Frame>
  );
}

function CatalogPreview() {
  const items = [
    { label: "Supplements", meta: "Wellness", tone: "bg-accent/18", glyph: "capsule" },
    { label: "Skincare", meta: "Pharmacy", tone: "bg-accent-2/16", glyph: "bottle" },
    { label: "Clinics", meta: "Nearby", tone: "bg-accent/10", glyph: "cross" },
  ] as const;

  return (
    <Frame title="appysaude.co.ao" tag="Health discovery">
      <div className="flex h-full flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-line bg-elevated/70 px-2.5 py-1.5">
            <span className="size-2 rounded-full border border-muted/50" />
            <span className="truncate text-[10px] text-muted/70">
              Search products, pharmacies, clinics
            </span>
          </div>
          <span className="rounded-md bg-accent-fill px-2.5 py-1.5 text-[10px] font-medium text-accent-fill-ink">
            Search
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {["All", "Supplements", "Pharmacies", "Clinics", "Hospitals"].map((chip, index) => (
            <span
              key={chip}
              className={`rounded-full border px-2 py-0.5 font-mono text-[8px] ${
                index === 0
                  ? "border-accent/40 bg-accent-soft text-accent"
                  : "border-line text-muted/70"
              }`}
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="grid flex-1 grid-cols-3 gap-2">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex min-h-0 flex-col rounded-md border border-line bg-elevated/60 p-1.5"
            >
              <div className={`relative flex-1 overflow-hidden rounded ${item.tone}`}>
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_32%_24%,#ffffff30,transparent_62%)]" />
                <span className="absolute inset-0 grid place-items-center">
                  {item.glyph === "capsule" && (
                    <span className="h-9 w-4 -rotate-[32deg] rounded-full border border-ink/25 bg-canvas/60 shadow-sm" />
                  )}
                  {item.glyph === "bottle" && (
                    <span className="flex flex-col items-center">
                      <span className="h-1.5 w-3 rounded-t-sm bg-ink/25" />
                      <span className="h-7 w-5 rounded-sm border border-ink/20 bg-canvas/55" />
                    </span>
                  )}
                  {item.glyph === "cross" && (
                    <span className="relative grid size-6 place-items-center rounded border border-ink/15 bg-canvas/50">
                      <span className="absolute h-3.5 w-1 rounded-sm bg-accent/70" />
                      <span className="absolute h-1 w-3.5 rounded-sm bg-accent/70" />
                    </span>
                  )}
                </span>
                <span className="absolute right-1.5 bottom-1.5 size-2 rounded-full bg-accent/60" />
              </div>
              <p className="mt-1.5 truncate text-[10px] text-ink/90">{item.label}</p>
              <p className="font-mono text-[8px] text-muted/70">{item.meta}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-md border border-line bg-elevated/50 px-2.5 py-2">
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="text-[9px] text-muted">
              Pharmacies · clinics · hospitals
            </span>
          </div>
          <span className="font-mono text-[8px] text-muted/60">Angola</span>
        </div>
      </div>
    </Frame>
  );
}

const previews = {
  booking: BookingPreview,
  crm: CrmPreview,
  venue: VenuePreview,
  vitals: VitalsPreview,
  catalog: CatalogPreview,
} as const;

export function ProjectVisual({ project }: { project: Project }) {
  const Preview = previews[project.preview];
  return <Preview />;
}
