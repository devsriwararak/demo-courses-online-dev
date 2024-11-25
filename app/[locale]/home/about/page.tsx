"use client";
import { Button } from "@material-tailwind/react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLine } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { AiFillTikTok } from "react-icons/ai";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { FaChalkboardUser } from "react-icons/fa6";
import { VscVmActive } from "react-icons/vsc";
import { MdAppShortcut } from "react-icons/md";


import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Page() {
  const locale = useLocale()
  const t = useTranslations("AboutPage");
  const results = t.raw("section_2.results");



  return (
    <div className="">
      {/* Location 1 */}
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-center mx-auto container  py-10 px-6 lg:px-0 ">
        <section className="w-full ">
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/95swkQaFKVU?si=Dp6duli8vtn-HF6Y&start=248&autoplay=1&mute=1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className=" rounded-md"
          ></iframe>
        </section>
        <section className="w-full ">
          <p className="text-gray-500">{t("section_1.small")} </p>
          <h1 className="text-3xl lg:text-4xl mt-2 leading-relaxed">
            {t("section_1.title")}{" "}
          </h1>
          <p className="mt-6 text-gray-600 ">{t("section_1.dec")}</p>

          <div className="flex flex-col lg:flex-row gap-5 py-6  ">
            <section className="w-full">
              <div className="flex flex-row gap-2 items-start">
                <div>
                  <FaCheckSquare size={18} className="text-indigo-800" />{" "}
                </div>
                <div>
                  <p className="font-semibold">
                    {t("section_1.item_1.title")}{" "}
                    <span className="text-gray-600">
                      {t("section_1.item_1.dec")}
                    </span>
                  </p>
                </div>
              </div>
            </section>

            <section className="w-full">
              <div className="flex flex-row gap-2 items-start">
                <div>
                  <FaCheckSquare size={18} className="text-indigo-800" />{" "}
                </div>
                <div>
                  <p className="font-semibold">
                    {t("section_1.item_2.title")}{" "}
                    <span className="text-gray-600">
                      {t("section_1.item_2.dec")}
                    </span>
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className=" flex flex-col lg:flex-row gap-6 items-start lg:items-center mt-4">
            <Button className="text-sm bg-indigo-900">
              <Link href={`/${locale}/home/course`}>{t("section_1.button")}</Link>
            </Button>
            <div className="flex flex-row gap-3">
              <Link href="xxx">
                <FaFacebookSquare
                  size={40}
                  className="text-indigo-900 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800 p-2 rounded-full"
                />
              </Link>
              <Link href="xxx">
                <FaLine
                  size={40}
                  className="text-indigo-900 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800 p-2 rounded-full"
                />
              </Link>
              <Link href="xxx">
                <IoLogoYoutube
                  size={40}
                  className="text-indigo-900 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800 p-2 rounded-full"
                />
              </Link>
              <Link href="xxx">
                <AiFillTikTok
                  size={40}
                  className="text-indigo-900 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800 p-2 rounded-full"
                />
              </Link>
              <Link href="xxx">
                <FaPhoneSquareAlt
                  size={40}
                  className="text-indigo-900 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800 p-2 rounded-full"
                />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Location 2 bg-gradient-to-b from-transparent via-indigo-50 to-purple-100 */}
      <div className="bg-gray-200 mt-2 lg:mt-8">
        <div className="   mx-auto container py-16 pb-24  px-6 lg:px-0 ">
          <p className="text-sm text-left lg:text-center text-gray-700">
            {t("section_2.small")}
          </p>
          <h2 className="mt-2 text-2xl lg:text-4xl text-left lg:text-center leading-relaxed">
            {t("section_2.title")}
          </h2>

          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center bg-red mt-8">
            <section className=" w-full lg:w-2/4 px-6 py-6 bg-white rounded-md shadow-lg">
              <div className="flex flex-col lg:flex-row gap-6">
                <section className="w-1/7">
                  <FaChalkboardUser className="text-indigo-800" size={40} />
                </section>
                <section className="w-6/7">
                  <h3 className="text-base">{results[0]?.title}</h3>
                  <p className="text-sm mt-2 text-gray-700">
                    {results[0]?.dec}
                  </p>
                  <div className="mt-4 text-indigo-800 font-semibold">
                    <Link href={`/${locale}/home/activity`}>{results[0].link_text}</Link>
                  </div>
                </section>
              </div>
            </section>

            <section className="w-full lg:w-3/4 px-6 py-6 bg-white rounded-md shadow-lg">
              <div className="flex flex-col lg:flex-row gap-6">
                <section className="w-1/6">
                  <VscVmActive className="text-indigo-800" size={70} />
                </section>
                <section className="w-5/6">
                  <h3 className="text-base">{results[1]?.title_1}</h3>
                  <p className="text-sm mt-2 text-gray-700">
                    {results[1]?.dec_1}
                  </p>
                  <h3 className="text-base mt-4">{results[1]?.title_2}</h3>
                  <p className="text-sm mt-2 text-gray-700">
                    {results[1]?.dec_2}
                  </p>
                  <div className="mt-4 text-indigo-800 font-semibold">
                    <Link href={`/${locale}/home/activity`}>{results[1].link_text}</Link>
                  </div>
                </section>
              </div>
            </section>

            <section className="w-full lg:w-2/4 px-6 py-6 bg-white rounded-md shadow-lg">
              <div className="flex flex-col lg:flex-row gap-6">
                <section className="w-1/7">
                  <MdAppShortcut className="text-indigo-800" size={40} />
                </section>
                <section className="w-6/7">
                  <h3 className="text-base">{results[2]?.title}</h3>
                  <p className="text-sm mt-2 text-gray-700">
                  {results[2]?.dec}
                  </p>
                  <div className="mt-4 text-indigo-800 font-semibold">
                    <Link href={`/${locale}/home/activity`}>{results[2].link_text}</Link>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
