import { Movie } from '../../movies/models/movie';

export const compareId = (first: string | number, second: string | number): boolean => +first === +second;

export const mergeDuplicates = (state: Movie[] | null, movies: Movie[]): Movie[] => state
  ? [...state, ...movies.filter(movie => !state.find(m => compareId(m.id, movie.id)))]
  : movies;

export const replaceDuplicate = (movies: Movie[] | null, data: Movie): Movie[] =>
  movies?.map(movie => compareId(movie.id, data.id) ? data : movie) || [data];

export const mapMovieResponse = ({ id, title, overview, poster_path }: Record<string, any>): Movie => {
  return { id, title, overview, posterPath: poster_path };
}

export const mapIndexResponse = ({ results, page }: Record<string, any>): { results: Movie[]; page: number } => {
  return { page, results: results.map(mapMovieResponse.bind(this)) };
}
