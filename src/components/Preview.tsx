import React from 'react';
import { useAppStore } from '../store';
import { PlantUMLComponent } from './PlantUMLComponent';

export const Preview: React.FC = () => {
  const { fileContent } = useAppStore();

  return (
    <div className="h-full w-full flex items-center justify-center bg-white">
      {fileContent ? (
        <PlantUMLComponent 
          content={fileContent} 
          className="max-w-full max-h-full" 
        />
      ) : (
        <div className="text-gray-400">Select a file to preview</div>
      )}
    </div>
  );
};