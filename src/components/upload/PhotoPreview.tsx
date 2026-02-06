import { motion } from 'framer-motion';
import { X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTryOnStore } from '@/store/useTryOnStore';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function PhotoPreview() {
  const { uploadedPhoto, setUploadedPhoto } = useTryOnStore();

  if (!uploadedPhoto) return null;

  const handleRemove = () => {
    URL.revokeObjectURL(uploadedPhoto.previewUrl);
    setUploadedPhoto(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative mx-auto w-full max-w-sm"
    >
      <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
        <AspectRatio ratio={3 / 4}>
          <img
            src={uploadedPhoto.previewUrl}
            alt="上传的照片"
            className="h-full w-full object-cover"
          />
        </AspectRatio>
      </div>

      <div className="mt-4 flex justify-center gap-3">
        <Button variant="outline" size="sm" onClick={handleRemove}>
          <RefreshCw className="mr-1.5 h-4 w-4" />
          重新上传
        </Button>
        <Button variant="ghost" size="sm" onClick={handleRemove}>
          <X className="mr-1.5 h-4 w-4" />
          移除
        </Button>
      </div>
    </motion.div>
  );
}
