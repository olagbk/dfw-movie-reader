import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerRequestAction } from '@ngrx/router-store';
import { catchError, filter, map, switchMap, switchMapTo, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MovieState } from 'src/app/core/store/reducers';
import { MovieHttpService } from '../../movies/services/http/movie-http.service';
import { ScrollPositionService } from '../../shared/scroll-position.service';
import { paths } from '../../app-routing.module';
import { selectCurrentPage } from './selectors';
import { mapIndexResponse, mapMovieResponse } from './utils';
import {
  loadMovie,
  loadMovieError,
  loadMovies,
  loadMoviesError,
  loadMoviesSuccess,
  loadMovieSuccess,
  loadNextPage,
  saveScrollPosition,
} from './actions';

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

  private readonly saveScrollPosition$ = createEffect(() => this.action$.pipe(
    ofType(routerRequestAction),
    filter(({ payload }) => payload.routerState.url === `/${paths.movies.root}`),
    map(() => saveScrollPosition({
      position: this.scrollPositionService.getVerticalScrollPosition(),
    })),
  ));

  constructor(private action$: Actions,
              private store: Store<MovieState>,
              private service: MovieHttpService,
              private scrollPositionService: ScrollPositionService) {
  }

  private loadMovies(): Observable<Action> {
    return this.service.index().pipe(
      map(mapIndexResponse),
      map(({ results, page }) => loadMoviesSuccess({ results, page })),
      catchError(() => of(loadMoviesError())),
    );
  }

  private loadMovie(id: string): Observable<Action> {
    return this.service.get(id).pipe(
      map(mapMovieResponse),
      map(movie => loadMovieSuccess({ movie })),
      catchError(() => of(loadMovieError())),
    );
  }

  private loadNextPage(): Observable<Action> {
    return this.getCurrentPage().pipe(
      switchMap(page => this.service.index({ page: page + 1 })),
      map(mapIndexResponse),
      map(loadMoviesSuccess),
      catchError(() => of(loadMoviesError())),
    );
  }

  private getCurrentPage(): Observable<number> {
    return this.store.pipe(
      select(selectCurrentPage),
      filter(Boolean),
      take(1),
    );
  }
}
