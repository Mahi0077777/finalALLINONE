import React from 'react';

interface AdUnitProps {
  slot?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ slot = "1234567890", format = "auto", className = "" }) => {
  return (
    <div className={`w-full my-8 flex flex-col items-center justify-center ${className}`}>
      <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Advertisement</span>
      {/* This is a placeholder container. When you get approved, you replace this div with the <ins> tag */}
      <div className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
        {format === 'horizontal' && (
          <div className="w-full h-[90px] sm:h-[250px] flex items-center justify-center text-gray-300 text-sm">
            Google AdSpace (Horizontal)
          </div>
        )}
        {format === 'rectangle' && (
          <div className="w-[300px] h-[250px] flex items-center justify-center text-gray-300 text-sm">
            Google AdSpace (Rect)
          </div>
        )}
        {format === 'auto' && (
           <div className="w-full h-[100px] sm:h-[280px] bg-gray-50 dark:bg-gray-800/50 animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default AdUnit;