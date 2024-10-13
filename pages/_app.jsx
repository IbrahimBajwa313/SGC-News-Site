import Footer2 from '@/components/Footer2'
import Header from '@/components/Header'
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import "@/styles/globals.css";
import Head from "next/head";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  oneMinusQty,
} from "react";
import Headroom from "react-headroom"; 

export const productInfo = createContext();

// using Context api to use functions in other files
export function MyContext() {
  return useContext(productInfo);
}

// App Function
export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});

  // Page will remain same after reload
  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, []);

  const [subTotal, setSubTotal] = useState(0);

  return (
    <>
      <Link
        href="https://wa.me/923074583567" // Replace with the actual WhatsApp number
        className="fixed bottom-4 right-1 rounded-full bg-white/[0.25] text-green-500 duration-200 hover:scale-110 cursor-pointer"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={50} />
      </Link>

      <Head />
      <Headroom>
        <Header />
    </Headroom>

     
        <Component />
  
    <Footer2 />
    
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
    </>
  );
}
