import React from "react";
import Wrapper from "@/components/Wrapper";
import Link from "next/link";

const Success = () => {
  return (
    <div className="min-h-screen flex items-center bg-gray-100">
      <Wrapper>
        <div className="max-w-[600px] w-full rounded-lg p-6 md:p-8 bg-white shadow-lg mx-auto flex flex-col items-center">
          <div className="text-3xl font-bold text-gray-800 text-center">
            Thanks for shopping with us!
          </div>
          <div className="text-lg font-semibold text-gray-700 text-center mt-4">
            Your order has been placed successfully.
          </div>
          <div className="text-base text-gray-600 text-center mt-6">
            For any product-related query, drop an email to:
          </div>
          <div className="underline text-blue-600 mt-2 text-center">
            shoeshopcontact@shop.com
          </div>

          {/* Continue Shopping Button */}
          <Link href="/">
            <button className="w-full max-w-[280px] text-lg bg-black text-white rounded-full p-3 mt-8 font-medium transition-transform active:scale-95 hover:opacity-90">
              Continue Shopping
            </button>
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default Success;
