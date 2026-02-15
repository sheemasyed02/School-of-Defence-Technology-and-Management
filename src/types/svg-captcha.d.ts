declare module 'svg-captcha' {
  export interface Config {
    size?: number;
    ignoreChars?: string;
    noise?: number;
    color?: boolean;
    background?: string;
    width?: number;
    height?: number;
    fontSize?: number;
    charPreset?: string;
  }
  export interface CaptchaObj {
    text: string;
    data: string;
  }
  export function create(config?: Config): CaptchaObj;
  export function createMathExpr(config?: Config): CaptchaObj;
  const captcha: {
    create: typeof create;
    createMathExpr: typeof createMathExpr;
  };
  export default captcha;
}
