import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import {
  ArrowRight,
  Download,
  Globe,
  Smartphone,
  Monitor,
  ShieldCheck,
  Moon,
  Sun
} from 'lucide-react';

// Central config: keep installer files in frontend/public/installers
// and reference them with relative URLs like /installers/file-name.ext
const INSTALLERS = {
  windows: {
    name: 'Windows',
    version: 'v1.2.0',
    size: '85 MB',
    requirements: 'Windows 10/11 (64-bit)',
    url: '/installers/pvc-restoration-setup-1.0.0.exe',
    status: 'available'
  },
  android: {
    name: 'Android',
    version: 'v1.2.0',
    size: '45 MB',
    requirements: 'Android 8.0+',
    url: '/installers/app-debug.apk',
    status: 'available'
  }
};

const TEXT = {
  es: {
    brand: 'P&VC Restoration',
    subtitle: 'Gestion de Restauracion Mercedes-Benz',
    heroTitle: 'Centro de Instaladores Oficiales',
    heroDescription:
      'Descarga la aplicacion oficial para cada plataforma. Diseno alineado al estilo corporativo del proyecto real.',
    accessDashboard: 'Access Dashboard',
    installersTitle: 'Instaladores Disponibles',
    installersSub: 'Aqui puedes colocar y actualizar todos los instaladores en un solo lugar.',
    version: 'Version',
    size: 'Tamano',
    requirements: 'Requisitos',
    download: 'Descargar',
    pending: 'Proximamente',
    pendingLabel: 'Sin enlace aun',
    footerText: 'Performing in Vintage Classic - Installer Hub'
  },
  en: {
    brand: 'P&VC Restoration',
    subtitle: 'Mercedes-Benz Restoration Management',
    heroTitle: 'Official Installer Center',
    heroDescription:
      'Download the official app for each platform. Layout aligned with your real project style.',
    accessDashboard: 'Access Dashboard',
    installersTitle: 'Available Installers',
    installersSub: 'Keep and update all installers in one place.',
    version: 'Version',
    size: 'Size',
    requirements: 'Requirements',
    download: 'Download',
    pending: 'Coming soon',
    pendingLabel: 'No link yet',
    footerText: 'Performing in Vintage Classic - Installer Hub'
  }
};

function PlatformIcon({ platformKey }) {
  if (platformKey === 'windows') return <Monitor className="h-6 w-6" />;
  return <Smartphone className="h-6 w-6" />;
}

export default function LandingPage({ theme, toggleTheme, language, changeLanguage }) {
  const t = TEXT[language] || TEXT.es;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#091229_0%,_#030711_45%,_#02040a_100%)] text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md border border-slate-700 bg-slate-900/80 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-slate-300" />
            </div>
            <div>
              <p className="font-semibold leading-none">{t.brand}</p>
              <p className="text-xs text-slate-400">{t.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border-slate-700 bg-transparent text-slate-100 hover:bg-slate-800"
              onClick={() => changeLanguage(language === 'es' ? 'en' : 'es')}
            >
              <Globe className="mr-2 h-4 w-4" />
              {language === 'es' ? 'EN' : 'ES'}
            </Button>
            <Button
              variant="outline"
              className="border-slate-700 bg-transparent text-slate-100 hover:bg-slate-800"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-20 text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">{t.heroTitle}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-xl">{t.heroDescription}</p>
          <div className="mt-10">
            <Button className="bg-slate-100 px-7 py-6 text-base text-slate-900 hover:bg-white">
              {t.accessDashboard}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.installersTitle}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">{t.installersSub}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Object.entries(INSTALLERS).map(([key, item]) => (
              <Card
                key={key}
                className="border-slate-700 bg-slate-900/65 text-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
              >
                <CardHeader>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800">
                      <PlatformIcon platformKey={key} />
                    </div>
                    <Badge className={item.status === 'available' ? 'bg-slate-200 text-slate-900' : 'bg-slate-700 text-slate-200'}>
                      {item.status === 'available' ? item.version : t.pending}
                    </Badge>
                  </div>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {item.status === 'available' ? t.download : t.pendingLabel}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="text-sm text-slate-300">
                    <p>{t.version}: {item.version}</p>
                    <p>{t.size}: {item.size}</p>
                    <p>{t.requirements}: {item.requirements}</p>
                  </div>

                  {item.status === 'available' ? (
                    <div className="space-y-2">
                      <Button className="w-full bg-slate-100 text-slate-900 hover:bg-white" onClick={() => window.open(item.url, '_blank')}>
                        <Download className="mr-2 h-4 w-4" />
                        {t.download}
                      </Button>

                    </div>
                  ) : (
                    <Button disabled className="w-full cursor-not-allowed bg-slate-700 text-slate-300">
                      {t.pending}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950/50">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <Separator className="mb-6 bg-slate-700" />
          <p className="text-center text-sm text-slate-400">{t.footerText}</p>
        </div>
      </footer>
    </div>
  );
}

