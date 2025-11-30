import React from 'react';
import { Link } from 'react-router-dom';
import { ToolType, ToolInfo } from '../types';
import { TOOLS } from '../constants';

interface RelatedToolsProps {
  currentTool: ToolType;
  maxTools?: number;
}

const RelatedTools: React.FC<RelatedToolsProps> = ({ currentTool, maxTools = 4 }) => {
  // Filter out the current tool and get a random selection of other tools
  const relatedTools = TOOLS
    .filter(tool => tool.id !== currentTool)
    .sort(() => 0.5 - Math.random())
    .slice(0, maxTools);

  if (relatedTools.length === 0) return null;

  return (
    <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedTools.map((tool) => (
          <Link
            key={tool.id}
            to={`/#${tool.path}`}
            className="group block p-5 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors border border-gray-200 dark:border-gray-600 hover:border-brand-200 dark:hover:border-brand-800"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 group-hover:bg-white dark:group-hover:bg-brand-800/50 transition-colors">
                {React.createElement(require('lucide-react')[tool.icon], { size: 24 })}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {tool.shortTitle}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {tool.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedTools;
