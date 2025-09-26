// Global type definitions for the AI app

declare global {
  interface Navigator {
    ml?: {
      createContext(options?: object): Promise<MLContext>;
    };
  }
}

export interface MLContext {
  [key: string]: unknown;
}

export {};