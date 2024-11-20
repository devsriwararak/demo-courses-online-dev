//app/[locale]/home/page.tsx

'use client';
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const t = useTranslations("");

  const changeLanguage = (locale: string) => {
    router.push(`/${locale}/home`);
  };
  return (
    <>
      <div>text : {t("welcome")}</div>

      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => changeLanguage("th")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          TH
        </button>
        <button
          onClick={() => changeLanguage("en")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          EN
        </button>
      </div>
    </>
  );
};

export default HomePage;
