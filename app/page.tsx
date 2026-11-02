import Link from 'next/link';

const features = [
  {
    title: 'Pick up in minutes',
    body: 'Show your booking at the counter and ride away. No paperwork.',
  },
  {
    title: 'Helmet and lock included',
    body: 'Every rental comes with a helmet, a lock and a phone mount.',
  },
  {
    title: 'Free route maps',
    body: 'Ask for our printed map of the best rides along the river.',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <h1>Rent a bike, see the city</h1>
        <p className="lede">City bikes and e-bikes by the hour, the day or the week.</p>
        <Link href="/pricing" className="button">
          See prices
        </Link>
      </section>
      <section className="cards">
        {features.map((f) => (
          <article key={f.title} className="card">
            <h2>{f.title}</h2>
            <p>{f.body}</p>
          </article>
        ))}
      </section>
    </>
  );
}
