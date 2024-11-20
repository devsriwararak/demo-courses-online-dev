// import { useEffect } from "react";
import { FooterHome } from "../../app/components/home/footer";
import { HeaderHome } from "../../app/components/home/header";
import Part8 from "../../app/components/home/part8";
export default function Layout({ children }: { children: React.ReactNode }) {

  

    // useEffect(() => {
    //     const storedValue = sessionStorage.getItem("login");
    //       console.log(storedValue);
    //   }, []);
      
  return (
    <div className=" flex flex-col min-h-screen bg-gray-100  ">
      <div className=" sticky top-0 z-50">
        <HeaderHome />
      </div>
      <div className="flex-grow -mt-1">
      {children}
      </div>
      <Part8 />
    </div>
  );
}
