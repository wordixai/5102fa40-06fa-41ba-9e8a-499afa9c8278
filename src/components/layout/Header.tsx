import { Link, useLocation } from 'react-router-dom';
import { APP_NAME } from '@/lib/constants';
import { useTryOnStore } from '@/store/useTryOnStore';

const stepRoutes = [
  { path: '/upload', label: '上传', step: 1 },
  { path: '/catalog', label: '选择', step: 2 },
  { path: '/tryon', label: '试穿', step: 3 },
];

export default function Header() {
  const location = useLocation();
  const { uploadedPhoto, selectedGarment } = useTryOnStore();

  const currentStepIndex = stepRoutes.findIndex((r) => r.path === location.pathname);
  const isLanding = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container-app flex h-16 items-center justify-between">
        <Link to="/" className="font-serif text-xl tracking-[0.15em] text-foreground">
          {APP_NAME}
        </Link>

        {!isLanding && (
          <nav className="flex items-center gap-1">
            {stepRoutes.map((route, i) => {
              const isActive = location.pathname === route.path;
              const isPast = currentStepIndex > i;
              const isAccessible =
                (i === 0) ||
                (i === 1 && !!uploadedPhoto) ||
                (i === 2 && !!uploadedPhoto && !!selectedGarment);

              return (
                <div key={route.path} className="flex items-center">
                  {i > 0 && (
                    <div className={`mx-2 h-px w-6 transition-colors ${isPast ? 'bg-primary' : 'bg-border'}`} />
                  )}
                  {isAccessible ? (
                    <Link
                      to={route.path}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : isPast
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                        isActive
                          ? 'bg-primary-foreground/20'
                          : isPast
                          ? 'bg-primary/10'
                          : 'bg-muted'
                      }`}>
                        {route.step}
                      </span>
                      <span className="hidden sm:inline">{route.label}</span>
                    </Link>
                  ) : (
                    <span className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted-foreground/50">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs">
                        {route.step}
                      </span>
                      <span className="hidden sm:inline">{route.label}</span>
                    </span>
                  )}
                </div>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
