import React from 'react';
import Image from 'next/image';
import Navbar from './Navbar';
import Marquee from './Marquee';
import Link from 'next/link';

const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories"
);
const data = await res.json();
const Header = () => {
     const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (<>
            <div>
                <div className='container mx-auto pt-3 flex justify-between'>
                    <Link className='flex' href="/">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#05893E]">
                            <Image src={"/logo-icon.png"} alt={"Logo"} width={24} height={24} className='object-contain'/>
                        </div>
                        <div>
                            <h2 className='text-xl px-3 font-bold leading-tight'>বাজার দর</h2>
                            <h2 className='text-sm px-3 leading-tight'>{date}</h2>
                        </div>
                    </Link>
                    <div>
                        Sign-up
                    </div>
                </div>
            </div>
            
            <Navbar data={data} />
            <Marquee/>
        </>
    );
};

export default Header;