export type { FootballProvider } from "./provider";
export { ProviderError } from "./provider";
export * from "./types";

import type { FootballProvider } from "./provider";
import { MockProvider } from "./providers/mock";
import { SofascoreProvider } from "./providers/sofascore";
import { CachedProvider } from "./providers/cached";

let cached: FootballProvider | null = null;

export function getProvider(): FootballProvider {
  if (cached) return cached;

  const name = process.env.FOOTBALL_PROVIDER ?? "mock";

  switch (name) {
    case "mock":
      cached = new MockProvider();
      return cached;
    case "sofascore":
      // 5-minute TTL; protects the 500 req/month budget
      cached = new CachedProvider(new SofascoreProvider(), 300);
      return cached;
    default:
      throw new Error(`Unknown football provider: "${name}"`);
  }
}