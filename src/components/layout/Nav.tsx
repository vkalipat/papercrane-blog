export function Nav() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-[var(--color-rule-soft)] bg-[color-mix(in_srgb,var(--color-paper)_88%,white_12%)] backdrop-blur-[6px]">
      <div className="mx-auto flex h-[72px] w-full max-w-[88rem] items-center justify-between gap-4 px-5 sm:px-6 md:px-12 lg:px-20">
        <a
          href="/"
          aria-label="papercrane home"
          className="paper-motion inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-xl italic leading-none text-[var(--color-ink)] transition-opacity duration-[var(--duration-med)] hover:opacity-70 md:text-2xl"
        >
          <span
            aria-hidden="true"
            className="font-[family-name:var(--font-technical)] text-[0.7rem] not-italic tracking-[0.2em] text-[var(--color-accent)]"
          >
            ≼
          </span>
          papercrane
        </a>
      </div>
    </header>
  );
}
