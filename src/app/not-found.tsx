import React from 'react';
import Link from 'next/link';
const NotFound = () => {
    return (
        <>
            <div className='flex items-center justify-center gap-6 text-2xl sm:text-4xl md:text-6xl mt-45 text-red-800'>
                <div>৪০৪</div> 
                <div className="h-24 w-px bg-black"></div>
                <div>পেজটি পাওয়া যায়নি</div>
            </div>
            <div className='items-center flex justify-center py-15'>
                <Link href="/"><button className="btn btn-wide items-center bg-red-800 text-white">হোমপেজে ফেরত যান</button></Link>
                
            </div>
        </>
        
    );
};

export default NotFound;