"use client";
import axios from "axios";
import React, { useEffect } from "react";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";
const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const page = () => {
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
      if (res.status === 200) {
        console.log(res.data);
        if (res.data.status !== 1) {
          // ให้ redirect ไปหน้า /user/payment/cancel
          router.push("/user/payment/cancel");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>Success คอร์สเรียนของฉัน</div>;
};

export default page;
