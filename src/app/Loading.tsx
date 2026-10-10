
import CardSkeleton from "./components/CardSkeleton";
export default function Loading() {
  return (
    <div className="bg-[#F0F5F0] pt-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center">
        {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}