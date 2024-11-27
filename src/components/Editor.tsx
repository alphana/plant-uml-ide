import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useAppStore } from '../store';

export const Editor: React.FC = () => {
  const { fileContent, setFileContent } = useAppStore();

  const handleEditorChange = (value: string = '') => {
    setFileContent(value);
  };

  return (
    <MonacoEditor
      height="100%"
      defaultLanguage="plantuml"
      value={fileContent}
      onChange={handleEditorChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        automaticLayout: true,
      }}
    />
  );
};