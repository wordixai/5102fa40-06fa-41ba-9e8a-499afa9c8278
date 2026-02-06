import { motion } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { TryOnResult } from '@/types';

interface ResultViewProps {
  result: TryOnResult;
}

export default function ResultView({ result }: ResultViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          换装效果
        </h2>
        <p className="mt-2 text-muted-foreground">
          以下是 AI 为你生成的试穿效果
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Before */}
        <div>
          <span className="mb-3 block text-xs font-medium uppercase tracking-widest text-muted-foreground text-center">
            原始照片
          </span>
          <div className="overflow-hidden rounded-xl border border-border shadow-soft">
            <AspectRatio ratio={3 / 4}>
              <img
                src={result.personPhotoUrl}
                alt="原始照片"
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          </div>
        </div>

        {/* After */}
        <div>
          <span className="mb-3 block text-xs font-medium uppercase tracking-widest text-primary text-center">
            AI 换装效果
          </span>
          <div className="overflow-hidden rounded-xl border border-primary/20 shadow-glow">
            <AspectRatio ratio={3 / 4}>
              <img
                src={result.resultImageUrl}
                alt="AI 换装效果"
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
