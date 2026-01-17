import React from "react";
const AdminSkeleton = () => {
  return (
    <div className="min-h-screen bg-base-100 p-6 animate-pulse">
      {/* Top Bar */}
      <div className="flex justify-between mb-6">
        <div className="h-6 w-40 bg-base-300 rounded" />
        <div className="flex gap-3">
          <div className="h-8 w-8 bg-base-300 rounded-full" />
          <div className="h-8 w-20 bg-base-300 rounded" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-base-200 p-4 rounded-lg space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-10 bg-base-300 rounded" />
        ))}
      </div>
    </div>
  );
};

export default AdminSkeleton;
