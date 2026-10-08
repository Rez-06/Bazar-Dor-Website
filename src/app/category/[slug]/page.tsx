type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const res=await fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${slug}`)
  const data=await res.json()
  const res2=await fetch(`https://api.abcz.workers.dev/api/bazardor/categories/${slug}`)
  const data2=await res2.json()
  return (
    <>
    <div className="bg-[#F0F5F0]">
      <div className="bg-white container mx-auto my-5 rounded-2xl flex items-center">
        <div className="text-8xl py-5 pl-5">{data2.icon}</div>
        <div>
          <div className="text-4xl font-semibold">{data2.nameBn}</div>
          <div>{data.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন</div>
        </div>
        
      </div>
    </div>
    
    </>
  );
}