import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TMDB_CONFIG, TmdbConfig } from '../api-config';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { RouterModule } from '@angular/router';
import { MovieListCardComponent } from './components/movie-list-card/movie-list-card.component';



@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailComponent,
    MovieListCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
  ]
})
export class MoviesModule {
  public static forRoot(config: TmdbConfig): ModuleWithProviders<MoviesModule> {
    return {
      ngModule: MoviesModule,
      providers: [
        { provide: TMDB_CONFIG, useValue: config },
      ],
    };
  }
}
