import { Component } from '@angular/core';
import { MovieStoreService } from '../../services/movie-store.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  public movies$ = this.service.getAll();

  constructor(private service: MovieStoreService) {}

  public loadNextPage(): void {
    this.service.loadNextPage();
  }
}
