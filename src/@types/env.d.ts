export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_NAME: string;
      PORT: number;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_NAME: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT: number;
      DATABASE_URL: string;
      TOKEN_KEY_SECRET: string;
      TOKEN_EXPIRES_IN: string;
    }
  }
}
