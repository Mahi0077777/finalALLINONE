import { lazy } from 'react';
import { ToolType } from '../types';

// Import ToolProcessor with proper typing
const ToolProcessor = lazy(() => import('./ToolProcessor'));

// Re-export as default
export default ToolProcessor;
