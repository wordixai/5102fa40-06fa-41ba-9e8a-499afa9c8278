import type { ClothingCategory } from '@/types';
import { CATEGORIES } from '@/data/mockClothing';

interface CategoryFilterProps {
  selected: ClothingCategory | 'all';
  onSelect: (cat: ClothingCategory | 'all') => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
            selected === cat.value
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-secondary text-secondary-foreground hover:bg-accent'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
