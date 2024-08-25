import { useState } from "react";

const FolderData = [
    {
        id: "1",
        name: "root",
        isFolder: true,
        items: [
            {
                id: "2",
                name: "public",
                isFolder: true,
                items: [
                    {
                        id: "3",
                        name: "public nested 1",
                        isFolder: true,
                        items: [
                            {
                                id: "4",
                                name: "index.html",
                                isFolder: false,
                                items: [],
                            },
                            {
                                id: "5",
                                name: "hello.html",
                                isFolder: false,
                                items: [],
                            },
                        ],
                    },
                    {
                        id: "6",
                        name: "public_nested_file",
                        isFolder: false,
                        items: [],
                    },
                ],
            },
            {
                id: "7",
                name: "src",
                isFolder: true,
                items: [
                    {
                        id: "8",
                        name: "App.js",
                        isFolder: false,
                        items: [],
                    },
                    {
                        id: "9",
                        name: "Index.js",
                        isFolder: false,
                        items: [],
                    },
                    {
                        id: "10",
                        name: "styles.css",
                        isFolder: false,
                        items: [],
                    },
                ],
            },
            {
                id: "11",
                name: "package.json",
                isFolder: false,
                items: [],
            },
        ],
    },
];

const Folder = ({ folder }) => {
    const [isExpand, setIsExpand] = useState(false);

    const addFolder = (folderId, e) => {
        e.stopPropagation()
    }
    return (
        <div>
            {folder.isFolder ? (
                <div onClick={() => expandHandler()} className="ml-6">
                    <div onClick={()=>setIsExpand(!isExpand)} className="flex gap-2">
                        <h1 className="bg-slate-950 my-2  cursor-pointer">{folder.name} 📁</h1>
                        <button onClick={(e) => addFolder(folder.id, e)}>folder</button>
                        <button>file</button>
                    </div>
                    {isExpand && folder.items.map((item) => (
                        <Folder key={item.id} folder={item} />
                    ))}
                </div>
            ) : (
                <span className="ml-6">{folder.name} 📄</span>
            )}
        </div>
    );
};

export default function Folders() {
    const [folderData, setFolderData] = useState(FolderData);
    return (
        <div className="w-fit p-4 bg-slate-600">
            {folderData.map((folder) => (
                <Folder key={folder.id} folder={folder} />
            ))}
        </div>
    );
}
