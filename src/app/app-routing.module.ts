import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movies/components/movie-list/movie-list.component';
import { MovieDetailComponent } from './movies/components/movie-detail/movie-detail.component';

export const paths = {
  root: '',
  movies: {
    root: 'movies',
    list: '',
    detail: ':id'
  }

}
const routes: Routes = [
  {
    path: paths.root,
    pathMatch: 'full',
    redirectTo: paths.movies.root,
  },
  {
    path: paths.movies.root,
    children: [
      {
        path: paths.movies.list,
        pathMatch: 'full',
        component: MovieListComponent,
      }, {
        path: paths.movies.detail,
        component: MovieDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
