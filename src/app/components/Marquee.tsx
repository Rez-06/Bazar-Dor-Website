import React from 'react';
import MarqueeText from "react-marquee-text"
import Link from 'next/link';
const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products")
const data= await res.json();
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Marquee = () => {
    return (
        <div>
            <MarqueeText>
                {data.map((n) => {
                    const up=(n.change.dir==="up")
                    return(
                    <Link
                        key={n.slug}
                        href={`/category/${n.slug}`}
                                                                    
                    >
                        <div className='flex items-center px-5 py-3 border-r border-b border-gray-200'>
                            <div className='flex pr-3'>
                                {n.image} <h2 className='font-semibold pl-2'>{n.nameBn}</h2>
                            </div>
                            {n.today} টাকা/{n.unit}
                            <div className='flex pl-2 items-center'>
                                {up?<>
                                <FontAwesomeIcon className="h-5" icon={faCaretUp} style={{ color: "rgba(240, 0, 0, 1.00)" }}/>
                                <h2 className='text-red-600 pl-1'>{n.change.pct}%</h2>
                                </>:<>                           
                                <FontAwesomeIcon className="h-5" icon={faCaretDown} style={{ color: "rgb(0, 240, 74)" }}/>
                                <h2 className='text-green-500 pl-1'>{Math.abs(n.change.pct)}%</h2>
                                </>}
                            </div> 
                            
                        </div>
                        
                        
                    </Link>)
            })}
            </MarqueeText>
        </div>
    );
};

export default Marquee;