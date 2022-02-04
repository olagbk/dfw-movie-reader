import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Movie } from '../../models/movie';
import { TMDB_CONFIG, TmdbConfig } from '../../../api-config';
import { MovieHttpParamsService, MovieIndexParams } from './movie-http-params.service';
import { LoadMoviesSuccessPayload } from '../../../core/store/models/action-payload';
import { mapIndexResponse, mapMovieResponse } from './movie-response-mappers';

@Injectable({
  providedIn: 'root',
})
export class MovieHttpService {

  constructor(@Inject(TMDB_CONFIG) private config: TmdbConfig, private http: HttpClient, private paramsService: MovieHttpParamsService) {}

  public get(id: string): Observable<Movie> {
    return this.http.get(this.getUrl(id), {
      params: this.paramsService.getBaseParams(),
    }).pipe(map(mapMovieResponse));
  }

  public index(options: Partial<MovieIndexParams> = {}): Observable<LoadMoviesSuccessPayload> {
    return this.http.get(this.indexUrl(), {
      params: this.paramsService.getIndexParams(options),
    }).pipe(map(mapIndexResponse));
  }

  private indexUrl(): string {
    return `${this.config.apiHost}/discover/movie`;
  }

  private getUrl(id: string): string {
    return `${this.config.apiHost}/movie/${id}`;
  }
}
