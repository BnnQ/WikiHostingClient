import { SafeHtmlToStringPipe } from './safe-html-to-string.pipe';

describe('SafeHtmlToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeHtmlToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
