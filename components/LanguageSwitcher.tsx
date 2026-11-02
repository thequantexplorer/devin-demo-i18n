'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const pathname = usePathname();
  return (
    <nav aria-label={t('label')} className="language-switcher">
      {routing.locales
        .filter((other) => other !== locale)
        .map((other) => (
          <Link key={other} href={pathname} locale={other} hrefLang={other} lang={other}>
            {t(other)}
          </Link>
        ))}
    </nav>
  );
}
