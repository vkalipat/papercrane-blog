import Link from "next/link";

const posts = [
  {
    slug: "benchmarking-senba",
    title: "Senba",
    date: "2026-08-25",
    dateLabel: "August 25, 2026",
    blurb:
      "How Senba was fine-tuned from MarS-FM, what the training cost, and how it performed on 28 mdCATH validation proteins.",
  },
];

export default function Writing() {
  return (
    <main className="mx-auto w-full max-w-[52rem] px-5 pb-32 pt-20 sm:px-6 md:px-12">
      <h1 className="font-[family-name:var(--font-display)] text-display-sm text-[var(--color-ink)]">
        Writing
      </h1>
      <p className="mt-4 max-w-[46ch] text-[1.02rem] leading-relaxed text-[var(--color-ink-mute)]">
        Notes on the models we train and the evidence behind them.
      </p>

      <ul className="mt-14 divide-y divide-[var(--color-rule-soft)] border-t border-[var(--color-rule-soft)]">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              className="paper-motion group block py-7 transition-opacity duration-[var(--duration-med)] hover:opacity-70"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h2 className="font-[family-name:var(--font-display)] text-display-xs text-[var(--color-ink)]">
                  {post.title}
                </h2>
                <time
                  dateTime={post.date}
                  className="font-[family-name:var(--font-technical)] text-xs tracking-[0.04em] text-[var(--color-ink-mute)]"
                >
                  {post.dateLabel}
                </time>
              </div>
              <p className="mt-2 max-w-[58ch] text-[0.98rem] leading-relaxed text-[var(--color-ink-soft)]">
                {post.blurb}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
