// app/[locale]/page.tsx
// ต้องการให้ไปที่ /locale/home
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import { redirect } from 'next/navigation';

 
export default function HomePage({params} : {params : {locale : string}}) {
  const t = useTranslations('');
  redirect(`/${params.locale}/home`);

}