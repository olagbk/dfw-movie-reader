import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movies/components/movie-list/movie-list.component';
import { MovieDetailComponent } from './movies/components/movie-detail/movie-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'movies'
  },
  {
    path: 'movies',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MovieListComponent,
      }, {
        path: ':id',
        component: MovieDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
