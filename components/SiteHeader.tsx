import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function SiteHeader() {
  const t = useTranslations('Header');
  return (
    <header className="site-header">
      <Link href="/" className="brand">
        {t('brand')}
      </Link>
      <nav aria-label={t('mainNav')}>
        <Link href="/">{t('home')}</Link>
        <Link href="/pricing">{t('pricing')}</Link>
        <Link href="/about">{t('about')}</Link>
      </nav>
      <LanguageSwitcher />
    </header>
  );
}
