import { Movie } from '../../../movies/models/movie';

export interface LoadMoviePayload {
  id: string;
}

export interface LoadMovieSuccessPayload {
  movie: Movie;
}

export interface LoadMoviesSuccessPayload {
  results: Movie[];
  page: number,
}

export interface SaveScrollPositionPayload {
  position: number;
}
