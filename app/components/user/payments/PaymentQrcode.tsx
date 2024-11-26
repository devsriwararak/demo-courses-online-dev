"use client";
import { Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import {  useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { HeaderAPI, HeaderMultiAPI } from "@/headerApi";
import CryptoJS from "crypto-js";

const PaymentQrcode = ({
  show,
  setShow,
  buyData,
  loading, 
  setLoading, 
  fetchDataMyPay,
  imageQrCode , 
  loadingQrcode ,
  checkPay
}: {
  show: any;
  setShow: any;
  buyData: any;
  loading : string;
  setLoading : (e:string)=>void
  fetchDataMyPay : any;
  imageQrCode : string;
  loadingQrcode : boolean;
  checkPay : any;

}) => {
  const [bill, setBill] = useState("");
  const [payId, setPayId] = useState("");
  const [success, setSuccess] = useState(false);

  const [file, setFile] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);


  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";
  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const userId = decryptData(localStorage.getItem("Id") || "");


  //   END State *************************************************************************************

//   const fetchDataMyPay = async (price: number) => {
//     try {
//       const sendData = {
//         products_id: id,
//         users_id: userId,
//       };

//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API}/api/pay/users/check_pay`,
//         sendData,
//         {
//           headers: {
//             Authorization: `Bearer ${decryptData(
//               localStorage.getItem("Token") || ""
//             )}`,
//           },
//         }
//       );
//       console.log({ mypat: res });

//       if (res.status === 200) {
//         setCheckPay({
//           id: res.data.id,
//           code: res.data.code,
//           status: res.data.status,
//         });

//         setLoadingQrcode(true);
//         await fetchDataCreateQrCode(price);

//         if (res.data.id) {
//           setLoading("");
//           setShow(true);

//           // await
//         } else {
//           setShow(false);
//           setLoading("ยังไม่ทำรายการซื้อ");
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

  // Create QR Code
//   const fetchDataCreateQrCode = async (price: number) => {
//     try {
//       const sendData = { price: price || 0 };

//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API}/api/pay/users/qr_code/create`,
//         sendData,
//         {
//           headers: {
//             Authorization: `Bearer ${decryptData(
//               localStorage.getItem("Token") || ""
//             )}`,
//           },
//         }
//       );
//       const qrCodePath = await res.data.qrCodePath;
//       if (qrCodePath) {
//         console.log({ qrCodePath });
//         setImageQrCode(qrCodePath);
//         setLoadingQrcode(true);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]); // Capture the file when the input changes
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("กรุณาแนบไฟล์สลิป!"); // Display an error message if no file is selected
      return;
    }

    MySwal.fire({
      title: "กำลังส่งข้อมูล...",
      allowOutsideClick: false,
      width: "350px",
      padding: "35px",
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    const formData = new FormData();
    formData.append("pay_id", payId ? payId : checkPay.id);

    const price = buyData?.products_price_sale
      ? buyData?.products_price_sale.toLocaleString()
      : buyData?.products_price.toLocaleString();

    formData.append("price", price);
    formData.append("file", file);

    try {
      console.log(Object.fromEntries(formData));
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/pay/upload_slip`,
        formData,
        { ...HeaderMultiAPI(decryptData(localStorage.getItem("Token") || "")) }
      );

      console.log(response);

      if (response.status === 200) {
        await fetchDataMyPay(0);
        toast.success(response.data.message);
        setSuccess(true);
        MySwal.close();
      } else {
        setLoading("");
        toast.error("Form submission failed!");
        MySwal.close();
      }
    } catch (err) {
      MySwal.close();
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
      setLoading("");
    }
  };

  const handleCheck = async () => {
    setLoading("");
    MySwal.fire({
      title: "กำลังส่งข้อมูล...",
      allowOutsideClick: false,
      width: "350px",
      padding: "35px",
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    const data = {
      users_id: Number(userId),
      product_id: Number(buyData?.product_id),
    };
    try {
      // console.log(data);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/pay/add`,
        data,
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        setPayId(res.data.pay_id);
        setShow(true);
        setBill(res?.data?.bill_number);
        MySwal.close();
      } else {
        return;
      }
    } catch (err) {
      MySwal.close();
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
      setLoading("");
    }
  };



  return (
    <>
      <Button
        className={` ${checkPay.id ? "hidden": "block"} w-full justify-center items-center text-base font-normal mb-0`}
        size="sm"
        onClick={handleCheck}
        disabled={checkPay.id}
      >
        ชำระเงินผ่าน QR CODE
      </Button> 
      {show ? (
        <>
          <div className="flex flex-col gap-3 ">
            <>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full">
                  {loadingQrcode
                    ? imageQrCode && (
                        <img
                          src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${imageQrCode}`}
                          className="w-32"
                          alt=""
                        />
                      )
                    : "กำลังสร้าง QR Code ...."}
                </div>
                <div className="w-full">
                  <ul className="text-base">
                    <li>บัญชี : พร้อมเพย์</li>
                    <li>เลขที่บัญชี : 0850032649</li>
                    <li>ชื่อเจ้าของบัญชี : นาย</li>
                  </ul>
                </div>
              </div>
            </>

            <div className="flex flex-col 2xl:flex-row gap-5 2xl:gap-[57px] items-center mb-2 ">
              <div className="w-full">
                <Typography className="font-bold whitespace-nowrap  ">
                  บิลเลขที่ :
                </Typography>
                <Typography className="text-base">
                  {bill || checkPay.code}
                </Typography>
              </div>

              <div className="w-full">
                <div
                  className={`${
                    checkPay.status == 0
                      ? "bg-red-500"
                      : checkPay.status === 1
                      ? "bg-green-500"
                      : ""
                  } py-2 px-4  flex gap-2 rounded-md`}
                >
                  <Typography className="font-semibold text-white">
                    สถานะ :
                  </Typography>
                  <Typography className="font-semibold text-white">
                    {checkPay.status == 0
                      ? "ยังไม่ชำระ"
                      : checkPay.status === 1
                      ? "ชำระเงินแล้ว"
                      : ""}
                  </Typography>
                </div>
              </div>
            </div>

            {success ? (
              ""
            ) : (
              <div className="">
                <hr className="" />

                <div className="flex flex-col 2xl:flex-row items-center gap-5 2xl:gap-[34px]  py-2">
                  <div className="w-full">
                    <Typography className="font-bold text-base whitespace-nowrap ">
                      ราคารวมภาษีมูลค่าเพิ่ม :
                    </Typography>
                    <Typography className="text-lg">
                      ราคา{" "}
                      {buyData?.products_price_sale || 0 > 0
                        ? buyData?.products_price_sale?.toLocaleString()
                        : buyData?.products_price?.toLocaleString()}{" "}
                      บาท
                    </Typography>
                  </div>

                  {checkPay.status === 0 && (
                    <div className="w-full">
                      <Input
                        type="file"
                        label="แนบสลิป files"
                        onChange={handleFileChange}
                        crossOrigin="anonymous"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            <hr className="" />
            {success || checkPay.status === 1 ? (
              <div className=" flex gap-2  w-full sm:w-[200px] mt-5">
                <Button
                  className="w-full justify-center items-center text-base font-normal mb-0"
                  size="sm"
                  style={{
                    backgroundImage:
                      "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
                  }}
                  onClick={() => router.push("/user/mycourse")}
                >
                  ไปที่คอร์สเรียนของคุณ
                </Button>
              </div>
            ) : (
              <div className=" flex gap-2 w-full sm:w-[150px] mt-3 ">
                <Button
                  className="w-full justify-center items-center text-base font-normal mb-0"
                  size="sm"
                  style={{
                    backgroundImage:
                      "linear-gradient(150deg, rgba(162,102,246,1) 10.8%, rgba(203,159,249,1) 94.3%)",
                  }}
                  onClick={handleSubmit}
                >
                  สั่งซื้อคอร์สเรียนนี้
                </Button>
              </div>
            )}
            <small className="text-red-700 mt-1">
              ** เราใช่ระบบตรวจจับสลิปโอนเงิน กรุณาตรวจสอบให้ถูกต้องก่อนโอน
            </small>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default PaymentQrcode;
