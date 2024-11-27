import React from 'react';
import Split from 'react-split';
import { FileExplorer } from './components/FileExplorer';
import { WorkspaceManager } from './components/WorkspaceManager';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { Settings } from './components/Settings';

function App() {
  return (
    <div className="h-screen flex flex-col">
      <header className="h-12 border-b border-gray-200 flex items-center justify-between px-4">
        <h1 className="text-xl font-semibold">PlantUML Web IDE</h1>
        <Settings />
      </header>
      <div className="flex-1 flex">
        <div className="w-64 border-r border-gray-200 flex flex-col">
          <WorkspaceManager />
          <FileExplorer />
        </div>
        <Split
          className="flex-1 flex"
          sizes={[50, 50]}
          minSize={200}
          gutterSize={4}
          gutterStyle={() => ({
            backgroundColor: '#f3f4f6',
            cursor: 'col-resize',
          })}
        >
          <div className="h-full overflow-hidden">
            <Editor />
          </div>
          <div className="h-full overflow-hidden">
            <Preview />
          </div>
        </Split>
      </div>
    </div>
  );
}

export default App;