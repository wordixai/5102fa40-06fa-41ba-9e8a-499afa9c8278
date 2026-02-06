import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import { useTryOnStore } from '@/store/useTryOnStore';
import PersonPanel from '@/components/tryon/PersonPanel';
import GarmentPanel from '@/components/tryon/GarmentPanel';
import GenerateButton from '@/components/tryon/GenerateButton';
import LoadingOverlay from '@/components/tryon/LoadingOverlay';
import ResultView from '@/components/tryon/ResultView';
import ResultActions from '@/components/tryon/ResultActions';
import { generateTryOn } from '@/data/mockApi';

export default function TryOnPage() {
  const navigate = useNavigate();
  const {
    uploadedPhoto,
    selectedGarment,
    isGenerating,
    generationProgress,
    currentResult,
    setIsGenerating,
    setGenerationProgress,
    setCurrentResult,
    addToHistory,
  } = useTryOnStore();

  useEffect(() => {
    if (!uploadedPhoto || !selectedGarment) {
      navigate(uploadedPhoto ? '/catalog' : '/upload');
    }
  }, [uploadedPhoto, selectedGarment, navigate]);

  const handleGenerate = useCallback(async () => {
    if (!uploadedPhoto || !selectedGarment) return;

    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      const result = await generateTryOn(
        uploadedPhoto.previewUrl,
        selectedGarment.id,
        selectedGarment.imageUrl,
        (progress) => setGenerationProgress(progress)
      );

      setCurrentResult(result);
      addToHistory(result);
      toast.success('换装效果已生成');
    } catch {
      toast.error('生成失败，请重试');
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  }, [uploadedPhoto, selectedGarment, setIsGenerating, setGenerationProgress, setCurrentResult, addToHistory]);

  if (!uploadedPhoto || !selectedGarment) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 section-padding">
        <div className="container-app max-w-4xl">
          {currentResult ? (
            <>
              <ResultView result={currentResult} />
              <div className="mt-10">
                <ResultActions result={currentResult} />
              </div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 text-center"
              >
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  确认试穿
                </h1>
                <p className="mt-3 text-lg text-muted-foreground">
                  确认照片和服装后，点击生成按钮
                </p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <PersonPanel photoUrl={uploadedPhoto.previewUrl} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <GarmentPanel garment={selectedGarment} />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-10 text-center"
              >
                <GenerateButton onClick={handleGenerate} disabled={isGenerating} />
              </motion.div>
            </>
          )}
        </div>
      </main>

      <LoadingOverlay isVisible={isGenerating} progress={generationProgress} />
    </div>
  );
}
