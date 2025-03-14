import React, { useState } from 'react'
import { initialData } from './data'

const Folder = ({ folderData, openFolders, toggleFolder }) => {
    return (
        folderData.map((item) => (
            <div key={item.id} style={{ textAlign: 'left', paddingLeft: '10px' }}>
                <span style={{ cursor: item.type === "folder" ? 'pointer' : "", paddingLeft: item.type !== "folder" ? "20px" : "", }} onClick={() => item.type === "folder" && toggleFolder(item.id)}>{item.type === "folder" && "📁"}{item.name}</span>
                {openFolders[item.id] && item.children && (
                    <Folder
                        folderData={item.children}
                        openFolders={openFolders}
                        toggleFolder={toggleFolder}
                    />
                )}
            </div >
        ))

    )
}
export const FileExplorer = () => {
    const [folderData, setFolderData] = useState(initialData);
    const [openFolders, setOpenFolders] = useState({});

    const toggleFolder = (folderId) => {
        setOpenFolders((prev) => ({
            ...prev,
            [folderId]: !prev[folderId],
        }));
    };

    return (
        <div>
            <h2>File Explorer</h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    border: "1px solid",
                    maxWidth: "700px",
                    height: "500px",
                    marginInline: 'auto',
                }}
            >
                {/* Sidebar Panel */}
                <div
                    style={{
                        borderRight: "1px solid",
                        gridColumn: "span 1",
                        padding: "10px",
                        overflow: "auto",
                    }}
                >
                    <div style={{ textAlign: 'left', padding: '3px', backgroundColor: 'lightgrey', color: 'black', fontWeight: '600', borderRadius: '4px' }}>
                        Project Files
                    </div>
                    <Folder folderData={folderData} openFolders={openFolders} toggleFolder={toggleFolder} />
                </div>

                {/* Main Content Panel */}
                <div
                    style={{
                        gridColumn: "span 3",
                        padding: "10px",
                        overflow: "auto",
                    }}
                >
                    Main Content
                </div>
            </div>
        </div>
    )
}
