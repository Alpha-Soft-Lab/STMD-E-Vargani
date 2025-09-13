import React from "react";

const TabListSkeleton = () => {
  return (
    <div className="px-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-2xl shadow-xl p-5 bg-gradient-to-br from-white to-salte-100"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer z-10"></div>
          <div className="relative z-20 space-y-4">
            <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-6 w-20 bg-gray-300 rounded-full mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabListSkeleton;
