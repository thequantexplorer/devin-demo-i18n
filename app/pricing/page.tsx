import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | Ridgeline Bikes',
};

const plans = [
  { name: 'Hourly', price: 8, unit: 'per hour', perks: ['City bike', 'Helmet and lock'] },
  { name: 'Day pass', price: 35, unit: 'per day', perks: ['City bike or e-bike', 'Helmet and lock', 'Route map'] },
  { name: 'Week pass', price: 120, unit: 'per week', perks: ['E-bike', 'Helmet and lock', 'Free repairs'] },
];

const formatPrice = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

export default function PricingPage() {
  return (
    <>
      <section className="hero">
        <h1>Simple prices</h1>
        <p className="lede">No deposit and no hidden fees. Cancel for free up to one hour before.</p>
      </section>
      <section className="cards">
        {plans.map((plan) => (
          <article key={plan.name} className="card">
            <h2>{plan.name}</h2>
            <p className="price">
              {formatPrice(plan.price)} <span>{plan.unit}</span>
            </p>
            <ul>
              {plan.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
            <a href="mailto:hello@ridgeline.bike" className="button">
              Book now
            </a>
          </article>
        ))}
      </section>
    </>
  );
}
