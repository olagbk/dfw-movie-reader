import { Movie } from '../movies/models/movie';

export const compareId = (first: string | number, second: string | number): boolean => +first === +second;

export const mergeDuplicates = (state: Movie[] | null, movies: Movie[]): Movie[] => state
  ? [...state, ...movies.filter(movie => !state.find(m => compareId(m.id, movie.id)))]
  : [...movies];

export const replaceDuplicate = (movies: Movie[] | null, data: Movie): Movie[] =>
  movies?.map(movie => compareId(movie.id, data.id) ? data : movie) || [data];
