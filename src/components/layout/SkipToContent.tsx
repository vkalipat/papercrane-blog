/**
 * Keyboard-only skip link. Hidden until focused, then appears pinned
 * top-left so users bypass the sticky nav.
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--color-paper)]"
    >
      Skip to content
    </a>
  );
}
