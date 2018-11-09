declare module "matched" {
  interface Options {
    ignore: string;
    nocase: boolean;
  }

  export function sync(path: string, options: Options): string[];
}
