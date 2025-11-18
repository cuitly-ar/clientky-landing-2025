/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly POLAR_ACCESS_TOKEN?: string;
  readonly POLAR_SUCCESS_URL?: string;
  readonly POLAR_RETURN_URL?: string;
  readonly POLAR_STARTER_MONTHLY_PRICE_ID?: string;
  readonly POLAR_SERVER?: 'production' | 'sandbox';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}