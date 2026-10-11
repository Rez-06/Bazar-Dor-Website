import React from "react";
import MarqueeText from "react-marquee-text";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

type Product = {
  slug: string;
  image: string;
  nameBn: string;
  today: number;
  unit: string;
  change: { dir: "up" | "down" | "flat"; pct: number };
};

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

const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
const data: Product[] = await res.json();

const fmtPct = (n: number) =>
  Math.abs(n).toLocaleString("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

const Marquee = () => {
  return (
    <div>
      <MarqueeText duration={10}>
        {data.map((n) => {
          const dir = n.change.dir;
          return (
            <Link key={n.slug} href={`/product/${n.slug}`}>
              <div className="flex items-center px-5 py-3 border-r border-b border-gray-200 hover:bg-gray-200">
                <div className="flex pr-3">
                  {n.image} <h2 className="font-semibold pl-2">{n.nameBn}</h2>
                </div>
                {n.today.toLocaleString("bn-BD")} টাকা/{UNIT_BN[n.unit] ?? n.unit}
                <div className="flex pl-2 items-center">
                  {dir === "up" && (
                    <>
                      <FontAwesomeIcon
                        className="h-5"
                        icon={faCaretUp}
                        style={{ color: "rgba(240, 0, 0, 1.00)" }}
                      />
                      <h2 className="text-red-600 pl-1">{fmtPct(n.change.pct)}%</h2>
                    </>
                  )}
                  {dir === "down" && (
                    <>
                      <FontAwesomeIcon
                        className="h-5"
                        icon={faCaretDown}
                        style={{ color: "rgb(0, 240, 74)" }}
                      />
                      <h2 className="text-green-500 pl-1">{fmtPct(n.change.pct)}%</h2>
                    </>
                  )}
                  {dir === "flat" && (
                    <h2 className="text-gray-500 pl-1">— {fmtPct(n.change.pct)}%</h2>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;