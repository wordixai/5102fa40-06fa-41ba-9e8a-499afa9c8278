import { useNavigate } from 'react-router-dom';
import { Download, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTryOnStore } from '@/store/useTryOnStore';
import type { TryOnResult } from '@/types';

interface ResultActionsProps {
  result: TryOnResult;
}

export default function ResultActions({ result }: ResultActionsProps) {
  const navigate = useNavigate();
  const { setSelectedGarment, setCurrentResult, resetFlow } = useTryOnStore();

  const handleDownload = async () => {
    try {
      const response = await fetch(result.resultImageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `style-ai-${result.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab
      window.open(result.resultImageUrl, '_blank');
    }
  };

  const handleTryAnother = () => {
    setSelectedGarment(null);
    setCurrentResult(null);
    navigate('/catalog');
  };

  const handleStartOver = () => {
    resetFlow();
    navigate('/');
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="hero" size="lg" onClick={handleDownload}>
        <Download className="mr-2 h-4 w-4" />
        下载效果图
      </Button>
      <Button variant="outline" size="lg" onClick={handleTryAnother}>
        <RefreshCw className="mr-2 h-4 w-4" />
        换件衣服试试
      </Button>
      <Button variant="ghost" size="lg" onClick={handleStartOver}>
        <Home className="mr-2 h-4 w-4" />
        重新开始
      </Button>
    </div>
  );
}
