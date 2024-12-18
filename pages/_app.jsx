import Footer2 from '@/components/Footer2'
import Header from '@/components/Header'
import { FaWhatsapp } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
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
import { useRouter } from "next/router";
import Headroom from "react-headroom";
import { UserProvider, useUser } from '../context/UserContext';
import Loader from '../components/loader.jsx';

import { motion, AnimatePresence } from 'framer-motion';

export const productInfo = createContext();

// using Context api to use functions in other files
export function MyContext() {
  return useContext(productInfo);
}

// App Function
export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [adminPage, setAdminPage] = useState(false);

  const [links, setLinks] = useState(false);
  const router = useRouter();


  const [subTotal, setSubTotal] = useState(0);

  const menuLinks = [
    { href: '/admin/categories', label: 'Categories' },
    { href: '/admin/posts', label: 'Posts' },
    { href: '/admin/users', label: 'Users' },
  ];


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

    const checkUserAndRedirect = () => {
      const storedUserData = localStorage.getItem("loggedInUser");

      if (router.pathname.startsWith('/admin') && !storedUserData) {
        // Redirect to the login page if not logged in
        router.push('/login');
        return; // Ensure no further code execution
      }

      // Once checks are done and no redirect is needed, set the loading state to false
      setLoading(false);
    };

    // Initialize loading state to true
    setLoading(true);

    checkUserAndRedirect();

    if (router.pathname.startsWith('/admin') && !router.pathname.includes('addUser') && !router.pathname.includes('addPost') && !router.pathname.includes('addCategory') && !router.pathname.includes('editPost') && !router.pathname.includes('deletePost') && !router.pathname.includes('editUser') && !router.pathname.includes('editCategory')) {
      setAdminPage(true)
    } else {
      setAdminPage(false)
    }

  }, [router]);

  if (loading) {
    return <Loader /> // Show loading while checks are happening
  }



  return (
    <UserProvider >
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

        {adminPage && (
          
          // <div className="menu w-1/4 mx-28 mt-8 flex items-center gap-7" onClick={() => setLinks((prev) => !prev)}>
          //   <div className="logo bg-slate-600 py-3 px-5 flex items-center justify-center rounded-full cursor-pointer hover:bg-slate-700">
          //     <i class="fas fa-bars text-2xl text-white"></i>
          //   </div>

          //   <AnimatePresence>
          //     {links && (
          //       <motion.div
          //         key="links"
          //         className="links flex justify-center items-center gap-5 py-2 px-4 rounded-lg bg-slate-700"
          //         initial={{ x: '-20%' }}
          //         animate={{ x: '0%' }}
          //         exit={{ x: '-20%' }}
          //         transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          //       >
          //         {menuLinks
          //           .filter((link) => link.href !== router.pathname) // Filter out the current page
          //           .map((link) => (
          //             <Link
          //               key={link.href}
          //               href={link.href}
          //               className="text-white cursor-pointer hover:text-gray-300"
          //             >
          //               {link.label}
          //             </Link>
          //           ))}
          //       </motion.div>
          //     )}
          //   </AnimatePresence>
          // </div>
          <div className="menu w-full mx-auto mt-3 flex justify-center items-center gap-5">
{menuLinks
                    // .filter((link) => link.href !== router.pathname) // Filter out the current page
                    .map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`font-semibold text-xl cursor-pointer hover:text-gray-500 ${
                          router.pathname === link.href ? 'text-blue-500 font-bold' : ''
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
          </div>
        )}
        <Component />
        {/* Sidebar */}

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



    </UserProvider>
  );
}
