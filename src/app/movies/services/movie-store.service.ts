import { Store } from '@ngrx/store';
import {
  loadMovie,
  loadMovies,
  loadNextPage,
} from '../../core/store/actions';
import { Observable, tap } from 'rxjs';
import { selectCurrentPage, selectMovie, selectMovies } from '../../core/store/selectors';
import { Movie } from '../models/movie';
import { Injectable } from '@angular/core';
import { switchMapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieStoreService {
  constructor(private store: Store) {
  }

  public load(id: string): void {
    this.store.dispatch(loadMovie({ id }));
  }

  public loadAll(): void {
    this.store.dispatch(loadMovies());
  }

  public loadNextPage(): void {
    this.store.dispatch(loadNextPage());
  }

  public get(id: string): Observable<Movie | undefined> {
    return this.store.select(selectMovie, { id })
  }

  public getAll(): Observable<Movie[] | null> {
    return this.store.select(selectCurrentPage)
      .pipe(
        tap(page => !page && this.loadAll()),
        switchMapTo(this.store.select(selectMovies))
      );
  }
}
