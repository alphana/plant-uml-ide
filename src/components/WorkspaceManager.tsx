import React, { useState } from 'react';
import { Plus, Trash2, FolderIcon } from 'lucide-react';
import { useAppStore } from '../store';

export const WorkspaceManager: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const { workspaces, createWorkspace, deleteWorkspace, setCurrentWorkspace, currentWorkspaceId } = useAppStore();

  const handleCreateWorkspace = () => {
    if (newWorkspaceName.trim()) {
      createWorkspace(newWorkspaceName.trim(), 'temporary');
      setNewWorkspaceName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold">Workspaces</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="p-1 hover:bg-gray-100 rounded"
          title="New Workspace"
        >
          <Plus size={16} />
        </button>
      </div>

      {isCreating && (
        <div className="mb-4">
          <input
            type="text"
            value={newWorkspaceName}
            onChange={(e) => setNewWorkspaceName(e.target.value)}
            placeholder="Workspace name"
            className="w-full px-2 py-1 text-sm border rounded"
            onKeyDown={(e) => e.key === 'Enter' && handleCreateWorkspace()}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleCreateWorkspace}
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

      <div className="space-y-2">
        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            className={`flex items-center justify-between p-2 rounded cursor-pointer ${
              workspace.id === currentWorkspaceId ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => setCurrentWorkspace(workspace.id)}
          >
            <div className="flex items-center gap-2">
              <FolderIcon size={16} className="text-yellow-500" />
              <span className="text-sm">{workspace.name}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteWorkspace(workspace.id);
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