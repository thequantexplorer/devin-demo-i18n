import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About us | Ridgeline Bikes',
};

const openedOn = new Date(Date.UTC(2019, 3, 6));

export default function AboutPage() {
  const opened = openedOn.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  return (
    <>
      <section className="hero">
        <h1>About Ridgeline Bikes</h1>
        <p className="lede">We are a small, family-run shop by the river. We opened on {opened}.</p>
      </section>
      <section className="cards">
        <article className="card">
          <h2>Our story</h2>
          <p>We started with six old bikes and a garage. Today we look after more than 80 bikes.</p>
        </article>
        <article className="card">
          <h2>Visit us</h2>
          <p>12 River Street. Open every day from 8 am to 7 pm.</p>
        </article>
      </section>
    </>
  );
}
