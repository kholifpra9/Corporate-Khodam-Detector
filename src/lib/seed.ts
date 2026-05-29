export function generateSeed(name: string, roleIndex: number): number {
  let hash = 5381;

  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) + hash) + name.charCodeAt(i);
    hash = hash & hash;
  }

  hash = ((hash << 5) + hash) + roleIndex * 1337;
  hash = hash & hash;

  return Math.abs(hash);
}
