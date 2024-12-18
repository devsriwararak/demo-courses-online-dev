import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const Part5 = () => {
  const t = useTranslations("HomePage.section_4");

  return (
    <div className="bg-[#222222] py-14  md:py-20 h-full border-t-gray-800 border-t-[1px]     ">
      <h2 className="text-white text-3xl md:text-[35px]  font-[700] text-center mb-10 px-8">
        {t('title')}
      </h2>

      <div className="flex flex-col lg:flex-row items-center gap-16 2xl:gap-0 w-full lg:w-10/12 px-8 lg:px-18  mx-auto container">
        {/* วิดีโอด้านซ้าย */}
        <div className="w-full lg:w-6/12">
          <div className="relative w-full 2xl:w-[450px] 2xl-h-[350px]  object-cover">
            {/* <video
              className="w-full h-full object-cover"
              controls
              src="/path-to-your-video.mp4" // เปลี่ยนพาธให้ตรงกับไฟล์วิดีโอของคุณ
            /> */}
            <Image
              src="/blog-1.jpg" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
              alt="ข่าวหลัก"
              width={500}
              height={500}
              className=" w-full h-auto object-cover   "
              style={
                {
                  //   borderRadius: "12px 12px 12px 12px", // ปรับ border-radius ตามที่กำหนด
                }
              }
            />
          </div>
        </div>

        {/* ข้อความด้านขวา */}
        <div className="flex flex-col items-start text-white space-y-8 text-left lg:w-6/12">
          <div>
            <h3 className="text-xl md:text-[25px]  font-[700]">
              {t('result_1.title')}
            </h3>
            <p className="text-[17px] font-[400] text-[#a3a3a3] mt-2 ">
            {t('result_1.dec')}
            </p>
          </div>
          <div>
            <h3 className="text-xl md:text-[25px] font-[700]">
            {t('result_2.title')}
            </h3>
            <p className="text-[17px] font-[400] text-[#a3a3a3] mt-2">
            {t('result_2.dec')}
            </p>
          </div>
          <div>
            <h3 className="text-xl md:text-[25px] font-[700]">
            {t('result_3.title')}
            </h3>
            <p className="text-[17px] font-[400] text-[#a3a3a3] mt-2 ">
            {t('result_3.dec')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part5;
