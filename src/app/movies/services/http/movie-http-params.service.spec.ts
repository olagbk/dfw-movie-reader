import { TmdbConfig } from '../../../api-config';
import { MovieHttpParamsService } from './movie-http-params.service';

describe('MovieHttpParamsService', () => {
  let service: MovieHttpParamsService;
  let config: TmdbConfig;

  beforeEach(() => {
    config = { imageHost: 'image-host', apiHost: 'api-host', apiKey: 'api-key' };
    service = new MovieHttpParamsService(config);
  });

  it('should send api key in base params', () => {
    const params = service.getBaseParams();
    expect(params.get('api_key')).toEqual('api-key');
  });

  it('should sort by release date', () => {
    const params = service.getIndexParams();
    expect(params.get('sort_by')).toEqual('release_date.desc');
  });

  it('should accept optional params', () => {
    const params = service.getIndexParams({ page: 3 });
    expect(params.get('page')).toEqual('3');

  })
});
