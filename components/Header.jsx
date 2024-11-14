// import React, { useEffect, useState } from 'react';
// import { CiSearch } from "react-icons/ci";
// import Wrapper from './Wrapper';
// import Menu from './Menu';
// import MenuMobile from './MenuMobile';
// import Link from 'next/link';
// import { BiMenu } from 'react-icons/bi';
// import { BsCart3 } from 'react-icons/bs';
// import { IoMdHeart } from 'react-icons/io';
// import { VscChromeClose } from 'react-icons/vsc';  
// import Image from 'next/image';
// import { useRouter } from 'next/router';
// import { motion } from 'framer-motion';
// import { RxCross1 } from "react-icons/rx";
 

// const Header =   (cart) => {

 

//   const [Number, setNumber] = useState(0);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [search, setsearch] = useState('Search...');
//   const [showsearch, setshowsearch] = useState(false);
//   const [repetation, setrepetation] = useState(0);
 
   

//   useEffect(() => {
//     if (typeof localStorage !== 'undefined' && localStorage.getItem('cart')) {
//       setNumber(Object.keys(JSON.parse(localStorage.getItem('cart'))).length);
//     }
//   }, [cart]);
  
 

//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [showCatMenu, setShowCatMenu] = useState(false);
//   const [showSortMenu, setShowSortMenu] = useState(false);
//   const [suggestions, setSuggestions] = useState(undefined);

//   const router = useRouter(); // Use the useRouter hook to get the router object


//   const handleSearch = async (query) => {
//     // logic to handle search 
//     // console.log('Search query:', query);
 
      
//       window.location.replace(`/category/${query}?query=${query}`);
//       // setSearchQuery('')
//   };
//   const searchSuggestion = async (query) => {
//     // logic to handle search 
//     // console.log('Search query:', query);
//     const response = await fetch('/api/getProducts');
//     const result = await response.json();

//     // Filter products based on the search query
//     const filteredResults = result.products.filter((product) =>{
//         console.log(query)
//         if(query!='')
//         {console.log('very tur')
//           return product.title.toLowerCase().includes(query?.toLowerCase())}
//       }
//     );
//     setSuggestions(filteredResults)
      
//       // setSearchQuery('')
//   };

//     const [isClient, setIsClient] = useState(false)
   
//     useEffect(() => {
//       setIsClient(true)
//     }, [])
   

//   return (

//     <div  className='bg-white w-screen '> 
// { (isClient&&showsearch)&&   <motion.div initial={{y:-30}} animate={{y:0}} transition={{duration:.3}} className=' pt-3 pb-3 justify-between right-3  items-center gap-4 text-black'>
//             <form   onSubmit={(e) => 
// {              e.preventDefault();
//               handleSearch(searchQuery)
              
//             }
//               } className='flex justify-center   items-center'>
            
//             <input
//                 type='text'
//                 placeholder={search}
//                 value={searchQuery}
//                 onChange={(e) => {setSearchQuery(e.target.value)
//                 searchSuggestion(e.target.value)       
//                 if(e.target.value==''){
//                   console.log(true)
// setSuggestions(undefined)
//                 }         
//                 }}
//                 className='border ml-2 sm:w-4/12 w-6/12 relative border-gray-600 rounded-lg p-1 outline-none'
//               />
//              {suggestions&&<div className='bg-white max-h-60 overflow-y-auto z-40 top-12 absolute rounded-lg text-black shadow-xl'>
              
//               {suggestions?.map((keys)=>{
              
//                 return(
//                   <>
//                <div onClick={()=>{window.location.replace(`/product/${keys._id}`);}} className='px-3 cursor-pointer flex justify-between mb-2 hover:border hover:border-b-black '>
//                     <div>{keys.title}</div><img className='w-20' src={`/productIamages/${keys.img}/thumbnail.jpg`} alt="" /> </div>
//                   </>
//                 )
//               })}</div>}
//               <input type='submit'
                
//                 className='bg-black ml-1 sm:w-2/12 w-3/12  rounded-lg text-white  px-3 py-1'
              
//               />

//             <RxCross1 onClick={()=>{setshowsearch(false); setSearchQuery(''); setSuggestions(undefined)} }  className='ml-6  text-xl'/>
//             </form>

//           </motion.div>}

//   {(isClient&&!showsearch)&&  
//       <motion.wrapper initial={{y:-30}} animate={{y:0}} transition={{duration:.3}} className='flex pt-3 pb-1 items-center justify-between mx-6'>

//         {/* Logo of the Store */}
//         <Link className='flex justify-center items-center' href={"/"}>
//           <Image
//             src="/save-gaza-logo.png"
//             alt="Logo"
//             width={90}
//             height={90}
//             className='w-[80px] md:w-[90px]  mt-2 border border-transparent rounded-md transition-transform duration-300 hover:scale-110 px-4 py-2'
//           />
//           <div className='font-bold text-2xl'>Save Gaza Campiagn</div>
//         </Link>



//         {/* Navbar Menu items, category sub-menu */}
//         <Menu
//           showCatMenu={showCatMenu}
//           setShowCatMenu={setShowCatMenu}
//           showSortMenu={showSortMenu}
//           setShowSortMenu={setShowSortMenu}
//         />

//         {mobileMenu && (
//           <MenuMobile
//             setShowCatMenu={setShowCatMenu}
//             setMobileMenu={setMobileMenu}
//             showCatMenu={showCatMenu}
//             showSortMenu={showSortMenu}
//           setShowSortMenu={setShowSortMenu}
            
//           />
//         )}
        
       
        


//         {/* Mobile Menu Icon */}
//         <div className='flex items-center gap-6 text-black'>
//           {mobileMenu ? (
//             <VscChromeClose
//               className='me-8 relative text-[22px] left-12 lg:hidden md:text-[28px]'
//               onClick={() => setMobileMenu(false)}
//             />
//           ) : (
//            <div className='flex mr-10  lg:mr-0'>
//             <BiMenu
//               className={`${setsearch}?hidden relative left-12 text-[22px] lg:hidden md:text-[28px]`}
//               onClick={() => setMobileMenu(true)}
//             /><CiSearch  onClick={()=>{
//               setshowsearch(true)
//             }}  className='relative ml-5 left-12 text-[22px] lg:hidden md:text-[28px]'/></div>
//           )}


//           {/* Other items, placed at the right */}

//           {/* Search Interface */}
//           <div className=' border lg:flex hidden  items-center gap-4 text-black'>
//             <form   onSubmit={(e) => 
// {              e.preventDefault();
//               handleSearch(searchQuery)
//             }
//               } className='flex items-center'>
            
//             <input
//                 type='search'
//                 placeholder={search}
//                 // onClick={()=>{
//                 //   setsearch('')   
//                 // }}
//                 // onDragExit={()=>{ setsearch('Search..')  }}
//                 value={searchQuery}
//                 onChange={(e) => {
//                   setSearchQuery(e.target.value)
//                 searchSuggestion(e.target.value)
//                 if(e.target.value==''){
//                   console.log(true)
// setSuggestions(undefined)
//                 }
//                 }}
//                 className=' px-2 relative border border-gray-600 rounded-lg p-1 outline-none'
//               />
//                {suggestions&&<div className='bg-white max-h-72 overflow-y-auto z-40 top-16 absolute  text-black shadow-xl'>{suggestions?.map((keys)=>{
//               // 
//                 return(
//                   <>
//                   <div onClick={()=>{window.location.replace(`/product/${keys._id}`);}} className='px-3 cursor-pointer flex justify-between mb-2 '>
//                     <div className='text-gray-500 hover:text-black'>{keys.title}</div><img className='w-20' src={`/productIamages/${keys.img}/thumbnail.jpg`} alt="" /> </div>
//                   </>
//                 )
//               })}</div>}
//               <input type='submit'
                
//                 className='bg-black  text-white rounded-lg px-3 ml-1 py-1 '
              
//                 placeholder='Search'
//               />
//             </form>
//           </div>
      

         
//           {/* Heart Icon */}
         
//         </div>
//       </motion.wrapper>}
      
//     </div>
//   );
// };

// export default Header;

import { useState } from 'react';
import Link from 'next/link';
import ListItem from './listItem';

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isIconClicked, setIsIconClicked] = useState(false);
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const [isIconClicked2, setIsIconClicked2] = useState(false);
    const [isToggled, setIsToggled] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        setIsIconClicked(!isIconClicked);
        setIsDropdownOpen2(false);
        setIsIconClicked2(false);
    };
    const toggleDropdown2 = () => {
        setIsDropdownOpen2(!isDropdownOpen2);
        setIsIconClicked2(!isIconClicked2);
        setIsDropdownOpen(false);
        setIsIconClicked(false);
    };

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    const items1 = ['Option 1', 'Option 2', 'Option 3'];
    const items2 = ['Latest', 'Modern', 'Contemporary'];
    const list1 = items1.map((item, index, url) => {
        return <ListItem key={index} itemName={item} url={url} />;
    });
    const list2 = items2.map((item, index, url) => {
        return <ListItem key={index} itemName={item} url={url} />;
    });

    return (
        <header className={bg-[#111] text-white flex flex-col px-6 py-6 shadow-2xl z-50 transition-all duration-900 ease-in-out ${isDropdownOpen || isDropdownOpen2 ? 'max-h-[1000px]' : 'max-h-[90px]'}}>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold flex items-center">
                        <span
                            className={mr-2 cursor-pointer hidden md:flex ${isIconClicked ? 'text-green-500' : 'text-white'} hover:text-green-500 transition-colors duration-300}
                            onClick={toggleDropdown}
                        >
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect x="3" y="5" width="18" height="2" fill="currentColor" />
                                <rect x="3" y="11" width="14" height="2" fill="currentColor" />
                                <rect x="3" y="17" width="10" height="2" fill="currentColor" />
                            </svg>
                        </span>
                        <span className='ml-4'>Save Gaza Campaign</span>
                    </div>
                </div>

                <nav className="flex items-center space-x-8">
                    {/* Navigation Links */}
                    <span className='hidden md:flex items-center space-x-8'>
                        <Link href="#"><span className="hover:text-green-500 cursor-pointer transition-colors duration-300">Latest</span></Link>
                        <Link href="#"><span className="hover:text-green-500 cursor-pointer transition-colors duration-300">Modern</span></Link>
                        <Link href="#"><span className="hover:text-green-500 cursor-pointer transition-colors duration-300">Contemporary</span></Link>
                        <Link href="#"><span className="hover:text-green-500 cursor-pointer transition-colors duration-300">Affordable</span></Link>
                    </span>

                    {/* Login Button */}
                    <button className="hidden md:flex bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
                        Login
                    </button>
                    <span
                        className={mr-2 cursor-pointer flex md:hidden ${isIconClicked2 ? 'text-green-500' : 'text-white'} hover:text-green-500 transition-colors duration-300}
                        onClick={toggleDropdown2}
                    >
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect x="3" y="5" width="18" height="2" fill="currentColor" />
                            <rect x="7" y="11" width="14" height="2" fill="currentColor" />
                            <rect x="11" y="17" width="10" height="2" fill="currentColor" />
                        </svg>
                    </span>
                </nav>
            </div>

            <div className={transition-all duration-300 ease-in-out ${isDropdownOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}}>
                <div className="mt-4 bg-[#222] p-4 rounded-xl">
                    <p className='text-xl mb-2'>Services</p>
                    {list1}
                </div>
            </div>
            <div className={transition-all duration-300 ease-in-out ${isDropdownOpen2 ? 'max-h-70 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}}>
                <div className="mt-4 bg-[#222] p-4 rounded-xl">
                    <p className='text-xl mb-2'>Check</p>
                    {list2}
                    <div onClick={handleToggle} className='flex items-center cursor-pointer'>
                        <p className='text-xl mt-2 mb-2'>Services</p>
                        <svg
                            className={ml-2 transition-transform duration-300 ${isToggled ? 'rotate-180' : 'rotate-0'}}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    {isToggled && list1}
                </div>
            </div>
        </header>
    );
}