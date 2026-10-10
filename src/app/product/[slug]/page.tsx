import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { notFound } from "next/navigation";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    //const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products?slug=${slug}`) //option 1
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?slug=${slug}`)
    
    
    if (!res.ok) {
        notFound();
    }
    const data=await res.json();
    const product = Array.isArray(data) ? data[0] : data;
    console.log("here",data)   
    return (
        <div className=" bg-[#F0F5F0]">
            <div className="container mx-auto pt-10">
                <div className="flex gap-2">
                    <div><Link href="/" className="font-bold">হোম</Link></div>
                    <div>
                        <FontAwesomeIcon
                        className="h-5"
                        icon={faAngleRight}
                        style={{ color: "rgba(0, 0, 0, 1.00)" }}
                        />
                    </div>
                    <div>
                        <Link href={`/category/${product.category}`} className="font-bold">{product.categoryNameBn}</Link>
                    </div>
                    <div>
                        <FontAwesomeIcon
                        className="h-5"
                        icon={faAngleRight}
                        style={{ color: "rgba(0, 0, 0, 1.00)" }}
                        />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-400">{product.nameBn}</h2>
                    </div>
                </div>
            </div>
            <div className="bg-white min-h-32 container mx-auto my-5 rounded-3xl flex items-center border border-gray-200">
                
                <div className="flex flex-col min-[480px]:flex-row justify-between w-full">
                    <div className="flex py-5">
                        <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gray-100 mx-5">
                            <div className="text-5xl">{product.image}</div>
                        </div>
                        <div>
                            <div className="text-2xl sm:text-3xl font-semibold">{product.nameBn}</div>
                            <div className="text-sm sm:text-base  font-light">প্রতি {product.unit === "kg" ? "কেজি" :
                                    product.unit === "gram" ? "গ্রাম" :
                                    product.unit === "liter" ? "লিটার" :
                                    product.unit === "ml" ? "মিলিলিটার" :
                                    product.unit === "piece" ? "পিস" :
                                    product.unit === "dozen" ? "ডজন" :
                                    product.unit === "packet" ? "প্যাকেট" :
                                    product.unit === "bottle" ? "বোতল" :
                                    product.unit === "pound" ? "পাউন্ড" :
                                    product.unit === "maund" ? "মণ" :
                                    product.unit
                                    } · {product.categoryNameBn}</div>
                            <div className="text-xs sm:text-sm font-semibold flex">
                                <div className="pr-1">গতকালের তুলনায় আজ দাম
                                    <span className="font-bold pr-1">{" "}{product.change.dir==="up"?"বেড়েছে":"কমেছে"}{" "} · {" "}{product.change.pct.toLocaleString("bn-BD")} টাকা</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-5 flex justify-center">
                        <div className="flex flex-col min-[480px]:h-20 min-[480px]:w-20 h-20 w-40 items-center justify-center rounded-xl bg-gray-100 mx-5">
                            <div className="text-[10px]">আজকের দাম</div>
                            <div className="text-base font-bold">{product.today.toLocaleString("bn-BD")}</div>
                            <div className="text-[10px]">টাকা / {product.unit === "kg" ? "কেজি" :
                                    product.unit === "gram" ? "গ্রাম" :
                                    product.unit === "liter" ? "লিটার" :
                                    product.unit === "ml" ? "মিলিলিটার" :
                                    product.unit === "piece" ? "পিস" :
                                    product.unit === "dozen" ? "ডজন" :
                                    product.unit === "packet" ? "প্যাকেট" :
                                    product.unit === "bottle" ? "বোতল" :
                                    product.unit === "pound" ? "পাউন্ড" :
                                    product.unit === "maund" ? "মণ" :
                                    product.unit
                                    } </div>
                            <div className={`flex text-xs gap-1 items-center ${
                                product.change.pct > 0
                                    ? "text-red-500"
                                    : product.change.pct < 0
                                    ? "text-green-500"
                                    : "text-gray-500"
                            }`}>
                                <div>
                                    {product.change.pct > 0 ? (
                                        <FontAwesomeIcon className="h-4" icon={faCaretUp} />
                                    ) : product.change.pct < 0 ? (
                                        <FontAwesomeIcon className="h-4" icon={faCaretDown} />
                                    ) : (
                                        "–"
                                    )}
                                </div>

                                <div>
                                    {Math.abs(product.change.pct).toLocaleString("bn-BD", {
                                        minimumFractionDigits: 1,
                                        maximumFractionDigits: 1,
                                    })}%
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>    
                

                        
                    
                    
                
            </div>

            <div>
                Hello
            </div>
        
        </div>
        );
}