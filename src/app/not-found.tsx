import Link from "next/link";

export const metadata = {
  title: "404 – Not Found",
  description: "The page you're looking for isn't on the pitch.",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 text-foreground">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(237,237,237,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative flex w-full max-w-md flex-col items-center">
        {/* Eyebrow */}
        <div className="mb-8 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">
          <span className="h-px w-8 bg-foreground/20" />
          Error 404
          <span className="h-px w-8 bg-foreground/20" />
        </div>

        {/* Headline */}
        <h1 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          Out of play
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-center text-[15px] leading-relaxed text-foreground/55">
          The page you&apos;re looking for isn&apos;t on the pitch.
          <br />
          It may have been moved, renamed, or never existed.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="group mt-10 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.03] px-5 py-2.5 text-sm font-medium text-foreground/90 backdrop-blur-sm transition-all hover:border-foreground/30 hover:bg-foreground/[0.06] hover:text-foreground"
        >
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12.5 8H3.5" />
            <path d="M7 3.5L3.5 8 7 12.5" />
          </svg>
          Back to dashboard
        </Link>
      </div>

      {/* Bottom pitch-stripe accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(237,237,237,0.15), transparent)",
        }}
      />
    </main>
  );
}