import CardSkeleton from "@/app/components/CardSkeleton";

export default function Loading() {
  return (
    <div className="bg-[#F0F5F0]">
      <div className="bg-white container mx-auto my-5 rounded-3xl border border-gray-200 p-5 flex items-center gap-5">
        <div className="skeleton h-20 w-20 rounded-2xl"></div>
        <div className="flex flex-col gap-3">
          <div className="skeleton h-8 w-40"></div>
          <div className="skeleton h-4 w-64"></div>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center">
        {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}