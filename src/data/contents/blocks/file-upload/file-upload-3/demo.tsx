'use client';

import { useState, useCallback } from 'react';
import { FileUploadArea, type FileEntry } from './index';

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export default function FileUpload3Demo() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const simulateUpload = (id: string) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, state: 'uploading' as const } : f,
      ),
    );

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;

      if (progress >= 100) {
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id
              ? { ...f, progress: 100, state: 'completed' as const }
              : f,
          ),
        );
      } else {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, progress: Math.min(progress, 99) } : f,
          ),
        );
      }
    }, 200);
  };
  const handleFilesSelect = useCallback((selectedFiles: File[]) => {
    const newFiles: FileEntry[] = selectedFiles.map((file) => ({
      id: generateId(),
      file,
      progress: 0,
      state: 'queued',
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((newFile) => {
      setTimeout(() => {
        simulateUpload(newFile.id);
      }, 100);
    });
  }, []);

  const handleFileRemove = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl p-4 h-full min-h-[400px] flex items-center">
      <FileUploadArea
        title="Asset Upload"
        description="Attach design assets, videos, or documents for your next project."
        maxFiles={10}
        maxSizeMB={50}
        files={files}
        onFilesSelect={handleFilesSelect}
        onFileRemove={handleFileRemove}
      />
    </div>
  );
}
