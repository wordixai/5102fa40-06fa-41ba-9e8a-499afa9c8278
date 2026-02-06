import { useCallback, useState, useRef } from 'react';
import { Upload, ImagePlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { UPLOAD_CONSTRAINTS } from '@/lib/constants';
import { useTryOnStore } from '@/store/useTryOnStore';
import { v4 as uuidv4 } from 'uuid';

export default function PhotoDropZone() {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setUploadedPhoto } = useTryOnStore();

  const handleFile = useCallback((file: File) => {
    if (!UPLOAD_CONSTRAINTS.acceptedTypes.includes(file.type)) {
      toast.error('不支持的文件格式，请上传 JPG、PNG 或 WebP 图片');
      return;
    }
    if (file.size > UPLOAD_CONSTRAINTS.maxSizeBytes) {
      toast.error(`文件过大，请上传 ${UPLOAD_CONSTRAINTS.maxSizeMB}MB 以内的图片`);
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setUploadedPhoto({
      id: uuidv4(),
      file,
      previewUrl,
      uploadedAt: new Date(),
    });
  }, [setUploadedPhoto]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => setIsDragging(false), []);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-all duration-300 md:p-16 ${
          isDragging
            ? 'border-primary bg-primary/5 scale-[1.01]'
            : 'border-border hover:border-primary/40 hover:bg-primary/3'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={UPLOAD_CONSTRAINTS.acceptString}
          onChange={onInputChange}
          className="hidden"
        />

        <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl transition-colors ${
          isDragging ? 'bg-primary/10' : 'bg-secondary group-hover:bg-primary/8'
        }`}>
          {isDragging ? (
            <ImagePlus className="h-10 w-10 text-primary" />
          ) : (
            <Upload className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </div>

        <p className="text-lg font-medium text-foreground">
          {isDragging ? '松开以上传图片' : '拖拽照片到这里，或点击上传'}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          支持 JPG、PNG、WebP 格式，最大 {UPLOAD_CONSTRAINTS.maxSizeMB}MB
        </p>
      </div>
    </motion.div>
  );
}
