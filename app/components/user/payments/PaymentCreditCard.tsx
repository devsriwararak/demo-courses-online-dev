import { Button } from "@material-tailwind/react";
import React from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);


const PaymentCreditCard = ({
  setLoading,
  buyData,
}: {
  setLoading: (e: any) => void;
  buyData: any;
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
    };
    const stripe = await stripePromise;
    if (!stripe) {
      console.error('Stripe is not loaded!');
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

      if(res.status === 200){
        const session_id = res.data.session_id
        // Redirect ไปที่ Stripe Checkout
        const result = await stripe?.redirectToCheckout({sessionId:session_id})

        if(result?.error) {
          console.error(result.error.message);
        }
        
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        className={`  w-full justify-center items-center text-base font-normal mb-0`}
        size="sm"
        onClick={handleSubmit}
        // disabled={checkPay.id}
      >
        ชำระเงินผ่าน CREDIT CARD
      </Button>
    </div>
  );
};

export default PaymentCreditCard;
