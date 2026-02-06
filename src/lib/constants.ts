export const APP_NAME = 'STYLE AI';
export const APP_TAGLINE = '你的专属 AI 造型师';
export const APP_DESCRIPTION = '上传你的照片，从时尚服装库中选择心仪单品，AI 即刻为你生成试穿效果。';

export const STEP_LABELS = [
  { step: 1, title: '上传照片', description: '上传一张你的全身照' },
  { step: 2, title: '选择服装', description: '浏览服装库挑选心仪单品' },
  { step: 3, title: '生成效果', description: 'AI 为你生成换装效果图' },
] as const;

export const UPLOAD_CONSTRAINTS = {
  maxSizeMB: 10,
  maxSizeBytes: 10 * 1024 * 1024,
  acceptedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  acceptString: '.jpg,.jpeg,.png,.webp',
} as const;
