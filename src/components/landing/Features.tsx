import { motion } from 'framer-motion';
import { Zap, Palette, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: '秒级生成',
    description: '先进的 AI 算法，几秒钟即可生成高质量换装效果图。',
  },
  {
    icon: Palette,
    title: '海量服装',
    description: '涵盖上装、下装、连衣裙、外套等多种品类，风格任你选。',
  },
  {
    icon: ShieldCheck,
    title: '真实效果',
    description: '智能适配体型与姿态，呈现自然逼真的换装效果。',
  },
];

export default function Features() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            为什么选择我们
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            融合前沿 AI 技术与时尚美学
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-border/60 bg-background p-8 transition-all duration-300 hover:shadow-elevated"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 transition-colors group-hover:bg-primary/12">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
