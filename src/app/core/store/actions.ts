import { createAction, props } from '@ngrx/store';
import {
  LoadMoviePayload,
  LoadMoviesSuccessPayload,
  LoadMovieSuccessPayload,
  SaveScrollPositionPayload,
} from './models/action-payload';

export const loadMovie = createAction(`Load movie`, props<LoadMoviePayload>());
export const loadMovieSuccess = createAction(`Load movie success`, props<LoadMovieSuccessPayload>());
export const loadMovieError = createAction(`Load movie error`);
export const loadMovies = createAction('Load movies');
export const loadMoviesSuccess = createAction('Load movies success', props<LoadMoviesSuccessPayload>());
export const loadMoviesError = createAction('Load movies error');
export const loadNextPage = createAction(`Load next page`);
export const saveScrollPosition = createAction('Save scroll position', props<SaveScrollPositionPayload>());
