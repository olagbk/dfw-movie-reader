import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './store/effects';
import { movieReducer } from './store/reducers';

export const reducers = {
  movies: movieReducer,
  router: routerReducer,
};

export const effects = [MovieEffects];
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot(),
  ],
})
export class CoreModule {

}
