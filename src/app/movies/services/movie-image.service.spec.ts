import { TmdbConfig } from '../../api-config';
import { MovieImageService } from './movie-image.service';
import { MovieImageSize } from '../models/movie-image-size';

describe('MovieImageService', () => {
  let service: MovieImageService;
  let config: TmdbConfig;

  beforeEach(() => {
    config = { imageHost: 'image-host', apiHost: 'api-host', apiKey: 'api-key' };
    service = new MovieImageService(config);
  });

  it('should include size in image URL', () => {
    let result = service.getUrl('test_path.png', MovieImageSize.DETAIL)
    expect(result).toEqual(`image-host/${MovieImageSize.DETAIL}/test_path.png`);
  });

  it('should return fallback icon if no image is passed', () => {
    const result = service.getUrl(null, MovieImageSize.DETAIL);
    expect(result).toEqual('assets/image-not-found.png')
  })
});
