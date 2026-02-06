import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION } from '@/lib/constants';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center bg-hero-gradient overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-fashion-rose/5 blur-3xl" />
      </div>

      <div className="container-app relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>AI 驱动的虚拟试穿</span>
            </div>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {APP_TAGLINE.split('AI').map((part, i) => (
                <span key={i}>
                  {part}
                  {i === 0 && <span className="text-gradient-coral">AI</span>}
                </span>
              ))}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {APP_DESCRIPTION}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate('/upload')}
              >
                开始试穿
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
              <Button
                variant="hero-outline"
                size="xl"
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                了解更多
              </Button>
            </div>
          </motion.div>

          {/* Right: Fashion image collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto w-full max-w-md">
              {/* Main image */}
              <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-elevated">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80&fit=crop"
                  alt="时尚穿搭展示"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 rounded-xl border border-border bg-background/90 p-4 shadow-soft backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral-gradient">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">AI 生成完成</p>
                    <p className="text-xs text-muted-foreground">效果图已就绪</p>
                  </div>
                </div>
              </div>
              {/* Floating garment preview */}
              <div className="absolute -right-4 top-12 h-24 w-20 overflow-hidden rounded-lg border border-border bg-background shadow-soft">
                <img
                  src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&q=80&fit=crop"
                  alt="服装预览"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
