import type { TryOnResult } from '@/types';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

const PROGRESS_MESSAGES = [
  '分析照片中...',
  '识别人物姿态...',
  '匹配服装版型...',
  '应用服装效果...',
  '优化细节中...',
  '即将完成...',
];

export function getProgressMessage(progress: number): string {
  const index = Math.min(
    Math.floor((progress / 100) * PROGRESS_MESSAGES.length),
    PROGRESS_MESSAGES.length - 1
  );
  return PROGRESS_MESSAGES[index];
}

/**
 * Convert a blob/object URL to a base64 data URL
 */
async function blobUrlToBase64(blobUrl: string): Promise<string> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Simulate progress while waiting for the real API to respond.
 * Progress advances slowly to ~85%, then pauses until API completes.
 */
function startProgressSimulation(onProgress: (p: number) => void): () => void {
  let progress = 0;
  let stopped = false;

  const tick = () => {
    if (stopped) return;
    // Slow down as we approach 85%
    const increment = progress < 30 ? 3 : progress < 60 ? 2 : progress < 85 ? 0.5 : 0;
    progress = Math.min(progress + increment, 85);
    onProgress(progress);

    if (progress < 85) {
      setTimeout(tick, 300);
    }
  };

  setTimeout(tick, 300);

  return () => {
    stopped = true;
  };
}

export async function generateTryOn(
  personPhotoUrl: string,
  garmentId: string,
  garmentImageUrl: string,
  onProgress: (progress: number) => void
): Promise<TryOnResult> {
  // Start simulated progress
  const stopProgress = startProgressSimulation(onProgress);

  try {
    // Convert person photo blob URL to base64
    const personBase64 = await blobUrlToBase64(personPhotoUrl);

    onProgress(20);

    // Call the real AI Edge Function
    const { data, error } = await supabase.functions.invoke('virtual-try-on', {
      body: {
        personImage: personBase64,
        clothingImage: garmentImageUrl,
      },
    });

    stopProgress();

    if (error) {
      throw new Error(error.message || '调用 AI 服务失败');
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    onProgress(95);

    const resultImageUrl = data?.resultImage;
    if (!resultImageUrl) {
      throw new Error('AI 未能生成换装图片，请重试');
    }

    onProgress(100);

    return {
      id: uuidv4(),
      personPhotoUrl,
      garmentId,
      garmentImageUrl,
      resultImageUrl,
      generatedAt: new Date(),
    };
  } catch (err) {
    stopProgress();
    throw err;
  }
}
