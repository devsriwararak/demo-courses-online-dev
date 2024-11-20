import Image from "next/image";
import React from "react";

const Part3 = () => {
  return (
    <div className="bg-[#070e20] py-16 flex flex-col items-center">
      <h2 className="text-white text-3xl  md:text-[60px] font-[400] text-center mb-10">
        เรียนเทรดกับเราได้อะไรบ้าง
      </h2>

      <div className="flex flex-col lg:flex-row  gap-10   xl:gap-0 w-full xl:w-9/12 container mx-auto px-10 md:px-0">
        {/* ข้อความด้านซ้าย */}
        <div className="flex flex-col  text-white space-y-16 2xl:space-y-28 2xl:pt-10  lg:w-5/12">
          <div className="text-center xl:w-[400px]">
            <h3 className="text-2xl md:text-[28px] font-[700]">รู้ข่าวทองคำ</h3>
            <p className="text-lg md:text-[20px]  font-[400] mt-4 text-gray-300">
            อ่านข่าวสารเกี่ยวกับทองคำรูปแบบ
            </p>
            <p className="text-lg md:text-[20px]  font-[400] mt-4 text-gray-300">
            การเทรดแบบชนข่าวและการเทรดแบบช้อนข่าว
            </p>
          </div>
          <div className="text-center  2xl:ps-[180px]">
            <h3 className="text-2xl md:text-[28px] font-[700] ">เทคนิคกราฟปลายไส้</h3>
            <p className="text-lg md:text-[20px]  font-[400] mt-4 text-gray-300">
              เรียนรู้เทคนิคกราฟปลายไส้ที่จะทำให้คุณเทรด ได้อย่างแม่นยำ
            </p>
          </div>
          <div className="text-center lg:w-[400px] ">
            <h3 className="text-2xl md:text-[28px] font-[700]">จุด TP, SL ที่แม่นยำ</h3>
            <p className="text-lg md:text-[20px]  font-[400] mt-4 text-gray-300">
              รู้เทคนิควิเคราะห์จุด TP, SL ที่แม่นยำ
            </p>
          </div>
        </div>

        {/* รูปภาพโทรศัพท์ */}
        <div className="relative flex lg:w-4/12 items-center text-center  justify-center">
          <Image
            src="/iphone.png" // เปลี่ยนพาธให้ตรงกับไฟล์ของคุณ
            alt="Phone with Trading Screen"
            width={500}
            height={500}
            loading="lazy"
            className="w-[300px] lg:w-[400px] mx-auto  object-cover"
          />
        </div>

        {/* ข้อความด้านขวา */}
        <div className="flex flex-col item-start lg:items-start    text-white space-y-16  2xl:space-y-28 2xl:mt-[100px] text-left lg:w-5/12">
        <div className="text-center xl:w-[400px]  ">
            <h3 className="text-2xl md:text-[28px] font-[700] ">วิเคราะห์แนวรับ-แนวต้าน</h3>
            <p className="text-lg md:text-[20px]  font-[400] 2xl:ps-[70px] mt-4 text-gray-300 ">
            วิเคราะหจุด์แนวรับ-แนวต้านที่แม่นยำ เพื่อให้คุณไม่พลาดทุกออเดอร์
            </p>
          </div>
          <div className="text-center  ">
            <h3 className="text-2xl md:text-[28px] font-[700]">การอ่านแท่งเทียน/แท่งกราฟ</h3>
            <p className="text-lg md:text-[20px]  font-[400] xl:w-[300px] mt-4 text-gray-300">
              การอ่านแท่งเทียน/แท่งกราฟ สัญลักษณ์ที่สำคัญในการเทรด
            </p>
          </div>
          <div className="text-center  ">
            <h3 className="text-2xl md:text-[28px] font-[700]">เทคนิคเทรด 30 เทคนิค</h3>
            <p className="text-lg md:text-[20px]  font-[400] mt-4 text-gray-300">
            สอนเทคนิคเทรดทองคำ สั้น - ยาว กว่า 30 เทคนิค
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part3;
