"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FolderOpenIcon,
  Folder01Icon,
  File01Icon,
  JavaScriptIcon,
  PaintBrushIcon,
  FileAttachmentIcon,
} from "@/lib/hugeicons";

export interface FileItem {
  name: string;
  path?: string;
  type?: "file" | "folder";
  children?: FileItem[];
}

interface FileExplorerProps {
  files: FileItem[];
  selectedFile: string | null;
  onFileSelect: (fileName: string) => void;
  className?: string;
  orientation?: "vertical" | "horizontal";
}

// Get icon based on file extension
function getFileIcon(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "tsx":
    case "ts":
    case "jsx":
    case "js":
      return JavaScriptIcon;
    case "css":
    case "scss":
      return PaintBrushIcon;
    case "json":
      return FileAttachmentIcon;
    default:
      return File01Icon;
  }
}

// Get file extension color
function getFileColor(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "tsx":
    case "ts":
      return "text-blue-400";
    case "jsx":
    case "js":
      return "text-yellow-400";
    case "css":
    case "scss":
      return "text-pink-400";
    case "json":
      return "text-green-400";
    default:
      return "text-muted-foreground";
  }
}

interface FileTreeItemProps {
  item: FileItem;
  depth: number;
  selectedFile: string | null;
  onFileSelect: (fileName: string) => void;
}

// FileTreeItem component with orientation support
function FileTreeItem({
  item,
  depth,
  selectedFile,
  onFileSelect,
  orientation = "vertical",
}: FileTreeItemProps & { orientation?: "vertical" | "horizontal" }) {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = item.type === "folder" || (item.children && item.children.length > 0);
  const isSelected = selectedFile === item.name;

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onFileSelect(item.name);
    }
  };

  if (orientation === "horizontal") {
    // Horizontal item (pill style)
    if (isFolder) return null; // Simplified: horizontal mode doesn't support folders for now

    return (
      <motion.button
        onClick={handleClick}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 text-xs rounded-md transition-all duration-200 whitespace-nowrap border",
          "hover:bg-accent/50 group",
          isSelected
            ? "bg-accent text-accent-foreground border-accent-foreground/20"
            : "bg-background border-transparent"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <HugeiconsIcon
          icon={getFileIcon(item.name)}
          size={14}
          className={cn("shrink-0", getFileColor(item.name))}
        />
        <span>{item.name}</span>
      </motion.button>
    );
  }

  // Vertical item (original implementation)
  return (
    <div>
      <motion.button
        onClick={handleClick}
        className={cn(
          "w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-all duration-200",
          "hover:bg-accent/50 group",
          isSelected && "bg-accent text-accent-foreground"
        )}
        style={{ paddingLeft: `${12 + depth * 12}px` }}
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
      >
        {isFolder ? (
          <motion.div
            animate={{ rotate: isOpen ? 0 : -90 }}
            transition={{ duration: 0.2 }}
          >
            <HugeiconsIcon
              icon={isOpen ? FolderOpenIcon : Folder01Icon}
              size={16}
              className="text-amber-400 shrink-0"
            />
          </motion.div>
        ) : (
          <HugeiconsIcon
            icon={getFileIcon(item.name)}
            size={16}
            className={cn("shrink-0", getFileColor(item.name))}
          />
        )}
        <span className="truncate text-left flex-1">{item.name}</span>
        {isSelected && (
          <motion.div
            layoutId="file-indicator"
            className="w-1.5 h-1.5 rounded-full bg-primary"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          />
        )}
      </motion.button>

      {/* Children */}
      <AnimatePresence>
        {isFolder && isOpen && item.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {item.children.map((child) => (
              <FileTreeItem
                key={child.name}
                item={child}
                depth={depth + 1}
                selectedFile={selectedFile}
                onFileSelect={onFileSelect}
                orientation={orientation}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// FileExplorer component with orientation support
export function FileExplorer({
  files,
  selectedFile,
  onFileSelect,
  className,
  orientation = "vertical",
}: FileExplorerProps) {
  if (orientation === "horizontal") {
    return (
      <div
        className={cn(
          "flex items-center gap-2 overflow-x-auto p-2 bg-muted/30 border-b no-scrollbar",
          className
        )}
      >
        <AnimatePresence mode="wait">
          {files.map((file, index) => (
            <motion.div
              key={file.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <FileTreeItem
                item={file}
                depth={0}
                selectedFile={selectedFile}
                onFileSelect={onFileSelect}
                orientation="horizontal"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-muted/30 border-r",
        className
      )}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b bg-background/50 backdrop-blur-sm h-12.5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Explorer
        </h4>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto py-2">
        <AnimatePresence mode="wait">
          {files.map((file, index) => (
            <motion.div
              key={file.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <FileTreeItem
                item={file}
                depth={0}
                selectedFile={selectedFile}
                onFileSelect={onFileSelect}
                orientation="vertical"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t bg-background/30 backdrop-blur-sm">
        <p className="text-xs text-muted-foreground">
          {files.length} file{files.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
