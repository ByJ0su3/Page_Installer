import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import {
  Download,
  Globe,
  Smartphone,
  Monitor,
  Moon,
  Sun
} from 'lucide-react';

const LANGUAGE_OPTIONS = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
  { code: 'it', label: 'IT' },
  { code: 'pt', label: 'PT' }
];

const INSTALLERS = {
  windows: {
    name: 'Windows',
    version: '1.0.0',
    size: '85 MB',
    requirements: 'Windows 10/11 (64-bit)',
    url: 'installers/pvc-restoration-setup-1.0.0.exe',
    status: 'available'
  },
  android: {
    name: 'Android',
    version: '1.0.0',
    size: '45 MB',
    requirements: 'Android 8.0+',
    url: 'installers/app-debug.apk',
    status: 'available'
  }
};

const TEXT = {
  es: {
    brand: 'P&VC Restoration',
    subtitle: 'Gestión',
    heroTitle: 'Centro oficial de instaladores',
    heroDescription: 'Descarga la aplicación oficial para cada plataforma.',
    installersTitle: 'Instaladores',
    version: 'Versión',
    size: 'Tamaño',
    requirements: 'Requisitos',
    download: 'Descargar',
    pending: 'Próximamente',
    pendingLabel: 'Sin enlace aún',
    footerText: 'Performing in Vintage Classic - Installer Hub'
  },
  en: {
    brand: 'P&VC Restoration',
    subtitle: 'Management',
    heroTitle: 'Official Installer Center',
    heroDescription: 'Download the official application for each platform.',
    installersTitle: 'Installers',
    version: 'Version',
    size: 'Size',
    requirements: 'Requirements',
    download: 'Download',
    pending: 'Coming soon',
    pendingLabel: 'No link yet',
    footerText: 'Performing in Vintage Classic - Installer Hub'
  },
  fr: {
    brand: 'P&VC Restoration',
    subtitle: 'Gestion',
    heroTitle: 'Centre Officiel des Installateurs',
    heroDescription: 'Telechargez l application officielle pour chaque plateforme.',
    installersTitle: 'Installateurs',
    version: 'Version',
    size: 'Taille',
    requirements: 'Exigences',
    download: 'Telecharger',
    pending: 'Bientot',
    pendingLabel: 'Lien indisponible',
    footerText: 'Performing in Vintage Classic - Installer Hub'
  },
  de: {
    brand: 'P&VC Restoration',
    subtitle: 'Verwaltung',
    heroTitle: 'Offizielles Installer Zentrum',
    heroDescription: 'Lade die offizielle Anwendung fuer jede Plattform herunter.',
    installersTitle: 'Installer',
    version: 'Version',
    size: 'Groesse',
    requirements: 'Anforderungen',
    download: 'Herunterladen',
    pending: 'Demnaechst',
    pendingLabel: 'Noch kein Link',
    footerText: 'Performing in Vintage Classic - Installer Hub'
  },
  it: {
    brand: 'P&VC Restoration',
    subtitle: 'Gestione',
    heroTitle: 'Centro Installatori Ufficiale',
    heroDescription: 'Scarica l applicazione ufficiale per ogni piattaforma.',
    installersTitle: 'Installatori',
    version: 'Versione',
    size: 'Dimensione',
    requirements: 'Requisiti',
    download: 'Scarica',
    pending: 'Prossimamente',
    pendingLabel: 'Link non disponibile',
    footerText: 'Performing in Vintage Classic - Installer Hub'
  },
  pt: {
    brand: 'P&VC Restoration',
    subtitle: 'Gestao',
    heroTitle: 'Centro Oficial de Instaladores',
    heroDescription: 'Baixe o aplicativo oficial para cada plataforma.',
    installersTitle: 'Instaladores',
    version: 'Versao',
    size: 'Tamanho',
    requirements: 'Requisitos',
    download: 'Baixar',
    pending: 'Em breve',
    pendingLabel: 'Sem link ainda',
    footerText: 'Performing in Vintage Classic - Installer Hub'
  }
};

function PlatformIcon({ platformKey }) {
  if (platformKey === 'windows') return <Monitor className="h-6 w-6" />;
  return <Smartphone className="h-6 w-6" />;
}

export default function LandingPage({ theme, toggleTheme, language, changeLanguage }) {
  const t = TEXT[language] || TEXT.es;
  const isDark = theme === 'dark';
  const publicBase = process.env.PUBLIC_URL || '';
  const currentLanguageLabel = LANGUAGE_OPTIONS.find((item) => item.code === language)?.label || language.toUpperCase();
  const resolveAssetUrl = (assetPath) => `${publicBase}/${assetPath}`.replace(/([^:]\/)\/+/g, '$1');

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? 'bg-[radial-gradient(circle_at_top,_#091229_0%,_#030711_45%,_#02040a_100%)] text-slate-100'
          : 'bg-[radial-gradient(circle_at_top,_#dbe7ff_0%,_#f4f7ff_45%,_#eef2ff_100%)] text-slate-900'
      }`}
    >
      <header
        className={`sticky top-0 z-20 backdrop-blur ${
          isDark ? 'border-b border-slate-800/80 bg-slate-950/80' : 'border-b border-slate-300/90 bg-white/80'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 overflow-hidden rounded-full border flex items-center justify-center ${
                isDark ? 'border-slate-700 bg-white' : 'border-slate-300 bg-white'
              }`}
            >
              <img
                src={resolveAssetUrl('icon.png')}
                alt="P&VC logo"
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div>
              <p className="font-semibold leading-none">{t.brand}</p>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.subtitle}</p>
            </div>
          </div>

          <div className="ml-4 flex items-center gap-3">
            <div
              className={`relative flex h-10 items-center gap-2 rounded-md border px-3 ${
                isDark ? 'border-slate-700 bg-transparent text-slate-100' : 'border-slate-300 bg-transparent text-slate-900'
              }`}
            >
              <Globe className="h-4 w-4 pointer-events-none" />
              <span className="pointer-events-none text-sm">{currentLanguageLabel}</span>
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                aria-label="Language selector"
              >
                {LANGUAGE_OPTIONS.map((item) => (
                  <option key={item.code} value={item.code} className="text-slate-900">
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <Button
              variant="outline"
              size="icon"
              className={
                isDark
                  ? 'h-10 w-10 border-slate-700 bg-transparent text-slate-100 hover:bg-slate-800'
                  : 'h-10 w-10 border-slate-300 bg-transparent text-slate-900 hover:bg-slate-100'
              }
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
          <p className={`mx-auto mt-6 max-w-2xl text-base sm:text-xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {t.heroDescription}
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.installersTitle}</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Object.entries(INSTALLERS).map(([key, item]) => (
              <Card
                key={key}
                className={
                  isDark
                    ? 'border-slate-700 bg-slate-900/65 text-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
                    : 'border-slate-300 bg-white/90 text-slate-900 shadow-[0_8px_24px_rgba(15,23,42,0.12)]'
                }
              >
                <CardHeader>
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                      <PlatformIcon platformKey={key} />
                    </div>
                    <Badge className={item.status === 'available' ? 'bg-slate-200 text-slate-900' : 'bg-slate-600 text-slate-100'}>
                      {item.status === 'available' ? item.version : t.pending}
                    </Badge>
                  </div>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <p>{t.version}: {item.version}</p>
                    <p>{t.size}: {item.size}</p>
                    <p>{t.requirements}: {item.requirements}</p>
                  </div>

                  {item.status === 'available' ? (
                    <div className="space-y-2">
                      <Button
                        className={isDark ? 'w-full bg-slate-100 text-slate-900 hover:bg-white' : 'w-full bg-slate-900 text-slate-100 hover:bg-slate-800'}
                        onClick={() => window.open(resolveAssetUrl(item.url), '_blank')}
                      >
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

      <footer className={isDark ? 'border-t border-slate-800 bg-slate-950/50' : 'border-t border-slate-300 bg-white/70'}>
        <div className="mx-auto max-w-6xl px-4 py-8">
          <Separator className={isDark ? 'mb-6 bg-slate-700' : 'mb-6 bg-slate-300'} />
          <p className={`text-center text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.footerText}</p>
        </div>
      </footer>
    </div>
  );
}
