import Image from 'next/image';
import Navbar from './Navbar';
import Marquee from './Marquee';
import Link from 'next/link';
import AuthButtons from './AuthButtons';
import TodayDate from './TodayDate';
import React, { Suspense } from 'react';
// const res = await fetch(
//     "https://api.api-store.workers.dev/api/bazardor/categories"
// ); //option 1
const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories"
); 
const data = await res.json();
const Header = () => {
    //  const date = new Date().toLocaleDateString("bn-BD", {
    //     dateStyle: "full",
    // });

    return (<>
            <div>
                <div className='mx-auto w-full max-w-6xl px-4 pt-3 flex justify-between'>
                    <Link className='flex' href="/">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#05893E]">
                            <Image src={"/logo-icon.png"} alt={"Logo"} width={24} height={24} className='object-contain'/>
                        </div>
                        <div>
                            <h2 className='text-xl px-3 font-bold leading-tight'>বাজার দর</h2>
                            <h2 className='text-sm px-3 leading-tight'><TodayDate /></h2>
                        </div>
                    </Link>
                    <div className='flex items-center'>
                        <AuthButtons />
                    </div>
                </div>
            </div>
            
            <Suspense
                fallback={
                    <div className='pt-3'>
                        <hr className="w-full h-0.5 border-white bg-gray-100" />
                        <div className="mx-auto w-full max-w-6xl px-4 grid grid-cols-4 gap-4 py-2 sm:flex sm:gap-8">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="skeleton h-8 w-full sm:w-20"></div>
                            ))}
                        </div>
                        <hr className="w-full h-0.5 border-white bg-gray-100" />
                    </div>
                }
            >
                <Navbar data={data} />
            </Suspense>
            <Marquee/>
        </>
    );
};

export default Header;