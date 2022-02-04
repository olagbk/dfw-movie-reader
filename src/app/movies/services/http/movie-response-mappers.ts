import { Movie } from '../../models/movie';

export const mapMovieResponse = ({ id, title, overview, poster_path }: Record<string, any>): Movie => {
  return { id, title, overview, posterPath: poster_path };
}

export const mapIndexResponse = ({ results, page }: Record<string, any>): { results: Movie[]; page: number } => {
  return { page, results: results.map(mapMovieResponse.bind(this)) };
}
