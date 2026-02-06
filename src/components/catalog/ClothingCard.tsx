import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { ClothingItem } from '@/types';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ClothingCardProps {
  item: ClothingItem;
  isSelected: boolean;
  onSelect: (item: ClothingItem) => void;
}

export default function ClothingCard({ item, isSelected, onSelect }: ClothingCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(item)}
      className={`group cursor-pointer overflow-hidden rounded-xl border transition-all duration-200 ${
        isSelected
          ? 'border-primary shadow-glow ring-1 ring-primary/20'
          : 'border-border/60 hover:border-border hover:shadow-soft'
      }`}
    >
      <div className="relative overflow-hidden">
        <AspectRatio ratio={3 / 4}>
          <img
            src={item.thumbnailUrl}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </AspectRatio>

        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-coral-gradient shadow-sm"
          >
            <Check className="h-4 w-4 text-primary-foreground" />
          </motion.div>
        )}
      </div>

      <div className="p-3">
        <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{item.brand}</p>
        <span className="mt-1.5 inline-block rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground">
          {item.color}
        </span>
      </div>
    </motion.div>
  );
}
