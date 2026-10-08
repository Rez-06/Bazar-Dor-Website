"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navbar = ({data}:{ data: { id: string,
    slug: string,
    nameBn: string,
    icon: string }[] }) => {
    const pathName=usePathname();
    
    return (
        <div className='pt-3'>
            <hr className="w-full h-0.5 border-white bg-gray-100" />
            <div className="container mx-auto grid grid-cols-4 gap-4 pl-4 py-2 sm:flex sm:gap-8">
                {data.map((n) => {
                    const href = `/category/${n.slug}`;
                    const isActive = pathName.replace(/\/$/, "") === href;
                    return(
                    <Link
                        key={n.slug}
                        href={href}
                        
                        className={`flex items-center hover:text-red-700 text-xs font-semibold ${isActive?"text-white  bg-green-600 p-2 rounded-lg":"text-black p-2"}`}
                        
                    >
                        {n.icon} {n.nameBn}
                        
                    </Link>)
            })}
           </div>
           <hr className="w-full h-0.5 border-white bg-gray-100" />
        </div>
    );
};

export default Navbar;