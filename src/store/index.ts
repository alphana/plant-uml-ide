import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { PlantUMLConfig, GitHubConfig, FileNode, Workspace } from '../types';

interface AppState {
  plantUMLConfig: PlantUMLConfig;
  workspaces: Workspace[];
  currentWorkspaceId: string | null;
  currentFile: string | null;
  fileContent: string;
  setPlantUMLConfig: (config: Partial<PlantUMLConfig>) => void;
  createWorkspace: (name: string, type: 'temporary' | 'github') => void;
  deleteWorkspace: (id: string) => void;
  setCurrentWorkspace: (id: string | null) => void;
  createFile: (name: string, content?: string) => void;
  updateFile: (id: string, content: string) => void;
  deleteFile: (id: string) => void;
  setCurrentFile: (id: string | null) => void;
  setFileContent: (content: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      plantUMLConfig: {
        serverUrl: 'https://www.plantuml.com/plantuml',
        defaultServer: 'https://www.plantuml.com/plantuml',
      },
      workspaces: [],
      currentWorkspaceId: null,
      currentFile: null,
      fileContent: '',
      
      setPlantUMLConfig: (config) =>
        set((state) => ({
          plantUMLConfig: { ...state.plantUMLConfig, ...config },
        })),

      createWorkspace: (name, type) => {
        const newWorkspace: Workspace = {
          id: uuidv4(),
          name,
          type,
          files: [],
          createdAt: Date.now(),
        };
        set((state) => ({
          workspaces: [...state.workspaces, newWorkspace],
          currentWorkspaceId: newWorkspace.id,
        }));
      },

      deleteWorkspace: (id) =>
        set((state) => ({
          workspaces: state.workspaces.filter((w) => w.id !== id),
          currentWorkspaceId: state.currentWorkspaceId === id ? null : state.currentWorkspaceId,
        })),

      setCurrentWorkspace: (id) =>
        set({ currentWorkspaceId: id }),

      createFile: (name, content = '') => {
        const state = get();
        const workspace = state.workspaces.find(w => w.id === state.currentWorkspaceId);
        if (!workspace) return;

        const newFile: FileNode = {
          id: uuidv4(),
          name,
          path: name,
          type: 'file',
          content,
        };

        set((state) => ({
          workspaces: state.workspaces.map((w) =>
            w.id === state.currentWorkspaceId
              ? { ...w, files: [...w.files, newFile] }
              : w
          ),
          currentFile: newFile.id,
          fileContent: content,
        }));
      },

      updateFile: (id, content) => {
        set((state) => ({
          workspaces: state.workspaces.map((w) => ({
            ...w,
            files: w.files.map((f) =>
              f.id === id ? { ...f, content } : f
            ),
          })),
          fileContent: state.currentFile === id ? content : state.fileContent,
        }));
      },

      deleteFile: (id) =>
        set((state) => ({
          workspaces: state.workspaces.map((w) => ({
            ...w,
            files: w.files.filter((f) => f.id !== id),
          })),
          currentFile: state.currentFile === id ? null : state.currentFile,
          fileContent: state.currentFile === id ? '' : state.fileContent,
        })),

      setCurrentFile: (id) => {
        const state = get();
        const workspace = state.workspaces.find(w => w.id === state.currentWorkspaceId);
        const file = workspace?.files.find(f => f.id === id);
        set({
          currentFile: id,
          fileContent: file?.content || '',
        });
      },

      setFileContent: (content) => {
        const state = get();
        if (state.currentFile) {
          get().updateFile(state.currentFile, content);
        }
        set({ fileContent: content });
      },
    }),
    {
      name: 'plantuml-web-ide',
      partialize: (state) => ({
        workspaces: state.workspaces,
        plantUMLConfig: state.plantUMLConfig,
      }),
    }
  )
);