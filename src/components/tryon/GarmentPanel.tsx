import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Link } from 'react-router-dom';
import type { ClothingItem } from '@/types';

interface GarmentPanelProps {
  garment: ClothingItem;
}

export default function GarmentPanel({ garment }: GarmentPanelProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          选中服装
        </span>
        <Link to="/catalog" className="text-xs text-primary hover:underline">
          更换
        </Link>
      </div>
      <div className="overflow-hidden rounded-xl border border-border shadow-soft">
        <AspectRatio ratio={3 / 4}>
          <img
            src={garment.imageUrl}
            alt={garment.name}
            className="h-full w-full object-cover"
          />
        </AspectRatio>
      </div>
      <div className="mt-3">
        <p className="text-sm font-medium text-foreground">{garment.name}</p>
        <p className="text-xs text-muted-foreground">{garment.brand}</p>
      </div>
    </div>
  );
}
