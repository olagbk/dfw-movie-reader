import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { Movie } from '../../movies/models/movie';
import { loadMoviesSuccess, loadMovieSuccess } from './actions';
import { mergeDuplicates, replaceDuplicate } from '../utils';

export interface MovieState {
  movies: Movie[] | null;
  currentPage: number | null;
}

const initialState: MovieState = { movies: null, currentPage: null };

const reducer = createReducer(initialState,
  on(loadMovieSuccess, (state, { movie }) => ({
    ...state, movies: replaceDuplicate(state.movies, movie),
  })),
  on(loadMoviesSuccess, (state, { results, page }) => ({
    ...state,
    currentPage: page,
    movies: state.currentPage ? mergeDuplicates(state.movies, results) : results,
  })),
);

export const reducers: ActionReducerMap<unknown> = {
  movies: reducer,
};
