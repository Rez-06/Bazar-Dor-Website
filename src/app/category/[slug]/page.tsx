import Card from "@/app/components/Card";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
// import { useState } from "react";
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const res=await fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`)
  const data=await res.json()
  const res2=await fetch(`https://api.api-store.workers.dev/api/bazardor/categories/${slug}`)
  const data2=await res2.json()
  // const [selected,setSelected] = useState("ডিফল্ট ");
  
  return (
    <>
    <div className="bg-[#F0F5F0]">
      <div className="bg-white container mx-auto my-5 rounded-3xl flex items-center border border-gray-200">
        <div className="text-8xl py-5 pl-5">{data2.icon}</div>
        <div>
          <div className="text-4xl font-semibold">{data2.nameBn}</div>
          <div>{data.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন</div>
        </div>

        
      </div>

      <div className="bg-white container mx-auto my-5 rounded-3xl flex justify-end items-center border gap-5 border-gray-200 mt-8 p-5">
        <div>সাজান</div>
        <div>
            <details className="dropdown">
              <summary className="btn m-1">ডিফল্ট 
              <FontAwesomeIcon className="h-5" icon={faAngleDown} style={{ color: "rgb(0,0,0)" }}/>
              
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
              </ul>
          </details>
        </div>

        
      </div>
      
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center justify-center">
          {data.map((n) => (
            
            <Card key={n.id} props={n} />
          ))}
      </div>

    </div>
    
    </>
  );
}