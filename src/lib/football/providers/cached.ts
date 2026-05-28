import type { FootballProvider } from "../provider";
import type { League, StandingRow, Team, Player } from "../types";

interface CacheEntry {
  value: unknown;
  expiresAt: number;
}

export class CachedProvider implements FootballProvider {
  private cache = new Map<string, CacheEntry>();
  private inflight = new Map<string, Promise<unknown>>();

  constructor(
    private inner: FootballProvider,
    private ttlSeconds: number,
  ) {}

  // Coalesces in-flight requests for the same key
  private resolve<T>(key: string, fn: () => Promise<T>): Promise<T> {
    const entry = this.cache.get(key);
    if (entry && entry.expiresAt > Date.now()) {
      return Promise.resolve(entry.value as T);
    }

    const pending = this.inflight.get(key);
    if (pending) return pending as Promise<T>;

    const promise = fn()
      .then((value) => {
        this.cache.set(key, {
          value,
          expiresAt: Date.now() + this.ttlSeconds * 1000,
        });
        this.inflight.delete(key);
        return value;
      })
      .catch((err) => {
        this.inflight.delete(key);
        throw err;
      });

    this.inflight.set(key, promise);
    return promise;
  }

  getLeagues(): Promise<League[]> {
    return this.resolve("getLeagues", () => this.inner.getLeagues());
  }

  getLeague(id: string): Promise<League | null> {
    return this.resolve(`getLeague:${id}`, () => this.inner.getLeague(id));
  }

  getStandings(leagueId: string): Promise<StandingRow[]> {
    return this.resolve(`getStandings:${leagueId}`, () =>
      this.inner.getStandings(leagueId),
    );
  }

  getTeam(id: string): Promise<Team | null> {
    return this.resolve(`getTeam:${id}`, () => this.inner.getTeam(id));
  }

  getPlayer(id: string): Promise<Player | null> {
    return this.resolve(`getPlayer:${id}`, () => this.inner.getPlayer(id));
  }
}