import { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

const features = ['pickup', 'helmet', 'maps'] as const;

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale);
  const t = useTranslations('Home');
  return (
    <>
      <section className="hero">
        <h1>{t('title')}</h1>
        <p className="lede">{t('lede')}</p>
        <Link href="/pricing" className="button">
          {t('cta')}
        </Link>
      </section>
      <section className="cards">
        {features.map((key) => (
          <article key={key} className="card">
            <h2>{t(`features.${key}.title`)}</h2>
            <p>{t(`features.${key}.body`)}</p>
          </article>
        ))}
      </section>
    </>
  );
}
