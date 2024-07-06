import { Skeleton } from "@/components/ui/skeleton";

const SkeletonList = () => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-2">
      {/* Translucent Black Overlay */}

      <div className="relative">
        {/* Translucent Black Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <p className="font-bold text-center opacity-40">
            대화 내역을 보려면 <br /> 로그인이 필요합니다.
          </p>
        </div>
        <div className="flex flex-col gap-4 opacity-20">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonList;
