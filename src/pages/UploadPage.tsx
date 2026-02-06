import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { useTryOnStore } from '@/store/useTryOnStore';
import PhotoDropZone from '@/components/upload/PhotoDropZone';
import PhotoPreview from '@/components/upload/PhotoPreview';
import UploadTips from '@/components/upload/UploadTips';

export default function UploadPage() {
  const navigate = useNavigate();
  const { uploadedPhoto } = useTryOnStore();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 section-padding">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              上传你的照片
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              选择一张全身照，AI 将为你生成换装效果
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1fr_280px]">
            <div>
              {uploadedPhoto ? <PhotoPreview /> : <PhotoDropZone />}

              {uploadedPhoto && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 flex justify-center"
                >
                  <Button
                    variant="hero"
                    size="xl"
                    onClick={() => navigate('/catalog')}
                  >
                    选择服装
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              )}
            </div>

            <div className="hidden lg:block">
              <UploadTips />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
