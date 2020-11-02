import { ProductIdPipe } from './product-id.pipe';

describe('ProductIdPipe', () => {
  it('create an instance', () => {
    const pipe = new ProductIdPipe();
    expect(pipe).toBeTruthy();
  });
});
