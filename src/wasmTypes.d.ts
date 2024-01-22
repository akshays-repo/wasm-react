/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
    export interface Window {
      Go: any;
      wasmFibonacciSum: (n: number) => number;
    }
  }
  export {};