import React from 'react';

const Footer = () => {
    return (
        <div>
            <div className='bg-[#F0F5F0] h-10'></div>
            
            <hr />
            <div className='flex justify-between container mx-auto py-5 font-medium md:text-lg text-xs'>
                <div>
                    <h2>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</h2>
                </div>
                <div className='min-w-15'></div>
                <div>
                    <h2 className='text-right'>
                        সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                    </h2>
                </div>
            </div>
            
        </div>
    );
};

export default Footer;