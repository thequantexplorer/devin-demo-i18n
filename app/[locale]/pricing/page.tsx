import { use } from 'react';
import type { Metadata } from 'next';
import { useFormatter, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pricing' });
  return { title: t('metaTitle') };
}

const plans = [
  { key: 'hourly', price: 8 },
  { key: 'day', price: 35 },
  { key: 'week', price: 120 },
] as const;

export default function PricingPage({ params }: Props) {
  setRequestLocale(use(params).locale);
  const t = useTranslations('Pricing');
  const format = useFormatter();
  return (
    <>
      <section className="hero">
        <h1>{t('title')}</h1>
        <p className="lede">{t('lede')}</p>
      </section>
      <section className="cards">
        {plans.map((plan) => (
          <article key={plan.key} className="card">
            <h2>{t(`plans.${plan.key}.name`)}</h2>
            <p className="price">
              {format.number(plan.price, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}{' '}
              <span>{t(`plans.${plan.key}.unit`)}</span>
            </p>
            <ul>
              {(t.raw(`plans.${plan.key}.perks`) as string[]).map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
            <a href="mailto:hello@ridgeline.bike" className="button">
              {t('book')}
            </a>
          </article>
        ))}
      </section>
    </>
  );
}
