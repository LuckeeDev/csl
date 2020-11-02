import { ProductNamePipe } from './product-name.pipe';

describe('ProductNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ProductNamePipe();
    expect(pipe).toBeTruthy();
  });
});
