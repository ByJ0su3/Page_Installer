import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Moon, Sun, Globe, Download, CheckCircle2, Shield, AlertCircle, Clock, Package, Smartphone, Monitor, Apple } from 'lucide-react';

// Configuration Object - Easy to modify
const CONFIG = {
  // Logo paths - Replace with your actual logo files
  logo: {
    main: '/logo.svg', // Main logo in header
    favicon: '/favicon.ico' // Favicon
  },
  
  // Download links by platform
  downloads: {
    windows: {
      url: 'https://example.com/downloads/PVC-Restoration-Setup.exe',
      version: '1.2.0',
      date: '2024-01-15',
      size: '85 MB',
      requirements: 'Windows 10/11 (64-bit)'
    },
    macos: {
      url: 'https://example.com/downloads/PVC-Restoration.dmg',
      version: '1.2.0',
      date: '2024-01-15',
      size: '92 MB',
      requirements: 'macOS 11.0+'
    },
    linux: {
      appimage: 'https://example.com/downloads/PVC-Restoration.AppImage',
      deb: 'https://example.com/downloads/pvc-restoration.deb',
      version: '1.2.0',
      date: '2024-01-15',
      size: '88 MB',
      requirements: 'Ubuntu 20.04+ / Debian 11+'
    },
    android: {
      url: 'https://example.com/downloads/PVC-Restoration.apk',
      version: '1.2.0',
      date: '2024-01-15',
      size: '45 MB',
      requirements: 'Android 8.0+'
    },
    ios: {
      testflight: 'https://testflight.apple.com/join/example',
      version: '1.2.0',
      date: '2024-01-15',
      size: '52 MB',
      requirements: 'iOS 13.0+'
    }
  },
  
  // SHA-256 Checksums
  checksums: {
    windows: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6',
    macos: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a1',
    linux_appimage: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a1b2',
    linux_deb: 'd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a1b2c3',
    android: 'e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a1b2c3d4',
    ios: 'f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a1b2c3d4e5'
  },
  
  // Contact & Support
  support: {
    email: 'support@pvcrestoration.com',
    website: 'https://www.pvcrestoration.com'
  }
};

// Multi-language content
const TRANSLATIONS = {
  es: {
    // Header
    languageLabel: 'Idioma',
    themeToggle: 'Cambiar tema',
    
    // Hero
    heroTitle: 'P&VC Restoration',
    heroSubtitle: 'Gestión Profesional de Restauración',
    heroTagline: 'Mercedes-Benz Clásicos',
    heroDescription: 'La solución definitiva para gestionar proyectos de restauración de vehículos Mercedes-Benz clásicos. Disponible en todas las plataformas.',
    downloadNow: 'Descargar Ahora',
    viewReleases: 'Ver Versiones',
    
    // Downloads Section
    downloadTitle: 'Descargas por Plataforma',
    downloadSubtitle: 'Elige tu sistema operativo y comienza a gestionar tus restauraciones',
    
    // Platform Cards
    windows: 'Windows',
    windowsDesc: 'Instalador para Windows 10/11',
    macos: 'macOS',
    macosDesc: 'Imagen de disco para Mac',
    linux: 'Linux',
    linuxDesc: 'AppImage y paquetes DEB',
    android: 'Android',
    androidDesc: 'APK para dispositivos Android',
    ios: 'iOS',
    iosDesc: 'TestFlight para iPhone/iPad',
    
    downloadButton: 'Descargar',
    downloadDeb: 'Descargar .deb',
    joinTestFlight: 'Unirse a TestFlight',
    version: 'Versión',
    updated: 'Actualizado',
    size: 'Tamaño',
    requirements: 'Requisitos',
    
    // Installation Methods
    installTitle: 'Métodos de Instalación',
    installSubtitle: 'Elige el método que mejor se adapte a tus necesidades',
    
    standardInstall: 'Instalación Estándar',
    standardInstallDesc: 'Instalación completa con integración del sistema y actualizaciones automáticas.',
    standardSteps: [
      'Descarga el instalador para tu plataforma',
      'Ejecuta el archivo descargado',
      'Sigue el asistente de instalación',
      'Inicia la aplicación desde tu menú de aplicaciones'
    ],
    
    portableInstall: 'Instalación Portable',
    portableInstallDesc: 'Ejecuta la aplicación sin instalación (solo Windows/Linux AppImage).',
    portableSteps: [
      'Descarga la versión portable o AppImage',
      'Extrae el archivo (si es necesario)',
      'Ejecuta el archivo ejecutable directamente',
      'No requiere permisos de administrador'
    ],
    
    verifyInstall: 'Verificar Instalación',
    verifyInstallDesc: 'Asegura la integridad de tu descarga verificando el checksum SHA-256.',
    verifySteps: [
      'Descarga el archivo de tu plataforma',
      'Calcula el hash SHA-256 del archivo',
      'Compara con el checksum publicado abajo',
      'Si coinciden, la descarga es auténtica'
    ],
    
    checksumTitle: 'Checksums SHA-256',
    copyChecksum: 'Copiar',
    copiedChecksum: '¡Copiado!',
    
    // Important Notes
    notesTitle: 'Notas Importantes',
    notesSubtitle: 'Por favor lee estas instrucciones específicas de cada plataforma',
    
    macosNote: 'macOS Gatekeeper',
    macosNoteDesc: 'Al abrir por primera vez, macOS puede mostrar un aviso de seguridad:',
    macosSteps: [
      'Haz clic derecho en la aplicación',
      'Selecciona "Abrir" del menú contextual',
      'Confirma que deseas abrir la aplicación',
      'La aplicación se abrirá sin problemas en futuros usos'
    ],
    
    androidNote: 'Fuentes Desconocidas',
    androidNoteDesc: 'Para instalar el APK, necesitas habilitar instalación de fuentes desconocidas:',
    androidSteps: [
      'Ve a Configuración > Seguridad',
      'Habilita "Fuentes desconocidas"',
      'Descarga e instala el APK',
      'Puedes deshabilitar esta opción después'
    ],
    
    iosNote: 'TestFlight & Provisioning',
    iosNoteDesc: 'La versión iOS está disponible a través de TestFlight:',
    iosSteps: [
      'Instala la aplicación TestFlight desde App Store',
      'Haz clic en el enlace de invitación',
      'Acepta la invitación en TestFlight',
      'Instala y prueba la aplicación'
    ],
    
    securityNote: 'Firma Digital & Verificación',
    securityNoteDesc: 'Todas las descargas están firmadas digitalmente y verificadas:',
    securitySteps: [
      'Los instaladores Windows están firmados con certificado EV',
      'Las aplicaciones macOS están notarizadas por Apple',
      'Los APKs Android incluyen firma de aplicación v2',
      'Verifica siempre los checksums SHA-256'
    ],
    
    // Version History
    historyTitle: 'Historial de Versiones',
    historySubtitle: 'Últimas actualizaciones y mejoras',
    
    versionHistory: [
      {
        version: '1.2.0',
        date: '15 enero 2024',
        changes: [
          'Nueva interfaz de gestión de proyectos',
          'Soporte para fotos de progreso HD',
          'Exportación de informes mejorada',
          'Correcciones de bugs y mejoras de rendimiento'
        ]
      },
      {
        version: '1.1.5',
        date: '10 diciembre 2023',
        changes: [
          'Sincronización en la nube optimizada',
          'Nuevas plantillas de informes',
          'Soporte para base de datos de piezas',
          'Correcciones menores de UI'
        ]
      },
      {
        version: '1.1.0',
        date: '5 noviembre 2023',
        changes: [
          'Lanzamiento multiplataforma',
          'Sincronización entre dispositivos',
          'Modo oscuro',
          'Soporte multiidioma'
        ]
      }
    ],
    
    viewFullChangelog: 'Ver historial completo',
    
    // Footer
    footerTagline: 'Gestión profesional para restauraciones de Mercedes-Benz clásicos',
    footerSupport: 'Soporte',
    footerEmail: 'Email',
    footerPrivacy: 'Privacidad',
    footerTerms: 'Términos',
    footerCopyright: '© 2024 Performing in Vintage Classic. Todos los derechos reservados.',
    
    // Installation Guide Link
    installGuide: 'Guía de Instalación Completa'
  },
  
  en: {
    languageLabel: 'Language',
    themeToggle: 'Toggle theme',
    
    heroTitle: 'P&VC Restoration',
    heroSubtitle: 'Professional Restoration Management',
    heroTagline: 'Classic Mercedes-Benz',
    heroDescription: 'The ultimate solution for managing Mercedes-Benz classic vehicle restoration projects. Available on all platforms.',
    downloadNow: 'Download Now',
    viewReleases: 'View Releases',
    
    downloadTitle: 'Platform Downloads',
    downloadSubtitle: 'Choose your operating system and start managing your restorations',
    
    windows: 'Windows',
    windowsDesc: 'Installer for Windows 10/11',
    macos: 'macOS',
    macosDesc: 'Disk image for Mac',
    linux: 'Linux',
    linuxDesc: 'AppImage and DEB packages',
    android: 'Android',
    androidDesc: 'APK for Android devices',
    ios: 'iOS',
    iosDesc: 'TestFlight for iPhone/iPad',
    
    downloadButton: 'Download',
    downloadDeb: 'Download .deb',
    joinTestFlight: 'Join TestFlight',
    version: 'Version',
    updated: 'Updated',
    size: 'Size',
    requirements: 'Requirements',
    
    installTitle: 'Installation Methods',
    installSubtitle: 'Choose the method that best suits your needs',
    
    standardInstall: 'Standard Installation',
    standardInstallDesc: 'Full installation with system integration and automatic updates.',
    standardSteps: [
      'Download the installer for your platform',
      'Run the downloaded file',
      'Follow the installation wizard',
      'Launch the app from your application menu'
    ],
    
    portableInstall: 'Portable Installation',
    portableInstallDesc: 'Run the application without installation (Windows/Linux AppImage only).',
    portableSteps: [
      'Download the portable version or AppImage',
      'Extract the file (if needed)',
      'Run the executable file directly',
      'No administrator permissions required'
    ],
    
    verifyInstall: 'Verify Installation',
    verifyInstallDesc: 'Ensure download integrity by verifying the SHA-256 checksum.',
    verifySteps: [
      'Download the file for your platform',
      'Calculate the SHA-256 hash of the file',
      'Compare with the published checksum below',
      'If they match, the download is authentic'
    ],
    
    checksumTitle: 'SHA-256 Checksums',
    copyChecksum: 'Copy',
    copiedChecksum: 'Copied!',
    
    notesTitle: 'Important Notes',
    notesSubtitle: 'Please read these platform-specific instructions',
    
    macosNote: 'macOS Gatekeeper',
    macosNoteDesc: 'When opening for the first time, macOS may show a security warning:',
    macosSteps: [
      'Right-click on the application',
      'Select "Open" from the context menu',
      'Confirm that you want to open the app',
      'The app will open without issues in future uses'
    ],
    
    androidNote: 'Unknown Sources',
    androidNoteDesc: 'To install the APK, you need to enable installation from unknown sources:',
    androidSteps: [
      'Go to Settings > Security',
      'Enable "Unknown sources"',
      'Download and install the APK',
      'You can disable this option afterwards'
    ],
    
    iosNote: 'TestFlight & Provisioning',
    iosNoteDesc: 'The iOS version is available through TestFlight:',
    iosSteps: [
      'Install the TestFlight app from App Store',
      'Click on the invitation link',
      'Accept the invitation in TestFlight',
      'Install and test the application'
    ],
    
    securityNote: 'Digital Signature & Verification',
    securityNoteDesc: 'All downloads are digitally signed and verified:',
    securitySteps: [
      'Windows installers are signed with EV certificate',
      'macOS apps are notarized by Apple',
      'Android APKs include v2 app signing',
      'Always verify SHA-256 checksums'
    ],
    
    historyTitle: 'Version History',
    historySubtitle: 'Latest updates and improvements',
    
    versionHistory: [
      {
        version: '1.2.0',
        date: 'January 15, 2024',
        changes: [
          'New project management interface',
          'HD progress photos support',
          'Enhanced report exports',
          'Bug fixes and performance improvements'
        ]
      },
      {
        version: '1.1.5',
        date: 'December 10, 2023',
        changes: [
          'Optimized cloud sync',
          'New report templates',
          'Parts database support',
          'Minor UI fixes'
        ]
      },
      {
        version: '1.1.0',
        date: 'November 5, 2023',
        changes: [
          'Multi-platform release',
          'Cross-device synchronization',
          'Dark mode',
          'Multi-language support'
        ]
      }
    ],
    
    viewFullChangelog: 'View full changelog',
    
    footerTagline: 'Professional management for classic Mercedes-Benz restorations',
    footerSupport: 'Support',
    footerEmail: 'Email',
    footerPrivacy: 'Privacy',
    footerTerms: 'Terms',
    footerCopyright: '© 2024 Performing in Vintage Classic. All rights reserved.',
    
    installGuide: 'Complete Installation Guide'
  },
  
  fr: {
    languageLabel: 'Langue',
    themeToggle: 'Changer de thème',
    
    heroTitle: 'P&VC Restoration',
    heroSubtitle: 'Gestion Professionnelle de Restauration',
    heroTagline: 'Mercedes-Benz Classiques',
    heroDescription: 'La solution ultime pour gérer vos projets de restauration de véhicules Mercedes-Benz classiques. Disponible sur toutes les plateformes.',
    downloadNow: 'Télécharger',
    viewReleases: 'Voir les versions',
    
    downloadTitle: 'Téléchargements par Plateforme',
    downloadSubtitle: 'Choisissez votre système d\'exploitation et commencez à gérer vos restaurations',
    
    windows: 'Windows',
    windowsDesc: 'Installateur pour Windows 10/11',
    macos: 'macOS',
    macosDesc: 'Image disque pour Mac',
    linux: 'Linux',
    linuxDesc: 'AppImage et paquets DEB',
    android: 'Android',
    androidDesc: 'APK pour appareils Android',
    ios: 'iOS',
    iosDesc: 'TestFlight pour iPhone/iPad',
    
    downloadButton: 'Télécharger',
    downloadDeb: 'Télécharger .deb',
    joinTestFlight: 'Rejoindre TestFlight',
    version: 'Version',
    updated: 'Mis à jour',
    size: 'Taille',
    requirements: 'Exigences',
    
    installTitle: 'Méthodes d\'Installation',
    installSubtitle: 'Choisissez la méthode qui convient le mieux à vos besoins',
    
    standardInstall: 'Installation Standard',
    standardInstallDesc: 'Installation complète avec intégration système et mises à jour automatiques.',
    standardSteps: [
      'Téléchargez l\'installateur pour votre plateforme',
      'Exécutez le fichier téléchargé',
      'Suivez l\'assistant d\'installation',
      'Lancez l\'application depuis votre menu'
    ],
    
    portableInstall: 'Installation Portable',
    portableInstallDesc: 'Exécutez l\'application sans installation (Windows/Linux AppImage uniquement).',
    portableSteps: [
      'Téléchargez la version portable ou AppImage',
      'Extrayez le fichier (si nécessaire)',
      'Exécutez le fichier exécutable directement',
      'Aucune permission administrateur requise'
    ],
    
    verifyInstall: 'Vérifier l\'Installation',
    verifyInstallDesc: 'Assurez l\'intégrité de votre téléchargement en vérifiant le checksum SHA-256.',
    verifySteps: [
      'Téléchargez le fichier pour votre plateforme',
      'Calculez le hash SHA-256 du fichier',
      'Comparez avec le checksum publié ci-dessous',
      'S\'ils correspondent, le téléchargement est authentique'
    ],
    
    checksumTitle: 'Checksums SHA-256',
    copyChecksum: 'Copier',
    copiedChecksum: 'Copié!',
    
    notesTitle: 'Notes Importantes',
    notesSubtitle: 'Veuillez lire ces instructions spécifiques à chaque plateforme',
    
    macosNote: 'macOS Gatekeeper',
    macosNoteDesc: 'Lors de la première ouverture, macOS peut afficher un avertissement de sécurité:',
    macosSteps: [
      'Clic droit sur l\'application',
      'Sélectionnez "Ouvrir" dans le menu contextuel',
      'Confirmez que vous souhaitez ouvrir l\'app',
      'L\'app s\'ouvrira sans problème par la suite'
    ],
    
    androidNote: 'Sources Inconnues',
    androidNoteDesc: 'Pour installer l\'APK, vous devez activer l\'installation depuis des sources inconnues:',
    androidSteps: [
      'Allez dans Paramètres > Sécurité',
      'Activez "Sources inconnues"',
      'Téléchargez et installez l\'APK',
      'Vous pouvez désactiver cette option après'
    ],
    
    iosNote: 'TestFlight & Provisioning',
    iosNoteDesc: 'La version iOS est disponible via TestFlight:',
    iosSteps: [
      'Installez l\'application TestFlight depuis l\'App Store',
      'Cliquez sur le lien d\'invitation',
      'Acceptez l\'invitation dans TestFlight',
      'Installez et testez l\'application'
    ],
    
    securityNote: 'Signature Numérique & Vérification',
    securityNoteDesc: 'Tous les téléchargements sont signés numériquement et vérifiés:',
    securitySteps: [
      'Les installateurs Windows sont signés avec certificat EV',
      'Les apps macOS sont notarisées par Apple',
      'Les APKs Android incluent la signature v2',
      'Vérifiez toujours les checksums SHA-256'
    ],
    
    historyTitle: 'Historique des Versions',
    historySubtitle: 'Dernières mises à jour et améliorations',
    
    versionHistory: [
      {
        version: '1.2.0',
        date: '15 janvier 2024',
        changes: [
          'Nouvelle interface de gestion de projets',
          'Support photos de progrès HD',
          'Exportations de rapports améliorées',
          'Corrections de bugs et améliorations'
        ]
      },
      {
        version: '1.1.5',
        date: '10 décembre 2023',
        changes: [
          'Synchronisation cloud optimisée',
          'Nouveaux modèles de rapports',
          'Support base de données de pièces',
          'Corrections mineures d\'interface'
        ]
      },
      {
        version: '1.1.0',
        date: '5 novembre 2023',
        changes: [
          'Lancement multi-plateforme',
          'Synchronisation entre appareils',
          'Mode sombre',
          'Support multi-langues'
        ]
      }
    ],
    
    viewFullChangelog: 'Voir l\'historique complet',
    
    footerTagline: 'Gestion professionnelle pour restaurations Mercedes-Benz classiques',
    footerSupport: 'Support',
    footerEmail: 'Email',
    footerPrivacy: 'Confidentialité',
    footerTerms: 'Conditions',
    footerCopyright: '© 2024 Performing in Vintage Classic. Tous droits réservés.',
    
    installGuide: 'Guide d\'Installation Complet'
  },
  
  de: {
    languageLabel: 'Sprache',
    themeToggle: 'Thema wechseln',
    
    heroTitle: 'P&VC Restoration',
    heroSubtitle: 'Professionelles Restaurierungsmanagement',
    heroTagline: 'Klassische Mercedes-Benz',
    heroDescription: 'Die ultimative Lösung zur Verwaltung von Restaurierungsprojekten für klassische Mercedes-Benz Fahrzeuge. Auf allen Plattformen verfügbar.',
    downloadNow: 'Jetzt Herunterladen',
    viewReleases: 'Versionen Anzeigen',
    
    downloadTitle: 'Plattform-Downloads',
    downloadSubtitle: 'Wählen Sie Ihr Betriebssystem und beginnen Sie mit der Verwaltung Ihrer Restaurierungen',
    
    windows: 'Windows',
    windowsDesc: 'Installer für Windows 10/11',
    macos: 'macOS',
    macosDesc: 'Disk-Image für Mac',
    linux: 'Linux',
    linuxDesc: 'AppImage und DEB-Pakete',
    android: 'Android',
    androidDesc: 'APK für Android-Geräte',
    ios: 'iOS',
    iosDesc: 'TestFlight für iPhone/iPad',
    
    downloadButton: 'Herunterladen',
    downloadDeb: '.deb Herunterladen',
    joinTestFlight: 'TestFlight Beitreten',
    version: 'Version',
    updated: 'Aktualisiert',
    size: 'Größe',
    requirements: 'Anforderungen',
    
    installTitle: 'Installationsmethoden',
    installSubtitle: 'Wählen Sie die Methode, die am besten zu Ihren Bedürfnissen passt',
    
    standardInstall: 'Standardinstallation',
    standardInstallDesc: 'Vollständige Installation mit Systemintegration und automatischen Updates.',
    standardSteps: [
      'Laden Sie den Installer für Ihre Plattform herunter',
      'Führen Sie die heruntergeladene Datei aus',
      'Folgen Sie dem Installationsassistenten',
      'Starten Sie die App aus Ihrem Anwendungsmenü'
    ],
    
    portableInstall: 'Portable Installation',
    portableInstallDesc: 'Führen Sie die Anwendung ohne Installation aus (nur Windows/Linux AppImage).',
    portableSteps: [
      'Laden Sie die portable Version oder AppImage herunter',
      'Entpacken Sie die Datei (falls erforderlich)',
      'Führen Sie die ausführbare Datei direkt aus',
      'Keine Administratorrechte erforderlich'
    ],
    
    verifyInstall: 'Installation Überprüfen',
    verifyInstallDesc: 'Stellen Sie die Integrität Ihres Downloads sicher, indem Sie die SHA-256-Prüfsumme überprüfen.',
    verifySteps: [
      'Laden Sie die Datei für Ihre Plattform herunter',
      'Berechnen Sie den SHA-256-Hash der Datei',
      'Vergleichen Sie mit der unten veröffentlichten Prüfsumme',
      'Wenn sie übereinstimmen, ist der Download authentisch'
    ],
    
    checksumTitle: 'SHA-256 Prüfsummen',
    copyChecksum: 'Kopieren',
    copiedChecksum: 'Kopiert!',
    
    notesTitle: 'Wichtige Hinweise',
    notesSubtitle: 'Bitte lesen Sie diese plattformspezifischen Anweisungen',
    
    macosNote: 'macOS Gatekeeper',
    macosNoteDesc: 'Beim ersten Öffnen kann macOS eine Sicherheitswarnung anzeigen:',
    macosSteps: [
      'Rechtsklick auf die Anwendung',
      'Wählen Sie "Öffnen" aus dem Kontextmenü',
      'Bestätigen Sie, dass Sie die App öffnen möchten',
      'Die App wird bei zukünftiger Nutzung problemlos geöffnet'
    ],
    
    androidNote: 'Unbekannte Quellen',
    androidNoteDesc: 'Um die APK zu installieren, müssen Sie die Installation aus unbekannten Quellen aktivieren:',
    androidSteps: [
      'Gehen Sie zu Einstellungen > Sicherheit',
      'Aktivieren Sie "Unbekannte Quellen"',
      'Laden Sie die APK herunter und installieren Sie sie',
      'Sie können diese Option danach deaktivieren'
    ],
    
    iosNote: 'TestFlight & Provisioning',
    iosNoteDesc: 'Die iOS-Version ist über TestFlight verfügbar:',
    iosSteps: [
      'Installieren Sie die TestFlight-App aus dem App Store',
      'Klicken Sie auf den Einladungslink',
      'Akzeptieren Sie die Einladung in TestFlight',
      'Installieren und testen Sie die Anwendung'
    ],
    
    securityNote: 'Digitale Signatur & Überprüfung',
    securityNoteDesc: 'Alle Downloads sind digital signiert und überprüft:',
    securitySteps: [
      'Windows-Installer sind mit EV-Zertifikat signiert',
      'macOS-Apps sind von Apple notarisiert',
      'Android-APKs enthalten v2-App-Signierung',
      'Überprüfen Sie immer die SHA-256-Prüfsummen'
    ],
    
    historyTitle: 'Versionsverlauf',
    historySubtitle: 'Neueste Updates und Verbesserungen',
    
    versionHistory: [
      {
        version: '1.2.0',
        date: '15. Januar 2024',
        changes: [
          'Neue Projektverwaltungsoberfläche',
          'HD-Fortschrittsfotos-Unterstützung',
          'Verbesserte Berichtsexporte',
          'Fehlerbehebungen und Leistungsverbesserungen'
        ]
      },
      {
        version: '1.1.5',
        date: '10. Dezember 2023',
        changes: [
          'Optimierte Cloud-Synchronisierung',
          'Neue Berichtsvorlagen',
          'Teile-Datenbank-Unterstützung',
          'Kleinere UI-Korrekturen'
        ]
      },
      {
        version: '1.1.0',
        date: '5. November 2023',
        changes: [
          'Multi-Plattform-Veröffentlichung',
          'Geräteübergreifende Synchronisierung',
          'Dunkelmodus',
          'Mehrsprachige Unterstützung'
        ]
      }
    ],
    
    viewFullChangelog: 'Vollständigen Änderungsverlauf anzeigen',
    
    footerTagline: 'Professionelles Management für klassische Mercedes-Benz Restaurierungen',
    footerSupport: 'Support',
    footerEmail: 'E-Mail',
    footerPrivacy: 'Datenschutz',
    footerTerms: 'Bedingungen',
    footerCopyright: '© 2024 Performing in Vintage Classic. Alle Rechte vorbehalten.',
    
    installGuide: 'Vollständige Installationsanleitung'
  },
  
  it: {
    languageLabel: 'Lingua',
    themeToggle: 'Cambia tema',
    
    heroTitle: 'P&VC Restoration',
    heroSubtitle: 'Gestione Professionale del Restauro',
    heroTagline: 'Mercedes-Benz Classiche',
    heroDescription: 'La soluzione definitiva per gestire progetti di restauro di veicoli Mercedes-Benz classici. Disponibile su tutte le piattaforme.',
    downloadNow: 'Scarica Ora',
    viewReleases: 'Vedi Versioni',
    
    downloadTitle: 'Download per Piattaforma',
    downloadSubtitle: 'Scegli il tuo sistema operativo e inizia a gestire i tuoi restauri',
    
    windows: 'Windows',
    windowsDesc: 'Installer per Windows 10/11',
    macos: 'macOS',
    macosDesc: 'Immagine disco per Mac',
    linux: 'Linux',
    linuxDesc: 'AppImage e pacchetti DEB',
    android: 'Android',
    androidDesc: 'APK per dispositivi Android',
    ios: 'iOS',
    iosDesc: 'TestFlight per iPhone/iPad',
    
    downloadButton: 'Scarica',
    downloadDeb: 'Scarica .deb',
    joinTestFlight: 'Unisciti a TestFlight',
    version: 'Versione',
    updated: 'Aggiornato',
    size: 'Dimensione',
    requirements: 'Requisiti',
    
    installTitle: 'Metodi di Installazione',
    installSubtitle: 'Scegli il metodo che meglio si adatta alle tue esigenze',
    
    standardInstall: 'Installazione Standard',
    standardInstallDesc: 'Installazione completa con integrazione di sistema e aggiornamenti automatici.',
    standardSteps: [
      'Scarica l\'installer per la tua piattaforma',
      'Esegui il file scaricato',
      'Segui la procedura guidata di installazione',
      'Avvia l\'app dal menu applicazioni'
    ],
    
    portableInstall: 'Installazione Portatile',
    portableInstallDesc: 'Esegui l\'applicazione senza installazione (solo Windows/Linux AppImage).',
    portableSteps: [
      'Scarica la versione portatile o AppImage',
      'Estrai il file (se necessario)',
      'Esegui il file eseguibile direttamente',
      'Non sono richiesti permessi di amministratore'
    ],
    
    verifyInstall: 'Verifica Installazione',
    verifyInstallDesc: 'Assicura l\'integrità del download verificando il checksum SHA-256.',
    verifySteps: [
      'Scarica il file per la tua piattaforma',
      'Calcola l\'hash SHA-256 del file',
      'Confronta con il checksum pubblicato sotto',
      'Se corrispondono, il download è autentico'
    ],
    
    checksumTitle: 'Checksum SHA-256',
    copyChecksum: 'Copia',
    copiedChecksum: 'Copiato!',
    
    notesTitle: 'Note Importanti',
    notesSubtitle: 'Si prega di leggere queste istruzioni specifiche per piattaforma',
    
    macosNote: 'macOS Gatekeeper',
    macosNoteDesc: 'All\'apertura per la prima volta, macOS potrebbe mostrare un avviso di sicurezza:',
    macosSteps: [
      'Fai clic destro sull\'applicazione',
      'Seleziona "Apri" dal menu contestuale',
      'Conferma di voler aprire l\'app',
      'L\'app si aprirà senza problemi negli usi futuri'
    ],
    
    androidNote: 'Origini Sconosciute',
    androidNoteDesc: 'Per installare l\'APK, è necessario abilitare l\'installazione da origini sconosciute:',
    androidSteps: [
      'Vai su Impostazioni > Sicurezza',
      'Abilita "Origini sconosciute"',
      'Scarica e installa l\'APK',
      'Puoi disabilitare questa opzione dopo'
    ],
    
    iosNote: 'TestFlight & Provisioning',
    iosNoteDesc: 'La versione iOS è disponibile tramite TestFlight:',
    iosSteps: [
      'Installa l\'app TestFlight dall\'App Store',
      'Fai clic sul link di invito',
      'Accetta l\'invito in TestFlight',
      'Installa e prova l\'applicazione'
    ],
    
    securityNote: 'Firma Digitale & Verifica',
    securityNoteDesc: 'Tutti i download sono firmati digitalmente e verificati:',
    securitySteps: [
      'Gli installer Windows sono firmati con certificato EV',
      'Le app macOS sono notarizzate da Apple',
      'Gli APK Android includono la firma app v2',
      'Verifica sempre i checksum SHA-256'
    ],
    
    historyTitle: 'Cronologia Versioni',
    historySubtitle: 'Ultimi aggiornamenti e miglioramenti',
    
    versionHistory: [
      {
        version: '1.2.0',
        date: '15 gennaio 2024',
        changes: [
          'Nuova interfaccia di gestione progetti',
          'Supporto foto di progresso HD',
          'Esportazione report migliorata',
          'Correzioni bug e miglioramenti prestazioni'
        ]
      },
      {
        version: '1.1.5',
        date: '10 dicembre 2023',
        changes: [
          'Sincronizzazione cloud ottimizzata',
          'Nuovi template per report',
          'Supporto database parti',
          'Correzioni minori UI'
        ]
      },
      {
        version: '1.1.0',
        date: '5 novembre 2023',
        changes: [
          'Rilascio multi-piattaforma',
          'Sincronizzazione tra dispositivi',
          'Modalità scura',
          'Supporto multi-lingua'
        ]
      }
    ],
    
    viewFullChangelog: 'Vedi cronologia completa',
    
    footerTagline: 'Gestione professionale per restauri Mercedes-Benz classiche',
    footerSupport: 'Supporto',
    footerEmail: 'Email',
    footerPrivacy: 'Privacy',
    footerTerms: 'Termini',
    footerCopyright: '© 2024 Performing in Vintage Classic. Tutti i diritti riservati.',
    
    installGuide: 'Guida Completa all\'Installazione'
  }
};

export default function LandingPage({ theme, toggleTheme, language, changeLanguage }) {
  const [copiedChecksum, setCopiedChecksum] = useState(null);
  const t = TRANSLATIONS[language];

  const copyChecksum = (platform, checksum) => {
    navigator.clipboard.writeText(checksum);
    setCopiedChecksum(platform);
    setTimeout(() => setCopiedChecksum(null), 2000);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">P&VC</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-foreground">P&VC Restoration</h1>
                <p className="text-xs text-muted-foreground">Performing in Vintage Classic</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
                {['es', 'en', 'fr', 'de', 'it'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                      language === lang
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-accent"
                aria-label={t.themeToggle}
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary)/0.05)] via-background to-[hsl(var(--accent)/0.05)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <Badge variant="secondary" className="mb-6 text-xs px-4 py-1.5">
              {t.heroTagline}
            </Badge>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
              {t.heroTitle}
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-4 font-light">
              {t.heroSubtitle}
            </p>
            
            <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {t.heroDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all"
                onClick={() => scrollToSection('downloads')}
              >
                <Download className="mr-2 h-5 w-5" />
                {t.downloadNow}
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary"
                onClick={() => scrollToSection('versions')}
              >
                <Clock className="mr-2 h-5 w-5" />
                {t.viewReleases}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>

      {/* Downloads Section */}
      <section id="downloads" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.downloadTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.downloadSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Windows */}
            <Card className="group hover:shadow-lg transition-all border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                    <Monitor className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary">{CONFIG.downloads.windows.version}</Badge>
                </div>
                <CardTitle>{t.windows}</CardTitle>
                <CardDescription>{t.windowsDesc}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col">
                <div className="space-y-2 mb-4 text-sm text-muted-foreground flex-grow">
                  <div className="flex justify-between">
                    <span>{t.updated}:</span>
                    <span>{CONFIG.downloads.windows.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.size}:</span>
                    <span>{CONFIG.downloads.windows.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.requirements}:</span>
                    <span className="text-right">{CONFIG.downloads.windows.requirements}</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-auto bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => window.open(CONFIG.downloads.windows.url, '_blank')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t.downloadButton}
                </Button>
              </CardContent>
            </Card>

            {/* macOS */}
            <Card className="group hover:shadow-lg transition-all border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                    <Apple className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary">{CONFIG.downloads.macos.version}</Badge>
                </div>
                <CardTitle>{t.macos}</CardTitle>
                <CardDescription>{t.macosDesc}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col">
                <div className="space-y-2 mb-4 text-sm text-muted-foreground flex-grow">
                  <div className="flex justify-between">
                    <span>{t.updated}:</span>
                    <span>{CONFIG.downloads.macos.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.size}:</span>
                    <span>{CONFIG.downloads.macos.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.requirements}:</span>
                    <span className="text-right">{CONFIG.downloads.macos.requirements}</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-auto bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => window.open(CONFIG.downloads.macos.url, '_blank')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t.downloadButton}
                </Button>
              </CardContent>
            </Card>

            {/* Linux */}
            <Card className="group hover:shadow-lg transition-all border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                    <Package className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary">{CONFIG.downloads.linux.version}</Badge>
                </div>
                <CardTitle>{t.linux}</CardTitle>
                <CardDescription>{t.linuxDesc}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col">
                <div className="space-y-2 mb-4 text-sm text-muted-foreground flex-grow">
                  <div className="flex justify-between">
                    <span>{t.updated}:</span>
                    <span>{CONFIG.downloads.linux.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.size}:</span>
                    <span>{CONFIG.downloads.linux.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.requirements}:</span>
                    <span className="text-right text-xs">{CONFIG.downloads.linux.requirements}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-auto">
                  <Button
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => window.open(CONFIG.downloads.linux.appimage, '_blank')}
                  >
                    <Download className="mr-1 h-4 w-4" />
                    AppImage
                  </Button>
                  <Button
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => window.open(CONFIG.downloads.linux.deb, '_blank')}
                  >
                    <Download className="mr-1 h-4 w-4" />
                    .deb
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Android */}
            <Card className="group hover:shadow-lg transition-all border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary">{CONFIG.downloads.android.version}</Badge>
                </div>
                <CardTitle>{t.android}</CardTitle>
                <CardDescription>{t.androidDesc}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col">
                <div className="space-y-2 mb-4 text-sm text-muted-foreground flex-grow">
                  <div className="flex justify-between">
                    <span>{t.updated}:</span>
                    <span>{CONFIG.downloads.android.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.size}:</span>
                    <span>{CONFIG.downloads.android.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.requirements}:</span>
                    <span className="text-right">{CONFIG.downloads.android.requirements}</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-auto bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => window.open(CONFIG.downloads.android.url, '_blank')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t.downloadButton}
                </Button>
              </CardContent>
            </Card>

            {/* iOS */}
            <Card className="group hover:shadow-lg transition-all border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                    <Apple className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary">{CONFIG.downloads.ios.version}</Badge>
                </div>
                <CardTitle>{t.ios}</CardTitle>
                <CardDescription>{t.iosDesc}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col">
                <div className="space-y-2 mb-4 text-sm text-muted-foreground flex-grow">
                  <div className="flex justify-between">
                    <span>{t.updated}:</span>
                    <span>{CONFIG.downloads.ios.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.size}:</span>
                    <span>{CONFIG.downloads.ios.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.requirements}:</span>
                    <span className="text-right">{CONFIG.downloads.ios.requirements}</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-auto bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => window.open(CONFIG.downloads.ios.testflight, '_blank')}
                >
                  <Apple className="mr-2 h-4 w-4" />
                  {t.joinTestFlight}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Installation Methods */}
      <section id="installation" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.installTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.installSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {/* Standard Installation */}
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>{t.standardInstall}</CardTitle>
                <CardDescription>{t.standardInstallDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {t.standardSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Portable Installation */}
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>{t.portableInstall}</CardTitle>
                <CardDescription>{t.portableInstallDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {t.portableSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Verify Installation */}
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>{t.verifyInstall}</CardTitle>
                <CardDescription>{t.verifyInstallDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {t.verifySteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Checksums */}
          <Card className="max-w-4xl mx-auto border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                {t.checksumTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(CONFIG.checksums).map(([platform, checksum]) => (
                  <div key={platform} className="flex items-center justify-between gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium mb-1 capitalize">
                        {platform.replace('_', ' ')}
                      </div>
                      <code className="text-xs text-muted-foreground font-mono break-all">
                        {checksum}
                      </code>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyChecksum(platform, checksum)}
                      className="flex-shrink-0"
                    >
                      {copiedChecksum === platform ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <span className="text-xs">{t.copyChecksum}</span>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Notes */}
      <section id="notes" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.notesTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.notesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* macOS Note */}
            <Card className="border-l-4 border-l-accent border-border bg-card">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Apple className="h-5 w-5 text-accent" />
                  <CardTitle className="text-xl">{t.macosNote}</CardTitle>
                </div>
                <CardDescription>{t.macosNoteDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {t.macosSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Android Note */}
            <Card className="border-l-4 border-l-accent border-border bg-card">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Smartphone className="h-5 w-5 text-accent" />
                  <CardTitle className="text-xl">{t.androidNote}</CardTitle>
                </div>
                <CardDescription>{t.androidNoteDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {t.androidSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* iOS Note */}
            <Card className="border-l-4 border-l-accent border-border bg-card">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Apple className="h-5 w-5 text-accent" />
                  <CardTitle className="text-xl">{t.iosNote}</CardTitle>
                </div>
                <CardDescription>{t.iosNoteDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {t.iosSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Security Note */}
            <Card className="border-l-4 border-l-accent border-border bg-card">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-5 w-5 text-accent" />
                  <CardTitle className="text-xl">{t.securityNote}</CardTitle>
                </div>
                <CardDescription>{t.securityNoteDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {t.securitySteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Version History */}
      <section id="versions" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.historyTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.historySubtitle}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {t.versionHistory.map((release, index) => (
              <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">Version {release.version}</CardTitle>
                      <CardDescription>{release.date}</CardDescription>
                    </div>
                    <Badge variant="secondary">{release.version}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {release.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{change}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              <Clock className="mr-2 h-4 w-4" />
              {t.viewFullChangelog}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-foreground">P&VC</span>
                </div>
                <div>
                  <h3 className="font-semibold">P&VC Restoration</h3>
                  <p className="text-xs text-muted-foreground">Performing in Vintage Classic</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {t.footerTagline}
              </p>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">{t.footerSupport}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href={`mailto:${CONFIG.support.email}`} className="text-muted-foreground hover:text-accent transition-colors">
                    {t.footerEmail}: {CONFIG.support.email}
                  </a>
                </li>
                <li>
                  <a href="#installation" className="text-muted-foreground hover:text-accent transition-colors">
                    {t.installGuide}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    {t.footerPrivacy}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    {t.footerTerms}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="text-center text-sm text-muted-foreground">
            {t.footerCopyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
