"use client";
import { Input, Textarea } from "@material-tailwind/react";
import Link from "next/link";
import { FaPhoneSquare } from "react-icons/fa";
import { LuMapPin, LuPhone, LuAlarmClock, LuMail } from "react-icons/lu";
import { FaLine } from "react-icons/fa6";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const dynamic = 'force-dynamic';


export default function Page() {
  const t = useTranslations('ContactPage')

  return (
    <div className="bg-gray-100 h-full">
      <div className="mx-auto container px-6 md:px-20 py-10">
        <div>
          <Image
            src="/contact_1.webp"
            width={900}
            height={900}
            alt=""
            loading="lazy"
            className="w-full  rounded-md"
          />
        </div>
        <h1 className="text-3xl mt-6 lg:mt-12 ">{t('left.title')}</h1>

        <div className="flex flex-col lg:flex-row gap-8 mt-4 lg:mt-6c items-end">
          <div className="w-full ">
            <div className="bg-white border border-gray-200 shadow-md rounded-md px-6 py-8">
              <h1 className="text-xl text-gray-800">{t('left.card.title')}</h1>
              <div className="flex flex-col md:flex-row gap-2 mt-6">
                <Input
                  crossOrigin="anonymous"
                  type="text"
                  label={t('left.card.input_1')}
                  color="indigo"
                />

                <Input
                  crossOrigin="anonymous"
                  type="text"
                  label={t('left.card.input_2')}
                  color="indigo"
                />
              </div>
              <div className="mt-4   rounded-md w-full   ">
                <Textarea label={t('left.card.input_3')} className=" " color="indigo" />
              </div>
              <div className="text-right mt-8">
                <button className="bg-indigo-900 hover:bg-indigo-800 text-white px-4 py-2 rounded-md">
                {t('left.card.button')}
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:mx-4">
            <h1 className=" text-2xl lg:text-3xl text-gray-800">
            {t('right.title')}
            </h1>
            <p className="mt-4 text-gray-700 text-sm">
              {" "}
              {t('right.dec')}
            </p>

            <div className="flex flex-col md:flex-row gap-6 mt-6 px-4 lg:px-0">
              <div className="w-full border border-gray-100 rounded-md px-4 py-3 bg-white shadow-lg">
                <div className="flex flex-row gap-4 items-center justify-center">
                  <div className="w-1/5">
                    <LuMapPin size={40} className="text-indigo-900" />
                  </div>
                  <div className="w-4/5">
                    <h2 className="text-lg text-indigo-900">{t('right.card_1.title')}</h2>
                    <p className=" text-sm text-gray-600 mt-1 ">
                    {t('right.card_1.dec')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full border border-gray-100 rounded-md px-4 py-3 bg-white shadow-lg">
                <div className="flex flex-row gap-4 items-center justify-center">
                  <div className="w-1/5">
                    <LuPhone size={40} className="text-indigo-900" />
                  </div>
                  <div className="w-4/5">
                    <h2 className="text-lg text-indigo-800">{t('right.card_2.title')}</h2>

                    <ul className=" text-sm text-gray-600 mt-1">
                      <li>
                        <Link href="tel:0949926280">{t('right.card_2.dec')}</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-6 px-4 lg:px-0">
              <div className="w-full border border-gray-100 rounded-md px-4 py-3 bg-white shadow-lg">
                <div className="flex flex-row gap-4 items-center justify-center">
                  <div className="w-1/5">
                    <LuAlarmClock size={40} className="text-indigo-900" />
                  </div>
                  <div className="w-4/5">
                    <h2 className="text-lg text-indigo-800">{t('right.card_3.title')}</h2>
                    <p className=" text-sm text-gray-600 mt-1">
                    {t('right.card_3.dec')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full border border-gray-100 rounded-md px-4 py-3 bg-white shadow-lg">
                <Link href="https://line.me/R/ti/p/@nangfahpatrade">
                  <div className="flex  gap-4 items-center justify-center">
                    <div className="w-1/5">
                      <FaLine size={40} className="text-indigo-900" />
                    </div>
                    <div className="w-4/5">
                      <h2 className="text-lg text-indigo-800">
                      {t('right.card_4.title')}
                      </h2>

                      <p className=" text-sm text-gray-600 mt-1">
                      {t('right.card_4.dec')}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
