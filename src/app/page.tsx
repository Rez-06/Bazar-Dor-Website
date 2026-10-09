import Image from "next/image";
import Link from "next/link";
import Card from "./components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

type Product = {
  id: number;
  slug: string;
  image: string;
  nameBn: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};
export default async function Home() {

  const res= await fetch("https://api.api-store.workers.dev/api/bazardor/products")
  const data: Product[]=await res.json();
  

  const topIncreases = data
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const topDecreases = data
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);
  console.log("here",topDecreases)
  const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });
  return (
    <>
      <div className=" bg-[#F0F5F0]">
        <div className="flex flex-col md:flex-row justify-between container mx-auto bg-white mt-5 rounded-2xl border border-gray-200">
          <div className="text-center md:text-left ml-10">
            <div className="bg-[#05893E]/10 w-fit mx-auto md:mx-0 flex justify-center h-6 rounded-2xl text-[#05893E] mt-5 px-3">
              {date}
            </div>

            <div className="text-3xl mt-3 font-bold">
              আজকের বাজারের দাম এক নজরে
            </div>

            <div className="max-w-130 text-sm pt-5 mx-auto md:mx-0 px-4 md:px-0">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </div>

            <div>
              <Link href="#allProducts">
                <button className="btn bg-green-700 mt-3 mb-8 md:mb-15 text-white">
                  সব পণ্য দেখুন
                </button>
              </Link>
              
            </div>
          </div>

          <div className="flex justify-center">
            <Image src="/bazar-hero.png" alt="food" width={300} height={300} />
          </div>
        </div>
        <div className="flex container mx-auto px-3 pt-10">
          <div className="mr-2"><FontAwesomeIcon className="h-5" icon={faCaretUp} style={{ color: "rgba(240, 0, 0, 1.00)" }}/></div>
          <div className="font-semibold text-lg">আজ দাম বেড়েছে</div>
          
        </div>
        <div className="mt-3">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center justify-center">
              {topIncreases.map((n) => (
                
                <Card key={n.id} props={n} />
              ))}
          </div>
        </div>
        <div className="flex container mx-auto px-3 pt-10">
          <div className="mr-2"><FontAwesomeIcon className="h-5" icon={faCaretDown} style={{ color: "rgba(0, 240, 0, 1.00)" }}/></div>
          <div className="font-semibold text-lg">আজ দাম কমেছে</div>
          
        </div>
        <div className="mt-3">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center justify-center">
              {topDecreases.map((n) => (
                
                <Card key={n.id} props={n} />
              ))}
          </div>
        </div>

        <div className="flex flex-col container mx-auto px-3 pt-10" id="allProducts">
          <div className="font-semibold text-lg">সব পণ্য</div>
          <div className="text-sm text-gray-500">মোট {data.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</div>
          
        </div>
        <div className="mt-3">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center justify-center">
              {data.map((n) => (
                
                <Card key={n.id} props={n} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
