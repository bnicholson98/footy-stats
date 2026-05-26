export type { FootballProvider } from "./provider";
export { ProviderError } from "./provider";
export * from "./types";

import type { FootballProvider } from "./provider";
import { MockProvider } from "./providers/mock";

// Singleton — real providers will benefit from reusing connections
let cached: FootballProvider | null = null;

export function getProvider(): FootballProvider {
  if (cached) return cached;

  const name = process.env.FOOTBALL_PROVIDER ?? "mock";

  switch (name) {
    case "mock":
      cached = new MockProvider();
      return cached;
    default:
      throw new Error(`Unknown football provider: "${name}"`);
  }
}