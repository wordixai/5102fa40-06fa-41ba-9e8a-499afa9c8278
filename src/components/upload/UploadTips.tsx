import { CheckCircle2, Lightbulb } from 'lucide-react';

const tips = [
  '尽量使用全身照，效果更佳',
  '保持良好光线，避免过暗或过曝',
  '简洁背景效果更好',
  '正面或微侧身站姿最佳',
];

export default function UploadTips() {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-fashion-gold" />
        <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-foreground">
          拍照小贴士
        </h3>
      </div>
      <ul className="space-y-3">
        {tips.map((tip) => (
          <li key={tip} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
            <span className="text-sm leading-relaxed text-muted-foreground">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
