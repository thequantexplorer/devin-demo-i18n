import { useTranslations } from 'next-intl';

export default function SiteFooter() {
  const t = useTranslations('Footer');
  const year = 2026;
  return (
    <footer className="site-footer">
      <p>{t('rights', { year: String(year) })}</p>
      <p>{t('questions', { email: 'hello@ridgeline.bike' })}</p>
    </footer>
  );
}
