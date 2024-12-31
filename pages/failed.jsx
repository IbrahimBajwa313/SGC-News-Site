import React from "react";
import Wrapper from "@/components/Wrapper";
import Link from "next/link";

const Failed = () => {
  return (
    <div className="min-h-screen flex items-center bg-gray-100">
      <Wrapper>
        <div className="max-w-lg rounded-lg p-6 border border-gray-300 bg-white mx-auto flex flex-col shadow-md">
          <div className="text-2xl font-bold text-gray-800 text-center">
            Payment Failed!
          </div>
          <div className="text-base mt-4 text-center text-gray-600">
            For any product-related queries, drop an email to:
          </div>
          <div className="underline text-center text-blue-600 mt-2">
            shoeshopcontact@shop.com
          </div>

          <Link href="/">
            <button className="w-full text-lg bg-black text-white rounded-full py-3 mt-8 font-medium transition-transform active:scale-95 hover:bg-gray-800">
              Continue Shopping
            </button>
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default Failed;
