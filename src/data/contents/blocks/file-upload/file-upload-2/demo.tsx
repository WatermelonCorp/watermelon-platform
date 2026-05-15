"use client";

import  { useState } from "react";
import { FileUpload, type FileItem } from "./index";

export default function FileUploadDemo() {
  const [files, setFiles] = useState<FileItem[]>([]);

  const handleFilesAdded = (newFiles: File[]) => {
    const newItems: FileItem[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      progress: 0,
      status: "uploading",
    }));

    setFiles((prev) => [...prev, ...newItems]);

    newItems.forEach((item) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === item.id
                ? { 
                    ...f, 
                    progress: 100, 
                    status: Math.random() > 0.8 ? "error" : "success", 
                    errorMessage: Math.random() > 0.8 ? "Network error occurred" : undefined 
                  }
                : f
            )
          );
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === item.id ? { ...f, progress } : f
            )
          );
        }
      }, 400);
    });
  };

  const handleFileRemove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <FileUpload
        files={files}
        onFilesAdded={handleFilesAdded}
        onFileRemove={handleFileRemove}
        maxFiles={10}
        maxSizeMB={50}
        accept=".pdf,.png,.jpg,.jpeg,.svg,.gif,.mp4,.zip"
      />
    </div>
  );
}
