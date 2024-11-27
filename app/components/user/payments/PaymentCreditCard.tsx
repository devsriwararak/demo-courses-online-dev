import { Button } from "@material-tailwind/react";
import React from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

const PaymentCreditCard = ({
  setLoading,
  buyData,
  checkPay,
}: {
  setLoading: (e: any) => void;
  buyData: any;
  checkPay: any;
}) => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";
  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const userId = decryptData(localStorage.getItem("Id") || "");

  const price = buyData.products_price_sale
    ? buyData.products_price_sale
    : buyData.products_price;

  // Start Section Function ****************************************************************

  const handleSubmit = async () => {
    const sendData = {
      users_id: userId,
      product: {
        id: buyData.product_id,
        name: buyData.product_title,
        price: price,
      },
      code : checkPay.code || ""
    };
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe is not loaded!");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/payment/creditcard/checkout`,
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
        const session_id = res.data.session_id;
        // Redirect ไปที่ Stripe Checkout
        const result = await stripe?.redirectToCheckout({
          sessionId: session_id,
        });

        if (result?.error) {
          console.error(result.error.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteOrder = async()=> {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/payment/creditcard/delete`,{code : checkPay.code},
        {
          headers: {
            Authorization: `Bearer ${decryptData(
              localStorage.getItem("Token") || ""
            )}`,
          },
        }
      );

      if (res.status === 200) {
    
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button
        className={`${
          checkPay.code ? "hidden" : "block"
        }  w-full justify-center items-center text-base font-normal mb-0`}
        size="sm"
        onClick={handleSubmit}
      >
        ชำระเงินผ่าน CREDIT CARD
      </Button>

      {/* กรณี เข้าไปแล้ว แต่ไม่กดจ่าย */}
      {checkPay.type === 2 && checkPay.status === 0 && (
        <Button
          className={` w-full justify-center items-center text-base font-normal mb-0`}
          size="sm"
          onClick={handleSubmit}
        >
          คุณชำระเงินไม่สำเร็จ (ทำรายการใหม่)
        </Button>
      )}

      {checkPay.status === 1 && (
        <div>
          <h2 className="text-gray-900">รายละเอียดการสั่งซื้อ</h2>
          {/* สถานะ */}
          <div className="flex flex-col lg:flex-row gap-3 items-center mt-3">
            <div className="w-1/5">
              <p className="text-gray-800">สถานะ :</p>{" "}
            </div>
            <div className="w-4/5">
              <p className="bg-green-200 text-green-800 px-4  text-center w-32 rounded-md">
                ชำระเงินแล้ว
              </p>
            </div>
          </div>

          {/* เลขที่บิล */}
          <div className="flex flex-col lg:flex-row gap-3 items-center mt-2">
            <div className="w-1/5">
              <p className="text-gray-800">เลขที่บิล :</p>{" "}
            </div>
            <div className="w-4/5">{checkPay.code}</div>
          </div>

          {/* ซื้อในราคา */}
          <div className="flex flex-col lg:flex-row gap-3 items-center mt-2">
            <div className="w-1/5">
              <p className="text-gray-800">ซื้อในราคา :</p>{" "}
            </div>
            <div className="w-4/5">{checkPay.price} บาท</div>
          </div>

          {/* สถานะ */}
          <div className="flex flex-col lg:flex-row gap-3 items-center mt-2">
            <div className="w-1/5">
              <p className="text-gray-800">วันที่เริ่มต้น :</p>{" "}
            </div>
            <div className="w-4/5">{checkPay.start_pay}</div>
          </div>

          {/* สถานะ */}
          <div className="flex flex-col lg:flex-row gap-3 items-center mt-2">
            <div className="w-1/5">
              <p className="text-gray-800">วันที่สิ้นสุด :</p>{" "}
            </div>
            <div className="w-4/5">{checkPay.end_pay}</div>
          </div>

          {/* Button */}
          <div className="mt-8">
            <Link
              className="bg-indigo-800 hover:bg-indigo-600 text-white px-4 py-1.5 rounded-md"
              href="/user/mycourse"
            >
              คอร์สเรียนของฉัน
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCreditCard;
