import Card from "@/app/components/Card";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { notFound } from "next/navigation";
import SortDropdown from "@/app/components/SortDropdown";
// import { useState } from "react";
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const res=await fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`)
  if (!res.ok) {
    notFound();
  }
  const data=await res.json()
  const res2=await fetch(`https://api.api-store.workers.dev/api/bazardor/categories/${slug}`)
  if (!res2.ok) {
    notFound();
  }
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

      <SortDropdown data={data} />
      
      {/* <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center justify-center">
          {data.map((n) => (
            
            <Card key={n.id} props={n} />
          ))}
      </div> */}

    </div>
    
    </>
  );
}