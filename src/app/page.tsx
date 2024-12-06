// page.tsx
'use client';
import ExchangeBox from "@/components/ExchangeBox";
import Header from "@/components/Header";
import { PrinterContext } from "@/context/PrinterProvider";
import PrintAction from "@/helpers/PrintAction";
import  { useContext } from "react";

export default function Home() {

  return (

    <div >
      <Header/>      
      <ExchangeBox/>
      <PrintAction/>
    </div>
  );
}
