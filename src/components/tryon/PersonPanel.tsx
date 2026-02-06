import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Link } from 'react-router-dom';

interface PersonPanelProps {
  photoUrl: string;
}

export default function PersonPanel({ photoUrl }: PersonPanelProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          你的照片
        </span>
        <Link to="/upload" className="text-xs text-primary hover:underline">
          更换
        </Link>
      </div>
      <div className="overflow-hidden rounded-xl border border-border shadow-soft">
        <AspectRatio ratio={3 / 4}>
          <img
            src={photoUrl}
            alt="你的照片"
            className="h-full w-full object-cover"
          />
        </AspectRatio>
      </div>
    </div>
  );
}
