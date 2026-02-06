import { motion } from 'framer-motion';
import { Upload, Shirt, Wand2 } from 'lucide-react';
import { STEP_LABELS } from '@/lib/constants';

const icons = [Upload, Shirt, Wand2];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            三步轻松换装
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            简单直观的操作流程，让你秒变时尚达人
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {STEP_LABELS.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative text-center"
              >
                {/* Connector line */}
                {i < 2 && (
                  <div className="absolute left-[60%] top-10 hidden h-px w-[80%] bg-border md:block" />
                )}

                <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/5 transition-colors group-hover:bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-coral-gradient text-xs font-semibold text-primary-foreground">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
