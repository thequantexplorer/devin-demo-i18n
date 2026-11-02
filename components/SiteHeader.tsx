import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand">
        Ridgeline Bikes
      </Link>
      <nav aria-label="Main">
        <Link href="/">Home</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/about">About us</Link>
      </nav>
    </header>
  );
}
