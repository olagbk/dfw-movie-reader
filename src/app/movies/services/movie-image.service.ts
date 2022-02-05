import { Inject, Injectable } from '@angular/core';
import { TMDB_CONFIG, TmdbConfig } from '../../api-config';
import { MovieImageSize } from '../models/movie-image-size';

@Injectable({
  providedIn: 'root',
})
export class MovieImageService {
  private readonly fallbackImagePath = 'assets/image-not-found.png';

  constructor(@Inject(TMDB_CONFIG) private config: TmdbConfig) {}

  public getUrl(imagePath: string | null | undefined, imageSize: MovieImageSize): string {
    return imagePath ? `${this.config.imageHost}/${imageSize}/${imagePath}` : this.fallbackImagePath;
  }
}

