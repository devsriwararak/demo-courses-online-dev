("");
import { truncateText } from "@/app/libs/TruncateText";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { parse } from "path";

export const fetchNews = async () => {
  const requestData = {
    page: 1,
    search: "",
    full: false,
    home: true,
  };

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/api/homepage/news`,
      requestData
    );
    return res.data;
  } catch (err) {
    const error = err as { response: { data: { message: string } } };
    console.error(error.response?.data?.message);
    return []; // Return เป็น array เปล่า เพื่อป้องกัน Error ในการ Map ข้อมูล
  }
};


interface NewsItemProps {
  image: string; // ประเภท string สำหรับ URL ของรูปภาพ
  title: string; // ประเภท string สำหรับหัวข้อข่าว
  description: string; // ประเภท string สำหรับคำบรรยายข่าว
  id: any;
}

interface News {
  id: number;
  image_title: string;
  title: string;
  dec: string;
}

// Main Component
const Part4 = async () => {
  const data = await fetchNews();

  return (
    <div className="bg-[#222222] py-14 md:py-20  h-full   ">
      <div className="px-8 lg:px-18  mx-auto container">
        <h2 className="text-white text-[28px] sm:text-[35px] font-[700] text-nowrap">
          ข่าวสารและกิจกรรมล่าสุด
        </h2>
        <div className="flex flex-col w-full lg:flex-row gap-8 ">
          <LargeNewsItem
            image={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${
              data?.data?.[0]?.image_title || ""
            }`}
            title={data?.data?.[0]?.title || "ไม่มีหัวข้อข่าว"}
            description={truncateText(
              data?.data?.[0]?.dec?.replace(/<\/?[^>]+(>|$)/g, ""),
              200
            )}
            id={data?.data?.[0]?.id || "0"}
          />

          <div className="flex flex-col lg:w-7/12 gap-7 lg:mt-[33px] xl:mt-[80px] 2xl:mt-[40px]">
            {data?.data?.slice(1).map((news: News, index: number) => (
              <NewsItem
                key={index}
                id={news.id}
                image={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${news?.image_title}`}
                title={news?.title}
                description={truncateText(
                  news?.dec?.replace(/<\/?[^>]+(>|$)/g, ""),
                  100
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LargeNewsItem: React.FC<NewsItemProps> = ({
  image,
  title,
  description,
  id,
}) => (
  <div
    className="mt-10 rounded-xl lg:w-5/12 xl:overflow-hidden"
    style={{ background: "#CDCDCD" }}
  >
    <Link href={`/home/activity/${id}`}>
      <Image
        src={image}
        alt={title}
        width={500}
        height={500}
        className="lg:-mt-[50px] w-full h-auto 2xl:h-[300px] object-cover"
        style={{ borderRadius: "12px 12px 0px 0px" }}
      />
      <div className="p-4 px-7">
        <h3 className="text-[16px] sm:text-[18px] font-[700] text-[#093165] mb-4">
          {title}
        </h3>
        <p className="text-[14px] font-[400] text-[#181818] mb-4">
          {description}
        </p>
        <div className="flex gap-3 items-center">
          <button className="bg-[#093165] text-white text-[14px] font-[700] px-4 py-2 rounded-lg">
            อ่านเพิ่มเติม 
          </button>
        </div>
      </div>
    </Link>
  </div>
);

// Component สำหรับแสดงข่าวทั่วไป
const NewsItem: React.FC<NewsItemProps> = ({
  image,
  title,
  description,
  id,
}) => (
  <div className="w-full  rounded-xl">
    <div className="flex flex-col md:flex-row gap-0 md:gap-8 bg-[#cdcdcd] w-full h-full rounded-lg ">
      <section className="w-full md:w-1/2">
        <div className="relative w-full h-48 ">
          <Link href={`/home/activity/${id}`}>
            <Image
              src={image}
              layout="fill"
              objectFit="cover"
              alt={title}
              loading="lazy"
              className="w-full h-full rounded-md"
            />
          </Link>
        </div>
      </section>

      <section className="w-full md:w-2/3 py-5 px-7">
        <Link href={`/home/activity/${id}`}>
          <h3 className="text-[16px] sm:text-[18px] font-[700] text-[#093165] mb-4">
            {title}
          </h3>
          <p className="text-[14px] font-[400] text-[#181818] mb-4">
            {description}
          </p>
          <div className="flex gap-3 items-center">
            <button className="bg-[#093165] text-white text-[14px] font-[700] px-4 py-2 rounded-lg">
              อ่านเพิ่มเติม
            </button>
            {/* <span className="text-[14px] font-[400] text-[#181818]">
              12 พ.ค. 2024
            </span> */}
          </div>
        </Link>
      </section>
    </div>
  </div>
);



export default Part4;
