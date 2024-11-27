import React, { useMemo } from 'react';
import { useAppStore } from '../store';
import { encodePlantUML } from '../utils/plantuml';

interface PlantUMLComponentProps {
  content: string;
  className?: string;
}

export const PlantUMLComponent: React.FC<PlantUMLComponentProps> = ({ content, className = '' }) => {
  const { plantUMLConfig } = useAppStore();

  const encodedDiagram = useMemo(() => {
    if (!content) return '';
    return encodePlantUML(content);
  }, [content]);

  if (!content) {
    return null;
  }

  return (
    <img
      src={`${plantUMLConfig.serverUrl}/png/${encodedDiagram}`}
      alt="PlantUML Diagram"
      className={className}
      onError={(e) => {
        const img = e.target as HTMLImageElement;
        img.style.display = 'none';
        img.parentElement!.innerHTML = `
          <div class="text-red-500 p-4">
            Failed to render diagram. Please check your PlantUML syntax.
          </div>
        `;
      }}
    />
  );
};