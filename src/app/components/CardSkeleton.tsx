const CardSkeleton = () => (
  <div className="card bg-base-100 w-full max-w-80 shadow-sm rounded-2xl">
    <div className="card-body">
      <div className="flex gap-3 items-center">
        <div className="skeleton h-15 w-15 rounded-2xl shrink-0"></div>
        <div className="flex flex-col gap-2 w-full">
          <div className="skeleton h-4 w-3/4"></div>
          <div className="skeleton h-3 w-1/3"></div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex flex-col gap-2">
          <div className="skeleton h-3 w-16"></div>
          <div className="skeleton h-7 w-24"></div>
        </div>
        <div className="skeleton h-5 w-18 rounded-2xl"></div>
      </div>
    </div>
  </div>
);

export default CardSkeleton;