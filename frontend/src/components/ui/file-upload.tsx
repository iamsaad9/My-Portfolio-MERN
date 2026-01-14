import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { motion } from "framer-motion"; // Changed to framer-motion as it's the standard import for motion/react
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File) => void;
}) => {
  const [files, setFiles] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles[0]);
    onChange?.(newFiles[0]);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        whileHover="animate"
        className="group/file block cursor-pointer w-full relative"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center ">
          <div className="relative w-full max-w-xl mx-auto ">
            {files && (
              <motion.div
                key={"file"}
                layoutId={"file-upload"}
                className={cn(
                  "relative overflow-hidden z-40 bg-(--secondary) flex flex-col items-start justify-start p-4 py-2 w-full mx-auto rounded-[10px]",
                  "shadow-sm border border-(--bg-secondary) dark:border-neutral-800"
                )}
              >
                <div className="flex justify-between w-full items-center gap-4">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="text-sm text-white truncate max-w-xs"
                  >
                    {files.name}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="rounded-lg px-2 py-1 w-fit shrink-0 text-xs text-white/50 dark:bg-neutral-800 dark:text-white shadow-input"
                  >
                    {(files.size / (1024 * 1024)).toFixed(2)} MB
                  </motion.p>
                </div>

                <div className="flex text-sm items-center w-full mt-2 justify-between text-white/60 dark:text-white/40">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="px-2 flex gap-2 items-center justify-center py-1 bg-(--bg-secondary) rounded-[20px] dark:bg-neutral-800 "
                  >
                    {files.type}
                    <X size={15} onClick={() => setFiles(null)} />
                  </motion.p>
                </div>
              </motion.div>
            )}

            {!files && (
              <div className="relative h-20 w-full flex items-center justify-center">
                <motion.div
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    "relative group-hover/file:shadow-2xl z-40 bg-(--bg-secondary) dark:bg-neutral-900 flex items-center justify-center h-20 w-20 mx-auto rounded-md",
                    "shadow-[0px_10px_50px_rgba(0,0,0,0.1)] border border-(--bg-secondary) dark:border-neutral-800"
                  )}
                  onClick={handleClick}
                >
                  {isDragActive ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-white flex flex-col items-center"
                    >
                      Drop it
                      <IconUpload className="h-4 w-4 text-white" />
                    </motion.p>
                  ) : (
                    <IconUpload className="h-4 w-4 text-white" />
                  )}
                </motion.div>

                <motion.div
                  variants={secondaryVariant}
                  className="absolute border border-dashed border-(--theme_1) inset-0 z-30 bg-transparent flex items-center justify-center h-20 w-20 mx-auto rounded-md"
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
