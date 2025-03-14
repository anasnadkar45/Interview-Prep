
import React, { useState } from 'react';
import { 
  ChevronDown, ChevronRight, File, FileText, Folder, 
  FolderOpen, FileCode, FileImage, FileArchive 
} from 'lucide-react';

interface FileSystemItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileSystemItem[];
  extension?: string;
}

const initialData: FileSystemItem[] = [
  {
    id: 'src',
    name: 'src',
    type: 'folder',
    children: [
      {
        id: 'components',
        name: 'components',
        type: 'folder',
        children: [
          {
            id: 'button',
            name: 'button.tsx',
            type: 'file',
            extension: 'tsx'
          },
          {
            id: 'card',
            name: 'card.tsx',
            type: 'file',
            extension: 'tsx'
          },
          {
            id: 'input',
            name: 'input.tsx',
            type: 'file',
            extension: 'tsx'
          }
        ]
      },
      {
        id: 'utils',
        name: 'utils',
        type: 'folder',
        children: [
          {
            id: 'formatters',
            name: 'formatters.ts',
            type: 'file',
            extension: 'ts'
          },
          {
            id: 'validations',
            name: 'validations.ts',
            type: 'file',
            extension: 'ts'
          }
        ]
      },
      {
        id: 'app',
        name: 'app.tsx',
        type: 'file',
        extension: 'tsx'
      },
      {
        id: 'index',
        name: 'index.tsx',
        type: 'file',
        extension: 'tsx'
      }
    ]
  },
  {
    id: 'public',
    name: 'public',
    type: 'folder',
    children: [
      {
        id: 'favicon',
        name: 'favicon.ico',
        type: 'file',
        extension: 'ico'
      },
      {
        id: 'logo',
        name: 'logo.png',
        type: 'file',
        extension: 'png'
      }
    ]
  },
  {
    id: 'package',
    name: 'package.json',
    type: 'file',
    extension: 'json'
  },
  {
    id: 'tsconfig',
    name: 'tsconfig.json',
    type: 'file',
    extension: 'json'
  },
  {
    id: 'readme',
    name: 'README.md',
    type: 'file',
    extension: 'md'
  }
];

const FileExplorer: React.FC = () => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    src: true
  });
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
  // Toggle folder expanded state
  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Handle item selection
  const handleItemClick = (id: string, type: 'file' | 'folder') => {
    setSelectedItem(id);
    if (type === 'folder') {
      toggleFolder(id);
    }
  };
  
  // Get icon based on file type
  const getIcon = (item: FileSystemItem) => {
    if (item.type === 'folder') {
      return expandedFolders[item.id] ? <FolderOpen size={18} className="text-yellow-400" /> : <Folder size={18} className="text-yellow-400" />;
    }
    
    // File icons based on extension
    switch (item.extension) {
      case 'tsx':
      case 'ts':
      case 'js':
      case 'jsx':
        return <FileCode size={18} className="text-blue-500" />;
      case 'json':
        return <FileText size={18} className="text-yellow-600" />;
      case 'md':
        return <FileText size={18} className="text-gray-600" />;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'svg':
      case 'ico':
        return <FileImage size={18} className="text-purple-500" />;
      case 'zip':
      case 'rar':
      case 'tar':
        return <FileArchive size={18} className="text-orange-500" />;
      default:
        return <File size={18} className="text-gray-400" />;
    }
  };
  
  // Recursive function to render file system items
  const renderItem = (item: FileSystemItem, depth = 0) => {
    const isFolder = item.type === 'folder';
    const isExpanded = isFolder && expandedFolders[item.id];
    const isSelected = selectedItem === item.id;
    
    return (
      <div key={item.id}>
        <div 
          className={`flex items-center p-1.5 rounded cursor-pointer ${
            isSelected ? 'bg-primary/10' : 'hover:bg-muted'
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => handleItemClick(item.id, item.type)}
        >
          {isFolder ? (
            <span className="mr-1">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          ) : (
            <span className="w-4 h-4 mr-1"></span> // Empty space for alignment
          )}
          
          <span className="mr-2">{getIcon(item)}</span>
          <span className="text-sm truncate">{item.name}</span>
        </div>
        
        {isFolder && isExpanded && item.children?.map(child => renderItem(child, depth + 1))}
      </div>
    );
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">File Explorer</h2>
      
      <div className="flex h-[600px] border rounded-lg overflow-hidden">
        <div className="w-1/3 border-r p-2 overflow-auto">
          <div className="mb-2 p-2 bg-muted/50 rounded-md">
            <h3 className="text-sm font-semibold">Project Files</h3>
          </div>
          
          <div className="space-y-1">
            {initialData.map(item => renderItem(item))}
          </div>
        </div>
        
        <div className="flex-1 p-4 bg-muted/10">
          <div className="h-full flex items-center justify-center text-muted-foreground">
            {selectedItem ? (
              <div className="text-center">
                <p>Selected: <span className="font-medium">{
                  initialData.find(item => item.id === selectedItem)?.name || 
                  initialData.flatMap(item => item.children || []).find(item => item.id === selectedItem)?.name ||
                  initialData.flatMap(item => item.children || []).flatMap(item => item.children || []).find(item => item.id === selectedItem)?.name
                }</span></p>
                <p className="text-sm mt-2">
                  (In a real implementation, this would show the file content or folder details)
                </p>
              </div>
            ) : (
              <p>Select a file or folder to view details</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Click on folders to expand/collapse them. Click on files to select them.</p>
      </div>
    </div>
  );
};

export default FileExplorer;
