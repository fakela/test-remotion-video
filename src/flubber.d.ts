declare module "flubber" {
  interface InterpolateOptions {
    maxSegmentLength?: number;
    string?: boolean;
  }

  export function interpolate(
    fromShape: string,
    toShape: string,
    options?: InterpolateOptions
  ): (t: number) => string;

  export function toCircle(
    fromShape: string,
    x: number,
    y: number,
    r: number,
    options?: InterpolateOptions
  ): (t: number) => string;

  export function toRect(
    fromShape: string,
    x: number,
    y: number,
    w: number,
    h: number,
    options?: InterpolateOptions
  ): (t: number) => string;

  export function fromCircle(
    x: number,
    y: number,
    r: number,
    toShape: string,
    options?: InterpolateOptions
  ): (t: number) => string;

  export function fromRect(
    x: number,
    y: number,
    w: number,
    h: number,
    toShape: string,
    options?: InterpolateOptions
  ): (t: number) => string;
}
