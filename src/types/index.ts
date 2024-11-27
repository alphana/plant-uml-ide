export interface PlantUMLConfig {
  serverUrl: string;
  defaultServer: string;
}

export interface GitHubConfig {
  repoUrl: string;
  branch: string;
  path: string;
}

export interface FileNode {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'directory';
  content?: string;
  children?: FileNode[];
}

export interface Workspace {
  id: string;
  name: string;
  type: 'temporary' | 'github';
  githubConfig?: GitHubConfig;
  files: FileNode[];
  createdAt: number;
}