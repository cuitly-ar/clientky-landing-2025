import { translations, type Language, type TranslationKey } from './translations';

function getLangFromPathname(pathname: string): Language | null {
  const segments = pathname.split('/').filter(Boolean);
  const maybeLang = segments[0]?.toLowerCase();
  if (maybeLang === 'en') return 'en';
  if (maybeLang === 'es') return 'es';
  return null;
}

export function getLanguage(url: URL): Language {
  const pathLang = getLangFromPathname(url.pathname);
  if (pathLang) return pathLang;

  const queryLang = url.searchParams.get('lang');
  if (queryLang === 'en') return 'en';

  return 'es';
}

export function t(lang: Language, key: TranslationKey): string {
  const langPack = translations[lang] ?? translations.es;
  return langPack[key] ?? translations.es[key] ?? '';
}

export function switchLanguage(currentLang: Language): Language {
  return currentLang === 'es' ? 'en' : 'es';
}



