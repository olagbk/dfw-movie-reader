import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TMDB_CONFIG, TmdbConfig } from '../../../api-config';
import { MovieHttpParamsService, MovieIndexParams } from './movie-http-params.service';
@Injectable({
  providedIn: 'root',
})
export class MovieHttpService {

  constructor(@Inject(TMDB_CONFIG) private config: TmdbConfig, private http: HttpClient, private paramsService: MovieHttpParamsService) {}

  public get(id: string): Observable<Record<string, any>> {
    return this.http.get(this.getUrl(id), {
      params: this.paramsService.getBaseParams(),
    });
  }

  public index(options: Partial<MovieIndexParams> = {}): Observable<Record<string, any>> {
    return this.http.get(this.indexUrl(), {
      params: this.paramsService.getIndexParams(options),
    });
  }

  private indexUrl(): string {
    return `${this.config.apiHost}/discover/movie`;
  }

  private getUrl(id: string): string {
    return `${this.config.apiHost}/movie/${id}`;
  }
}
