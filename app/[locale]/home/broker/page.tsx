"use client";
import { Button } from "@material-tailwind/react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaCheckSquare, FaChevronRight } from "react-icons/fa";
import { FaApple, FaGooglePlay, FaCheck } from "react-icons/fa";

export default function Page() {
  const locale = useLocale();
  const t = useTranslations("BrokerPage");
  const results = t.raw("section_2.results");

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row gap-3 items-end mx-auto container px-6 md:px-20 py-14 lg:py-20">
        <section className="w-full">
          <h1 className="text-2xl lg:text-3xl  leading-relaxed">
            {t("section_1.title")}
          </h1>

          <ul className="text-indigo-600 mt-6 flex flex-col gap-2">
            <li className="flex flex-row gap-2 items-center">
              <FaCheckSquare size={20} className="text-indigo-800" />{" "}
              <p className="text-base lg:text-xl">{t("section_1.item_1")}</p>
            </li>
            <li className="flex flex-row gap-2 items-center">
              <FaCheckSquare size={20} className="text-indigo-800" />{" "}
              <p className="text-base lg:text-xl">{t("section_1.item_2")}</p>
            </li>
            <li className="flex flex-row gap-2 items-center">
              <FaCheckSquare size={20} className="text-indigo-800" />{" "}
              <p className="text-base lg:text-xl">{t("section_1.item_3")}</p>
            </li>
          </ul>

          <div className="flex flex-row gap-2 md:gap-4 justify-center lg:justify-start items-center mt-8">
            <Button className="text-base bg-indigo-900" size="md">
              {t("section_1.btn_1")}
            </Button>
            <Button className="text-base  bg-yellow-800" size="md">
              <Link href="/home/course">{t("section_1.btn_2")}</Link>
            </Button>
          </div>
        </section>

        <section className="w-full ">
          <div className="flex flex-col lg:flex-row gap-4 items-end justify-center mt-8 lg:mt-0 ">
            <section className="w-full lg:w-1/3 flex justify-center   ">
              <Image
                src="/broker_2.webp"
                width={900}
                height={900}
                alt=""
                loading="lazy"
                className="w-60 lg:w-48  rounded-md  "
              />
            </section>
            <section className="w-full lg:w-2/3 mt-6 lg:mt-0 ">
              <h2 className="text-2xl">Install Our Apps</h2>
              <p className="text-gray-700 mt-2">install from the link</p>

              <div className="mt-4 flex flex-row gap-2">
                <button className=" w-full flex flex-row justify-center items-center gap-2 border-2 border-whtite bg-black hover:bg-gray-900 text-white px-4 py-3 rounded-xl">
                  <FaApple size={23} /> <p>App Store</p>
                </button>
                <button className="w-full flex flex-row justify-center items-center gap-2 border-2 border-whtite bg-black hover:bg-gray-900 text-white px-4 py-3 rounded-xl">
                  <FaGooglePlay size={23} /> <p>Google Play</p>
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>

      {/* Location - 2 */}

      <div className=" bg-gray-200">
        <div className=" mx-auto container px-6 md:px-20 py-16 lg:py-20">
          <h2 className="text-2xl leading-relaxed lg:text-3xl text-left lg:text-center">
            {t("section_2.title")}
          </h2>
          <p className="mt-3 text-gray-700 tet-sm text-left lg:text-center">
            {t("section_2.dec")}
          </p>

          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mt-10 text-black">
            {results.map((item: any) => (
              <div className=" bg-gray-300 rounded-lg px-6 py-8 w-full" key={item.id}>
                <h3 className="text-xl">{item.title}</h3>

                <p className="text-gray-700 mt-2">{item.dec}</p>

                <ul className="mt-6 flex flex-col gap-2">
                  <li className="flex flex-row gap-2 items-center">
                    <FaCheck size={16} className="text-green-700" />
                    <p>{item.item_1} </p>
                  </li>
                  <li className="flex flex-row gap-2 items-center">
                    <FaCheck size={16} className="text-green-700" />
                    <p>{item.item_2} </p>
                  </li>
                  <li className="flex flex-row gap-2 items-center">
                    <FaCheck size={16} className="text-green-700" />
                    <p>{item.item_3} </p>
                  </li>
                </ul>

                <div className="mt-4 flex flex-row gap-2 justify-end items-center">
                <Link href="/" className="text-gray-900 font-semibold text-sm">
                  {item.link_text}
                </Link>
                <FaChevronRight
                  size={20}
                  className="bg-gray-400 p-1 rounded-full"
                />
              </div>
              
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
