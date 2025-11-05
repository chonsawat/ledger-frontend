/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_TITLE: string;
  readonly VITE_IS_DEVELOP: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

