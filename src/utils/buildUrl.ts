export function buildUrl(path: string): string {
  return process.env.BASE_PATH || "" + path;
}
