import { DummyPage } from './app.po';

describe('dummy App', () => {
  let page: DummyPage;

  beforeEach(() => {
    page = new DummyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
