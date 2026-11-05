import Link from "next/link";

export default function NotFound() {
  return (
    <section className="gutter flex min-h-[80vh] flex-col justify-end pb-24 pt-40">
      <p className="eyebrow mb-4 text-muted">Page not found</p>
      <h1 className="t-page max-w-4xl">
        This page has <em>drifted off</em>
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted">The link may be old, or the page may have moved.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-ink">
          Back to the home page
        </Link>
        <Link href="/watersport" className="btn btn-line">
          See the watersports
        </Link>
      </div>
    </section>
  );
}
