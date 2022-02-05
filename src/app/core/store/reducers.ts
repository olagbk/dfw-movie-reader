import { createReducer, on } from '@ngrx/store';
import { Movie } from '../../movies/models/movie';
import { loadMoviesSuccess, loadMovieSuccess, saveScrollPosition } from './actions';
import { mergeDuplicates, replaceDuplicate } from './utils';

export interface MovieState {
  movies: Movie[] | null;
  currentPage: number | null;
  scrollPosition: number;
}

const initialState: MovieState = { movies: null, currentPage: null, scrollPosition: 0 };

export const movieReducer = createReducer(initialState,
  on(loadMovieSuccess, (state, { movie }) => ({
    ...state, movies: replaceDuplicate(state.movies, movie),
  })),
  on(loadMoviesSuccess, (state, { results, page }) => ({
    ...state,
    currentPage: page,
    movies: state.currentPage ? mergeDuplicates(state.movies, results) : results,
  })),
  on(saveScrollPosition, (state, { position } ) => ({ ...state, scrollPosition: position }))
);
