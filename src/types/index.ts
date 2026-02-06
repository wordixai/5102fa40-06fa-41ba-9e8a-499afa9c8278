export type ClothingCategory = 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'accessories';

export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  brand: string;
  imageUrl: string;
  thumbnailUrl: string;
  description: string;
  color: string;
  tags: string[];
}

export interface UploadedPhoto {
  id: string;
  file: File;
  previewUrl: string;
  uploadedAt: Date;
}

export interface TryOnResult {
  id: string;
  personPhotoUrl: string;
  garmentId: string;
  garmentImageUrl: string;
  resultImageUrl: string;
  generatedAt: Date;
}

export type AppStep = 'landing' | 'upload' | 'catalog' | 'tryon' | 'result';
