import { APP_NAME } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-8">
      <div className="container-app text-center">
        <p className="text-sm text-muted-foreground">
          {APP_NAME} — AI 驱动的虚拟试穿体验
        </p>
      </div>
    </footer>
  );
}
