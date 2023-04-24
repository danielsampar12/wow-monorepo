export function getMissingData(data: any): string {
  return Object.keys(data)
    .flatMap((key) => (!data[key] ? `${key}` : []))
    .join(', ');
}
