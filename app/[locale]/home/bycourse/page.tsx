"use client";
import { Button } from "@material-tailwind/react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaCheckSquare } from "react-icons/fa";
import { VscArrowRight, VscGraphLine, VscServerEnvironment, VscVmRunning, VscWand } from "react-icons/vsc";
import * as Icons from "react-icons/vsc";


export default function Page() {
  const image_1 = "/bycourse_1.webp";
  const locale = useLocale()
  const t = useTranslations("BycoursePage");
  const results = t.raw("section_2.results");

  const data = [
    {
      id: 0,
      title: "เข้าสู่ระบบ / สมัครสมาชิก หรือเข้าผ่าน OTP",
      icon: <VscWand size={30} className="text-indigo-600" />,
      dec: "สมัครสมาชิก และล็อคอินเข้าสู่ระบบ สามารถล็อคอินผ่าน OTP จะส่งไปที่อีเมล์ ทำให้การเข้าสู่ระบบง่าย และปลอดภัยมากขึ้น",
      button: "เข้าสู่ระบบ / สมัครสมาชิก",
      link: "/login"
    },
    {
      id: 1,
      title: "เลือกคอร์สเรียนที่ต้องการ กดซื้อคอร์สเรียนได้เลย",
      icon: <VscGraphLine size={30} className="text-indigo-600" />,
      dec: "เมื่อเข้าสู่ระบบแล้ว สามารถไปที่หน้าคอร์สเรียนทั้งหมด และเลือกคอร์สเรียนที่ต้องการ มีรายละเอียดให้ดูก่อนเลือกซื้อคอร์สเรียน",
      button: "คอร์สเรียนทั้งหมด",
      link:`/${locale}/home/course`
    },
    {
      id: 2,
      title: "สแกน QR CODE ชำระเงิน จากระบบของเรา",
      icon: <VscServerEnvironment size={30} className="text-indigo-600" />,
      dec: "เมื่อเลือกคอร์สเรียนเสร็จแล้ว ให้กดเข้าไปที่คอร์สเรียนที่ต้องการ จะพบกับเมนูสั่งซื้อ เมื่อกดแล้วจะพบกับ QR Code สำหรับชำระเงิน",
      button: "คอร์สเรียนทั้งหมด",
      link:`/${locale}/home/course`
    },
    {
      id: 3,
      title: "แนบสลิปโอนเงิน รับคอร์สเรียนทันที",
      icon: <VscVmRunning size={30} className="text-indigo-600" />,
      dec: "หลังจากชำระเงินเสร็จแล้ว ให้แนบสลิปมาที่ระบบ อยู่ข่างล่าง QR Code เรามีระบบตรวจสอบสลิปที่ปลอดภัย และแม่นยำ 100% ",
      button: "คอร์สเรียนทั้งหมด",
      link:`/${locale}/home/course`
    },
  ];

  return (
    <div className="py-10">
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-center container mx-auto  px-8 lg:px-0">
        <section className="w-full">
          <div className="bg-white rounded-md shadow-xl px-1.5 py-1.5">
            <Image
              src={image_1}
              width={500}
              height={500}
              alt=""
              className="w-full rounded-md"
            />
          </div>
        </section>
        <section className="w-full">
          <h1>{t('section_1.title')}</h1>
          <p className="text-base mt-3 text-gray-700">
          {t('section_1.dec')}
          </p>
          <ul className="text-indigo-600 mt-4 flex flex-col gap-2">
            <li className="flex flex-row gap-2 items-center">
              <FaCheckSquare size={20} className="text-indigo-800" />{" "}
              <p>{t('section_1.item_1')}</p>
            </li>
            <li className="flex flex-row gap-2 items-center">
              <FaCheckSquare size={20} className="text-indigo-800" />{" "}
              <p>{t('section_1.item_2')}</p>
            </li>
            <li className="flex flex-row gap-2 items-center">
              <FaCheckSquare size={20} className="text-indigo-800" />{" "}
              <p>{t('section_1.item_3')}</p>
            </li>
          </ul>
          <Button size="md" className="mt-6 bg-indigo-800 text-sm">
            <Link href={`/${locale}/home/course`}>{t('section_1.button')} </Link>
          </Button>
        </section>
      </div>

      {/* 4 ขั้นตอน */}
      <div className="mt-8 flex flex-wrap  container mx-auto  px-8 lg:px-0">
        {results.map((item: any, index: number) => (
          <section className=" w-full lg:w-1/4 p-2 " key={item.id}>
            <div className="bg-white rounded-md shadow-xl px-6 py-8 lg:py-6">
              <div className="flex flex-row gap-2 justify-between">
                <div className="w-3/4">
                  <h2 className=" text-lg text-indigo-800 ">{item.title}</h2>
                </div>
                <div className="1/4">
                  <IconRenderer iconName={item.icon} />
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-700">{item.dec}</p>
              <Link href={
                item.status_locale ? `/${locale}/${item.link}` : item.link
              }>
                <div className="mt-6 flex flex-row gap-2 justify-start items-center">
                  <p className="text-sm text-indigo-900  font-medium ">
                    {item.button}
                  </p>
                  <VscArrowRight
                    className="bg-gray-200 hover:bg-gray-300 rounded-full p-1"
                    size={20}
                  />
                </div>
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

type IconRendererProps = {
  iconName: keyof typeof Icons; 
};

const IconRenderer: React.FC<IconRendererProps> = ({ iconName }) => {
  const IconComponent = Icons[iconName];

  if (!IconComponent) return null;

  return <IconComponent size={30} className="text-indigo-600" />;
};

