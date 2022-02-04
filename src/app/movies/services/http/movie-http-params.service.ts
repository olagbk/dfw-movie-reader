import { Inject, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TMDB_CONFIG, TmdbConfig } from '../../../api-config';

export interface MovieIndexParams {
  'api_key': string;
  'sort_by': string;
  'release_date.lte': string;
  'page': number;
}

const defaultIndexParams = (): Partial<MovieIndexParams> => ({
  'page': 1,
  'sort_by': 'release_date.desc',
  'release_date.lte': new Date().toISOString()
})

@Injectable({
  providedIn: 'root'
})
export class MovieHttpParamsService {

  constructor(@Inject(TMDB_CONFIG) private config: TmdbConfig) {}

  public getBaseParams(): HttpParams {
    return new HttpParams().set('api_key', this.config.apiKey);
  }

  public getIndexParams(options: Partial<MovieIndexParams> = {}): HttpParams {
    return Object.entries({ ...defaultIndexParams(), ...options }).reduce(
      (params, [key, value]) => params.set(key, value),
      this.getBaseParams()
    );
  }

}
