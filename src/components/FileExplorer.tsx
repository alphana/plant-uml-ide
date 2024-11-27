import React, { useState } from 'react';
import { FileIcon, Plus, Trash2 } from 'lucide-react';
import { useAppStore } from '../store';

export const FileExplorer: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const { workspaces, currentWorkspaceId, currentFile, createFile, deleteFile, setCurrentFile } = useAppStore();

  const currentWorkspace = workspaces.find(w => w.id === currentWorkspaceId);
  const files = currentWorkspace?.files || [];

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      createFile(newFileName.trim());
      setNewFileName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="h-full w-64 border-r border-gray-200 overflow-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Files</h2>
          {currentWorkspaceId && (
            <button
              onClick={() => setIsCreating(true)}
              className="p-1 hover:bg-gray-100 rounded"
              title="New File"
            >
              <Plus size={16} />
            </button>
          )}
        </div>

        {isCreating && (
          <div className="mt-2">
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="filename.puml"
              className="w-full px-2 py-1 text-sm border rounded"
              onKeyDown={(e) => e.key === 'Enter' && handleCreateFile()}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleCreateFile}
                className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Create
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-2">
        {files.map((file) => (
          <div
            key={file.id}
            className={`flex items-center justify-between p-2 rounded cursor-pointer ${
              file.id === currentFile ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => setCurrentFile(file.id)}
          >
            <div className="flex items-center gap-2">
              <FileIcon size={16} className="text-gray-500" />
              <span className="text-sm">{file.name}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteFile(file.id);
              }}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <Trash2 size={14} className="text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};