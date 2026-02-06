import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { useTryOnStore } from '@/store/useTryOnStore';
import ClothingGrid from '@/components/catalog/ClothingGrid';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function CatalogPage() {
  const navigate = useNavigate();
  const { uploadedPhoto, selectedGarment } = useTryOnStore();

  useEffect(() => {
    if (!uploadedPhoto) {
      navigate('/upload');
    }
  }, [uploadedPhoto, navigate]);

  if (!uploadedPhoto) return null;

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
              选择你心仪的服装
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              浏览服装库，点击选择想要试穿的单品
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
            {/* Person photo sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <span className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  你的照片
                </span>
                <div className="overflow-hidden rounded-lg border border-border">
                  <AspectRatio ratio={3 / 4}>
                    <img
                      src={uploadedPhoto.previewUrl}
                      alt="你的照片"
                      className="h-full w-full object-cover"
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>

            {/* Clothing grid */}
            <div>
              <ClothingGrid />
            </div>
          </div>

          {/* Fixed bottom CTA */}
          {selectedGarment && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/90 backdrop-blur-md p-4"
            >
              <div className="container-app flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-10 overflow-hidden rounded-md border border-border">
                    <img
                      src={selectedGarment.thumbnailUrl}
                      alt={selectedGarment.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{selectedGarment.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedGarment.brand}</p>
                  </div>
                </div>
                <Button
                  variant="hero"
                  onClick={() => navigate('/tryon')}
                >
                  开始试穿
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
