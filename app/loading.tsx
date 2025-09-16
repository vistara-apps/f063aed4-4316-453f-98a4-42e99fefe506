export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse space-y-4 w-full max-w-sm mx-auto px-4">
        {/* Header skeleton */}
        <div className="h-8 bg-gray-200 rounded-lg w-3/4 mx-auto"></div>
        
        {/* Stats cards skeleton */}
        <div className="grid grid-cols-2 gap-4">
          <div className="h-20 bg-gray-200 rounded-lg"></div>
          <div className="h-20 bg-gray-200 rounded-lg"></div>
        </div>
        
        {/* Chart skeleton */}
        <div className="h-48 bg-gray-200 rounded-lg"></div>
        
        {/* Action buttons skeleton */}
        <div className="space-y-3">
          <div className="h-12 bg-gray-200 rounded-lg"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
