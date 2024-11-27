"use client";
import axios from "axios";
import React, { useEffect } from "react";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@material-tailwind/react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";
const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const Page = () => {
  const router = useRouter();

  const fetchData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("id");

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/payment/creditcard/order/${code}`,

        {
          headers: {
            Authorization: `Bearer ${decryptData(
              localStorage.getItem("Token") || ""
            )}`,
          },
        }
      );

      console.log(res.data);
      
      if (res.status === 200) {
        setTimeout(() => {
          if (res.data.status !== 1) {
            router.push("/user/payment/cancel");
          }  
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="my-20   mx-auto container w-1/3 ">
      <Card>
        <CardBody className="py-10">
          <div className="flex flex-col justify-center items-center gap-8  ">
            <FaCheckCircle size={80} color="green" />

            <h1 className="text-4xl text-black">ทำรายการซื้อสำเร็จ !!</h1>
            <Link
              className="bg-indigo-800 hover:bg-indigo-600 text-white px-4 py-1.5 rounded-md"
              href="/user/mycourse"
            >
              คอร์สเรียนของฉัน
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Page;
