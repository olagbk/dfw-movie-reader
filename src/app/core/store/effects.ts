import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap, switchMapTo, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MovieState } from 'src/app/core/store/reducers';

import {
  loadMovie,
  loadMovieError,
  loadMovies,
  loadMoviesError,
  loadMoviesSuccess,
  loadMovieSuccess,
  loadNextPage,
} from './actions';
import { MovieHttpService } from '../../movies/services/http/movie-http.service';
import { selectCurrentPage } from './selectors';

@Injectable()
export class MovieEffects {

  private readonly loadMovies$ = createEffect(() => this.action$.pipe(
    ofType(loadMovies),
    switchMap(this.loadMovies.bind(this)),
  ));

  private readonly loadMovie$ = createEffect(() => this.action$.pipe(
    ofType(loadMovie),
    switchMap(({ id }) => this.loadMovie(id)),
  ));

  private readonly loadNextPage$ = createEffect(() => this.action$.pipe(
    ofType(loadNextPage),
    switchMapTo(this.loadNextPage()),
  ));

  constructor(private action$: Actions,
              private store: Store<MovieState>,
              private service: MovieHttpService) {
  }

  private loadMovies(): Observable<Action> {
    return this.service.index().pipe(
      map(({ results, page }) => loadMoviesSuccess({ results, page })),
      catchError(() => of(loadMoviesError())),
    );
  }

  private loadMovie(id: string): Observable<Action> {
    return this.service.get(id).pipe(
      map(movie => loadMovieSuccess({ movie })),
      catchError(() => of(loadMovieError())),
    );
  }

  private loadNextPage(): Observable<Action> {
    return this.store.pipe(
      select(selectCurrentPage),
      filter(Boolean),
      take(1),
      switchMap(page => this.service.index({ page: page + 1 })),
      map(loadMoviesSuccess),
      catchError(() => of(loadMoviesError())),
    );
  }
}
