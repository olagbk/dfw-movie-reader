import { InjectionToken } from '@angular/core';

export const TMDB_CONFIG = new InjectionToken<TmdbConfig>('TMDB_CONFIG');

export interface TmdbConfig {
  imageHost: string;
  apiHost: string;
  apiKey: string;
}
