// app/[locale]/page.tsx


import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
 
export default function HomePage() {
  const t = useTranslations('');
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <Link href="/home">{t('description')}</Link>
    </div>
  );
}