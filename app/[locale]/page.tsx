// app/[locale]/page.tsx
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();
  return (
    <main>
        <p>{t("welcome")}</p>
    </main>
  );
}
