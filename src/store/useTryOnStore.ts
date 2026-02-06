import { create } from 'zustand';
import type { AppStep, ClothingItem, UploadedPhoto, TryOnResult } from '@/types';

interface TryOnState {
  currentStep: AppStep;
  setCurrentStep: (step: AppStep) => void;

  uploadedPhoto: UploadedPhoto | null;
  setUploadedPhoto: (photo: UploadedPhoto | null) => void;

  selectedGarment: ClothingItem | null;
  setSelectedGarment: (item: ClothingItem | null) => void;

  isGenerating: boolean;
  generationProgress: number;
  setIsGenerating: (val: boolean) => void;
  setGenerationProgress: (val: number) => void;

  currentResult: TryOnResult | null;
  setCurrentResult: (result: TryOnResult | null) => void;

  resultHistory: TryOnResult[];
  addToHistory: (result: TryOnResult) => void;

  resetFlow: () => void;
}

export const useTryOnStore = create<TryOnState>((set) => ({
  currentStep: 'landing',
  setCurrentStep: (step) => set({ currentStep: step }),

  uploadedPhoto: null,
  setUploadedPhoto: (photo) => set({ uploadedPhoto: photo }),

  selectedGarment: null,
  setSelectedGarment: (item) => set({ selectedGarment: item }),

  isGenerating: false,
  generationProgress: 0,
  setIsGenerating: (val) => set({ isGenerating: val }),
  setGenerationProgress: (val) => set({ generationProgress: val }),

  currentResult: null,
  setCurrentResult: (result) => set({ currentResult: result }),

  resultHistory: [],
  addToHistory: (result) =>
    set((state) => ({ resultHistory: [result, ...state.resultHistory] })),

  resetFlow: () =>
    set({
      currentStep: 'landing',
      uploadedPhoto: null,
      selectedGarment: null,
      isGenerating: false,
      generationProgress: 0,
      currentResult: null,
    }),
}));
