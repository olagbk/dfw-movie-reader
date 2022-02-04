import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovieState } from './reducers';
import { Movie } from '../../movies/models/movie';
import { compareId } from '../utils';

export const selectMovieState = createFeatureSelector<MovieState>('movies');

export const selectMovies = createSelector(
  selectMovieState,
  state => state.movies || [],
);

export const selectMovie = createSelector(
  selectMovies,
  (state: Movie[], {id}: { id: string | number }) => state.find(movie => compareId(id, movie.id))
);

export const selectCurrentPage = createSelector(
  selectMovieState,
  state => state.currentPage,
);
