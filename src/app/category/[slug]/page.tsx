import Link from "next/link";
import { notFound } from "next/navigation";
import SortDropdown from "../../components/SortDropdown";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [res, res2] = await Promise.all([
    fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`),
    fetch(`https://openapi.programming-hero.com/api/bazardor/categories/${slug}`),
  ]);

  if (!res2.ok) notFound();
  const category = await res2.json();
  if (!category || !category.nameBn) notFound();

  const raw = res.ok ? await res.json() : [];
  const data = Array.isArray(raw) ? raw : [];

  return (
    <div className="bg-[#F0F5F0]">
      <div className="bg-white mx-auto w-full max-w-6xl px-4 my-5 rounded-3xl flex items-center border border-gray-200">
        <div className="text-6xl sm:text-8xl py-5 pl-5">{category.icon}</div>
        <div className="pl-3">
          <div className="text-3xl sm:text-4xl font-semibold">{category.nameBn}</div>
          <div>{data.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন</div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="mx-auto w-full max-w-6xl px-4 py-16 text-center">
          <div className="text-5xl sm:text-6xl font-bold text-red-800">৪০৪</div>
          <p className="mt-4 text-lg sm:text-xl">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি</p>
          <Link href="/" className="btn mt-6 bg-red-800 text-white border-none">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <SortDropdown data={data} />
      )}
    </div>
  );
}