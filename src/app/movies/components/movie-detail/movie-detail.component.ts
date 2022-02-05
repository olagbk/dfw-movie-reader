import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Movie } from '../../models/movie';
import { MovieImageSize } from '../../models/movie-image-size';
import { MovieImageService } from '../../services/movie-image.service';
import { MovieStoreService } from '../../services/movie-store.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent {
  public readonly movie$ = this.getMovie();
  public readonly imageUrl$ = this.getImageUrl();

  constructor(private route: ActivatedRoute, private service: MovieStoreService, private imageService: MovieImageService) {}

  private getMovie(): Observable<Movie | undefined> {
    return this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(Boolean),
      tap(id => this.service.load(id)),
      switchMap(id => this.service.get(id)),
      shareReplay()
    );
  }

  private getImageUrl(): Observable<string> {
    return this.movie$.pipe(
      map(movie => movie?.posterPath),
      map(posterPath => this.imageService.getUrl(posterPath, MovieImageSize.DETAIL)),
    );
  }

}
