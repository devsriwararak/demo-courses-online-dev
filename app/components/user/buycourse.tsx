"use client";
import { useRecoilValue } from "recoil";
import { BuyCourseStore } from "@/store/store";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import Image from "next/image";

import axios from "axios";
import { HeaderAPI, HeaderMultiAPI } from "@/headerApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Router } from "next/router";
import { useRouter, useParams } from "next/navigation"; // Correct import
import Topsale from "../topsale";
import parse from "html-react-parser";

import CryptoJS from "crypto-js";
import ModalHowToPay from "./ModalHowToPay";
import PaymentQrcode from "./payments/PaymentQrcode";
import PaymentCreditCard from "./payments/PaymentCreditCard";

const MySwal = withReactContent(Swal);

const BuyCourse = () => {
  // const buyData = useRecoilValue(BuyCourseStore);
  const [buyData, setBuyData] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [bill, setBill] = useState("");
  const [payId, setPayId] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState("กำลังตรวจสอบ...");

  const [loadingQrcode, setLoadingQrcode] = useState(false);
  const [file, setFile] = useState(null);
  const [imageQrCode, setImageQrCode] = useState("");

  // check Pay
  const [checkPay, setCheckPay] = useState<any>({
    id: "",
    code: "",
    status: "",
  });
  const [paymentPage, setPaymentPage] = useState(0);
  const [paymentSelect, setPaymentSelect] = useState(0);

  const { id } = useParams();

  const router = useRouter();

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const userId = decryptData(localStorage.getItem("Id") || "");

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const truncateText = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${decryptData(
              localStorage.getItem("Token") || ""
            )}`,
          },
        }
      );

      if (res.status === 200) {
        const price = res.data.products_price_sale
          ? res.data.products_price_sale
          : res.data.products_price;

        setBuyData(res.data);
        
        setTimeout(() => {
          fetchDataMyPay(price);
        }, 2000);
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data from server.");
    }
  };

  const fetchDataMyPay = async (price:number) => {
    try {
      const sendData = {
        products_id: id,
        users_id: userId,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/pay/users/check_pay`,
        sendData,
        {
          headers: {
            Authorization: `Bearer ${decryptData(
              localStorage.getItem("Token") || ""
            )}`,
          },
        }
      );

      if (res.status === 200) {
        setLoadingQrcode(true);
        await fetchDataCreateQrCode(price);

        setCheckPay({
          id: res.data.id,
          code: res.data.code,
          status: res.data.status,
        });

        if (res.data.id) {
          setLoading("");
          setShow(true);
          setPaymentSelect(res.data.type);

          // await
        } else {
          setShow(false);
          setLoading("ยังไม่ทำรายการซื้อ");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Create QR Code
  const fetchDataCreateQrCode = async (price: number) => {
    try {
      const sendData = { price: price || 0 };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/pay/users/qr_code/create`,
        sendData,
        {
          headers: {
            Authorization: `Bearer ${decryptData(
              localStorage.getItem("Token") || ""
            )}`,
          },
        }
      );
      const qrCodePath = await res.data.qrCodePath;
      if (qrCodePath) {
        console.log({ qrCodePath });
        setImageQrCode(qrCodePath);
        setLoadingQrcode(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [show]);

  return (
    <div className="flex flex-col w-full justify-center items-center  lg:flex-row gap-5 py-0 lg:py-10 px-3 lg:px-36   ">
      <ToastContainer autoClose={2000} theme="colored" />
      <ModalHowToPay open={open} handleOpen={handleOpen} />
      {/* <h1>SHOW : {JSON.stringify(show)}</h1>
      <h1>paymentSelect : {paymentSelect}</h1> */}

      <div className="w-full md:w-3/5 ">
        <Card className="lg:h-[550px] w-full overflow-auto gap-5 !bg-white  ">
          <div className="w-full flex justify-center bg-gray-300 rounded-sm   ">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${buyData?.product_image}`}
              alt=""
              width={400}
              height={400}
              className="flex w-auto h-auto lg:w-[400px]  "
            />
          </div>

          <div className="flex flex-col  gap-1.5 py-4 px-6 md:px-8  ">
            <div className=" flex flex-col lg:flex-row  gap-2  ">
              <div className="w-full lg:w-1/6">
                <Typography className=" text-base text-black ">
                  หัวข้อ :
                </Typography>
              </div>
              <div className="w-full text-sm lg:w-5/6">
                <Typography className="text-base ">
                  {buyData?.product_title || ""}
                </Typography>
              </div>
            </div>

            <div className=" flex flex-col lg:flex-row gap-2  ">
              <div className="w-full lg:w-1/6">
                <Typography className=" text-black  text-base">
                  ราคา :
                </Typography>
              </div>
              <div className="w-full text-sm lg:w-5/6">
                <Typography className="text-base">
                  {buyData?.products_price_sale
                    ? buyData?.products_price_sale.toLocaleString()
                    : buyData?.products_price.toLocaleString()}{" "}
                  <span className="ml-1.5">บาท</span>
                </Typography>
              </div>
            </div>

            <div className=" flex flex-col lg:flex-row gap-2    ">
              <div className="w-full lg:w-1/6">
                <Typography className="font-bold text-base text-red-500  ">
                  ลดเหลือ :
                </Typography>
              </div>
              <div className="w-full text-sm lg:w-5/6">
                <Typography className="text-base text-red-500">
                  {buyData?.products_price_sale
                    ? buyData?.products_price.toLocaleString()
                    : 0}
                  <span className="ml-1.5">บาท</span>
                </Typography>
              </div>
            </div>

            <div className=" flex flex-col lg:flex-row gap-2 items-start ">
              <div className=" w-full lg:w-1/6">
                <Typography className=" text-black ">รายละเอียด :</Typography>
              </div>
              {/* <Typography>{truncateText(buyData?.dec || "", 70)}</Typography> */}
              <div className="w-full text-sm lg:w-5/6">
                {parse(buyData?.product_dec || "")}
              </div>
            </div>

            <div className="mt-4 mb-10">
              <h2 className="text-lg text-black">รายละเอียดบทเรียน</h2>
              <div className="mt-5 bg-gray-50 rounded-md">
                {buyData?.result_list?.map((lesson: any, index: number) => (
                  <div
                    key={index}
                    className="flex border-b  py-3 px-5 justify-between items-center border  border-gray-200 hover:bg-gray-100 transition duration-200"
                  >
                    <h2 className="font-semibold text-sm text-gray-700">
                      {lesson.title}
                    </h2>
                    <p className="text-gray-800 text-sm">
                      จำนวน {lesson.video_count} บทเรียน
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="w-full md:w-2/5  ">
        <Card className="lg:h-[550px] w-full overflow-auto gap-5 px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 ">
            <div className="w-full lg:w-2/3 flex gap-4 ">
              {/* <Button
                className="w-full justify-center items-center text-base font-normal mb-0"
                size="sm"
              
                onClick={handleCheck}
                disabled={checkPay.id}
              >
                ทำรายการซื้อ
              </Button> */}
              <button
                className={`${paymentPage === 1 ? "bg-gray-300" : "bg-gray-100"} border-2 border-gray-300 rounded-md  hover:bg-gray-200 disabled:bg-gray-800  disabled:text-gray-300`}
                onClick={() => setPaymentPage(1)}
                disabled={paymentSelect === 2}
              >
                <Image
                  src="/payment_qrcode.webp"
                  alt=""
                  width={300}
                  height={300}
                />
                <p className="text-sm  hover:text-black hover:font-semibold">
                  QR CODE {paymentSelect}
                </p>
              </button>
              <button
                className={`${paymentPage === 2 ? "bg-gray-300" : "bg-gray-100"} border-2 border-gray-300 rounded-md  hover:bg-gray-200 disabled:bg-gray-800  disabled:text-gray-700`}
                onClick={() => setPaymentPage(2)}
                disabled={paymentSelect === 1}
              >
                <Image
                  src="/payment_visa.webp"
                  alt=""
                  width={300}
                  height={300}
                />
                <p className="text-sm hover:text-black hover:font-semibold  ">
                  CREDIT CARD
                </p>
              </button>{" "}
            </div>

            <div className="w-full flex flex-col gap-3  justify-center items-center lg:w-1/3 ">
              <Button
                className="w-full justify-center items-center text-base font-normal mb-0 bg-indigo-900"
                size="sm"
                onClick={handleOpen}
              >
                วิธีการชำระเงิน
              </Button>
              {loading && <p className="text-sm">{loading}</p>}
            </div>
          </div>

          <hr className=" " />

          {paymentPage === 1 && (
            <PaymentQrcode
              show={show}
              setShow={setShow}
              buyData={buyData}
              loading={loading}
              setLoading={setLoading}
              fetchDataMyPay={fetchDataMyPay}
              imageQrCode={imageQrCode}
              loadingQrcode={loadingQrcode}
              checkPay={checkPay}
            />
          )}
          {paymentPage === 2 && <PaymentCreditCard setLoading={setLoading} buyData={buyData}  />}
        </Card>
      </div>
    </div>
  );
};

export default BuyCourse;
