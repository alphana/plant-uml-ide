import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { useAppStore } from '../store';

export const Settings: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { plantUMLConfig, setPlantUMLConfig } = useAppStore();

  const handleServerUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlantUMLConfig({ serverUrl: e.target.value });
  };

  const handleReset = () => {
    setPlantUMLConfig({ serverUrl: plantUMLConfig.defaultServer });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full"
        title="Settings"
      >
        <SettingsIcon size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Settings</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PlantUML Server URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={plantUMLConfig.serverUrl}
                  onChange={handleServerUrlChange}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter PlantUML server URL"
                />
                <button
                  onClick={handleReset}
                  className="px-3 py-2 bg-gray-100 text-sm rounded-md hover:bg-gray-200"
                >
                  Reset
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Default: {plantUMLConfig.defaultServer}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};