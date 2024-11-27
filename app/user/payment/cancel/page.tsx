'use client'
import { Card, CardBody } from '@material-tailwind/react'
import Link from 'next/link'
import React from 'react'
import { MdCancel } from "react-icons/md";


const Page = () => {
  return (
    <div className="my-20   mx-auto container w-1/2 ">
      <Card>
        <CardBody className="py-10">
          <div className="flex flex-col justify-center items-center gap-8  ">
            <MdCancel size={80} color="red" />

            <h1 className="text-4xl text-black">เกิดข้อผิดพลาดในการชำระเงิน</h1>
            <p className=' text-gray-800'>กรุณาลองใหม่อีกครั้ง</p>
            <Link
              className="bg-indigo-800 hover:bg-indigo-600 text-white px-4 py-1.5 rounded-md"
              href="/user/shopcourse"
            >
              คอร์สเรียนทั้งหมด
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Page