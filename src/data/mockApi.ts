import type { TryOnResult } from '@/types';
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

export async function generateTryOn(
  personPhotoUrl: string,
  garmentId: string,
  garmentImageUrl: string,
  onProgress: (progress: number) => void
): Promise<TryOnResult> {
  const totalDuration = 3000 + Math.random() * 2000;
  const steps = 25;
  const stepDuration = totalDuration / steps;

  for (let i = 1; i <= steps; i++) {
    await new Promise((resolve) => setTimeout(resolve, stepDuration));
    onProgress(Math.min((i / steps) * 100, 100));
  }

  // Mock result — returns person photo. Will be replaced by real API.
  return {
    id: uuidv4(),
    personPhotoUrl,
    garmentId,
    garmentImageUrl,
    resultImageUrl: personPhotoUrl,
    generatedAt: new Date(),
  };
}
