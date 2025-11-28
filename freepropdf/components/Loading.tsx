import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading: React.FC = () => {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center animate-pulse">
        <Loader2 className="h-12 w-12 text-brand-600 animate-spin mb-4" />
        <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">Loading resources...</p>
      </div>
    </div>
  );
};

export default Loading;