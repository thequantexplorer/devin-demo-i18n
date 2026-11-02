import { use } from 'react';
import type { Metadata } from 'next';
import { useFormatter, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  return { title: t('metaTitle') };
}

const openedOn = new Date(Date.UTC(2019, 3, 6));

export default function AboutPage({ params }: Props) {
  setRequestLocale(use(params).locale);
  const t = useTranslations('About');
  const format = useFormatter();
  const opened = format.dateTime(openedOn, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  return (
    <>
      <section className="hero">
        <h1>{t('title')}</h1>
        <p className="lede">{t('lede', { opened })}</p>
      </section>
      <section className="cards">
        <article className="card">
          <h2>{t('story.title')}</h2>
          <p>{t('story.body')}</p>
        </article>
        <article className="card">
          <h2>{t('visit.title')}</h2>
          <p>{t('visit.body')}</p>
        </article>
      </section>
    </>
  );
}
