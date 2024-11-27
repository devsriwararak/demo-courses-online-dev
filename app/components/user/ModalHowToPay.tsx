"use client";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React, { useState } from "react";

interface ModalHowToPayProps {
  open: boolean;
  handleOpen: () => void;
}

const ModalHowToPay: React.FC<ModalHowToPayProps> = ({ open, handleOpen }) => {
  const [page, setPage] = useState<number>(1);
  return (
    <Dialog open={open} handler={handleOpen} size="sm">
      <DialogHeader>วิธีการชำระเงิน</DialogHeader>
      <DialogBody className="px-8">
        <ul className="flex flex-col lg:flex-row gap-8 mb-5">
          <li
            className={`${
              page === 1
                ? "border-b-4 border-indigo-500 text-black bg-gray-100"
                : "text-gray-700"
            }  cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-md `}
            onClick={() => setPage(1)}
          >
            วิธีชำระเงินด้วย QR CODE
          </li>
          <li
            className={`${
              page === 2
                ? "border-b-4 border-indigo-500 text-black bg-gray-100"
                : "text-gray-700"
            } cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-md  `}
            onClick={() => setPage(2)}
          >
            วิธีชำระเงินด้วย CREDIT CARD
          </li>
        </ul>

        <hr className="py-4" />
        <div className="">
          {page === 1 && <HowToPay_1 />}
          {page === 2 && <HowToPay_2 />}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="gradient"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>ออก</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalHowToPay;

export const HowToPay_1 = () => {
  return (
    <div>
      <div>
        <b className="text-gray-800">ขั้นตอนที่ 1</b>
        <p>คลิกที่ปุ่ม ชำระเงินผ่าน QR CODE</p>
      </div>

      <div className="mt-4">
        <b className="text-gray-800">ขั้นตอนที่ 2</b>
        <p>สแกนบาร์โคด และชำระเงินให้ถูกต้อง และแนบสลิปมาให้ระบบตรวจสอบ</p>
      </div>

      <div className="mt-4">
        <b className="text-gray-800">ขั้นตอนที่ 3</b>
        <p>
          เมื่อระบบตรวจแล้วไม่มีข้อผิดพลาด จะพบกับเมนู ไปที่คอร์สเรียนของคุณ
        </p>
      </div>
    </div>
  );
};

export const HowToPay_2 = () => {
  return (
    <div>
      <div>
        <b className="text-gray-800">ขั้นตอนที่ 1</b>
        <p>คลิกที่ปุ่ม ชำระเงินผ่าน CREDIT CARD</p>
      </div>

      <div className="mt-4">
        <b className="text-gray-800">ขั้นตอนที่ 2</b>
        <p>ระบบจะนำทางไปหน้าชำระเงิน</p>
      </div>

      <div className="mt-4">
        <b className="text-gray-800">ขั้นตอนที่ 3</b>
        <p>กรอกข้อมูลบัตรเครดิต และตรวจสอบให้ถูกต้อง และกดชำระเงิน</p>
      </div>

      <div className="mt-4">
        <b className="text-gray-800">ขั้นตอนที่ 4</b>
        <p>ถ้าการชำระเงินถูกต้อง จะได้คอร์สเรียนที่ต้องการ </p>
      </div>
    </div>
  );
};
