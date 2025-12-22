import type { Language } from './translations';

export function getLangFromUrl(url: URL): Language {
  const pathname = url.pathname;
  if (pathname.startsWith('/es')) {
    return 'es';
  }
  return 'en';
}

export function getLocalizedPath(path: string, lang: Language): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // For English (default), use root path
  if (lang === 'en') {
    return cleanPath ? `/${cleanPath}` : '/';
  }
  
  // For Spanish, prefix with /es
  return cleanPath ? `/es/${cleanPath}` : '/es';
}

export function getAlternateLanguage(currentLang: Language): Language {
  return currentLang === 'en' ? 'es' : 'en';
}

export function getLanguageName(lang: Language): string {
  const names: Record<Language, string> = {
    en: 'English',
    es: 'Español',
  };
  return names[lang];
}

export function getLanguageFlag(lang: Language): string {
  const flags: Record<Language, string> = {
    en: '🇺🇸',
    es: '🇪🇸',
  };
  return flags[lang];
}


