import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { notFound } from "next/navigation";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

type Props = {
  params: Promise<{ slug: string }>;
};

type Market = { market: string; division: string; min: number; max: number };

const UNIT_BN: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    liter: "লিটার",
    ml: "মিলিলিটার",
    piece: "পিস",
    dozen: "ডজন",
    packet: "প্যাকেট",
    bottle: "বোতল",
    pound: "পাউন্ড",
    maund: "মণ",
};


const fmt = (n: number) =>
    n.toLocaleString("bn-BD", {
        minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
        maximumFractionDigits: 2,
    });

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    //const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products?slug=${slug}`) //option 1
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?slug=${slug}`)
    
    
    if (!res.ok) {
        notFound();
    }
    const data=await res.json();
    const product = Array.isArray(data) ? data[0] : data;
    if (!product) {
        notFound();
    }


    const unitBn = UNIT_BN[product.unit] ?? product.unit;
    const markets: Market[] = product.markets ?? [];
    const rows = markets
        .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
        .sort((a, b) => a.avg - b.avg);

    const hasMarkets = rows.length > 0;
    const lowest = hasMarkets ? Math.min(...rows.map((r) => r.min)) : 0;
    const highest = hasMarkets ? Math.max(...rows.map((r) => r.max)) : 0;
    const average = hasMarkets
        ? Math.round(rows.reduce((sum, r) => sum + r.avg, 0) / rows.length)
        : 0;

    const summary = [
        { label: "সর্বনিম্ন দাম", value: lowest, color: "text-green-600", note: "সবচেয়ে কম দামের বাজার" },
        { label: "সর্বাধিক দাম", value: highest, color: "text-red-600", note: "সবচেয়ে বেশি দামের বাজার" },
        { label: "গড় দাম", value: average, color: "text-green-600", note: `প্রতি ${unitBn}-এর হিসাব` },
    ];

    return (
        <div className=" bg-[#F0F5F0] px-3 sm:px-0">
            <div className="mx-auto w-full max-w-6xl px-4 pt-10">
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
            <div className="bg-white min-h-32 mx-auto w-full max-w-6xl px-4 my-5 rounded-3xl flex items-center border border-gray-200">
                
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
                                    <span className="font-bold pr-1">{" "}{product.change.dir === "up" ? "বেড়েছে" : product.change.dir === "down" ? "কমেছে" : "অপরিবর্তিত"}{" "} · {" "}{Math.abs(product.today - product.yesterday).toLocaleString("bn-BD")} টাকা</span>
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

            
            <div className="bg-white mx-auto w-full max-w-6xl px-4 my-5 rounded-3xl border border-gray-200 p-4 sm:p-6">
                <h2 className="font-semibold text-base sm:text-lg">দামের সারসংক্ষেপ</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4">
                    {summary.map((s) => (
                        <div key={s.label} className="rounded-xl border border-gray-200 p-4">
                            <div className="text-xs text-gray-500">{s.label}</div>
                            <div className={`mt-1 ${s.color}`}>
                                <span className="text-2xl font-bold">
                                    {hasMarkets ? s.value.toLocaleString("bn-BD") : "–"}
                                </span>{" "}
                                <span className="text-sm font-semibold">টাকা</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{s.note}</div>
                        </div>
                    ))}
                </div>

                <h2 className="font-semibold text-base sm:text-lg mt-8 mb-4">বাজারভিত্তিক আজকের দাম</h2>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="table table-zebra min-w-140 text-xs sm:text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 border-gray-300">
                                <th className="font-normal">বাজার</th>
                                <th className="font-normal">বিভাগ</th>
                                <th className="font-normal text-right">সর্বনিম্ন</th>
                                <th className="font-normal text-right">সর্বাধিক</th>
                                <th className="font-normal text-right">গড়</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((r) => (
                                <tr key={`${r.market}-${r.division}`} className="border-gray-300">
                                    <td className="font-semibold">{r.market}</td>
                                    <td>{r.division}</td>
                                    <td className="text-right whitespace-nowrap">{fmt(r.min)} টাকা</td>
                                    <td className="text-right whitespace-nowrap">{fmt(r.max)} টাকা</td>
                                    <td className="text-right whitespace-nowrap font-bold">{fmt(r.avg)} টাকা</td>
                                </tr>
                            ))}
                            {!hasMarkets && (
                                <tr>
                                    <td colSpan={5} className="text-center text-gray-500 py-6">
                                        বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        
        </div>
        );
}