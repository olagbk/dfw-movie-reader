import { Component, Input } from '@angular/core';
import { MovieImageService } from '../../services/movie-image.service';
import { Movie } from '../../models/movie';
import { MovieImageSize } from '../../models/movie-image-size';

@Component({
  selector: 'app-movie-list-card',
  templateUrl: './movie-list-card.component.html',
  styleUrls: ['./movie-list-card.component.scss'],
})
export class MovieListCardComponent {
  @Input()
  public set movie(movie: Movie | undefined) {
    this._movie = movie;
    this.imageUrl = this.getImageUrl(movie);
  }

  public get movie(): Movie | undefined {
    return this._movie;
  }

  public imageUrl: string | null = null;

  private _movie: Movie | undefined;

  constructor(private imageService: MovieImageService) {}

  private getImageUrl(movie: Movie | undefined): string {
    return `url(${this.imageService.getUrl(movie?.posterPath, MovieImageSize.LIST)})`;
  }

}
