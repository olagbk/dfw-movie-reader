import { TmdbConfig } from '../../api-config';
import { MovieImageService } from './movie-image.service';
import { MovieImageSize } from '../models/movie-image-size';

fdescribe('MovieImageService', () => {
  let service: MovieImageService;
  let config: TmdbConfig;

  beforeEach(() => {
    config = { imageHost: 'image-host', apiHost: 'api-host', apiKey: 'api-key' };
    service = new MovieImageService(config);
  });

  it('should include size in image URL', () => {
    let result = service.getUrl('test_path.png', MovieImageSize.DETAIL)
    expect(result).toEqual(`image-host/${MovieImageSize.DETAIL}/test_path.png`);

    result = service.getUrl('test_path.png', MovieImageSize.LIST)
    expect(result).toEqual(`image-host/${MovieImageSize.LIST}/test_path.png`);
  });
});
