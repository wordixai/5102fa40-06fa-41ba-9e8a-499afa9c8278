import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function GenerateButton({ onClick, disabled }: GenerateButtonProps) {
  return (
    <Button
      variant="hero"
      size="xl"
      onClick={onClick}
      disabled={disabled}
      className="w-full sm:w-auto"
    >
      <Sparkles className="mr-2 h-5 w-5" />
      生成试穿效果
    </Button>
  );
}
