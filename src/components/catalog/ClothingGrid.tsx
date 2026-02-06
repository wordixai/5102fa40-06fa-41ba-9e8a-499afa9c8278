import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { ClothingItem, ClothingCategory } from '@/types';
import { mockClothing } from '@/data/mockClothing';
import { useTryOnStore } from '@/store/useTryOnStore';
import CategoryFilter from './CategoryFilter';
import ClothingCard from './ClothingCard';

export default function ClothingGrid() {
  const [category, setCategory] = useState<ClothingCategory | 'all'>('all');
  const { selectedGarment, setSelectedGarment } = useTryOnStore();

  const filtered = useMemo(() => {
    if (category === 'all') return mockClothing;
    return mockClothing.filter((item) => item.category === category);
  }, [category]);

  const handleSelect = (item: ClothingItem) => {
    setSelectedGarment(selectedGarment?.id === item.id ? null : item);
  };

  return (
    <div>
      <div className="mb-6">
        <CategoryFilter selected={category} onSelect={setCategory} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <ClothingCard
              key={item.id}
              item={item}
              isSelected={selectedGarment?.id === item.id}
              onSelect={handleSelect}
            />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          该分类暂无服装
        </div>
      )}
    </div>
  );
}
