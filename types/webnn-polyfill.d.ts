declare module '@webmachinelearning/webnn-polyfill' {
  export interface MLContext {
    [key: string]: unknown;
  }

  export interface NavigatorML {
    ml?: {
      createContext(options?: object): Promise<MLContext>;
    };
  }

  export const navigator: NavigatorML;
}