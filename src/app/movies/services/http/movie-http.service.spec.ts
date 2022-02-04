import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { TmdbConfig } from '../../../api-config';
import { MovieHttpService } from './movie-http.service';
import { MovieHttpParamsService } from './movie-http-params.service';

describe('MovieHttpService', () => {
  let service: MovieHttpService;
  let clientSpy: SpyObj<HttpClient>;
  let paramsServiceSpy: SpyObj<MovieHttpParamsService>;
  let config: TmdbConfig;

  beforeEach(() => {
    clientSpy = createSpyObj<HttpClient>('HttpClient', [
      'get',
    ]);
    paramsServiceSpy = createSpyObj<MovieHttpParamsService>('MovieHttpParamsService', [
      'getBaseParams', 'getIndexParams',
    ]);
    config = { imageHost: 'image-host', apiHost: 'api-host', apiKey: 'api-key' };
    service = new MovieHttpService(config, clientSpy, paramsServiceSpy);
  });

  it('should call discover/movie on index', () => {
    clientSpy.get.and.returnValue(EMPTY);
    service.index();
    expect(clientSpy.get).toHaveBeenCalledWith('api-host/discover/movie', jasmine.any(Object));
  });

  it('should call movie/:id on get', () => {
    clientSpy.get.and.returnValue(EMPTY);
    service.get('6');
    expect(clientSpy.get).toHaveBeenCalledWith('api-host/movie/6', jasmine.any(Object));
  });
});
