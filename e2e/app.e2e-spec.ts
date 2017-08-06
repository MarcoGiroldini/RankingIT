import { RankingITPage } from './app.po';

describe('ranking-it App', () => {
  let page: RankingITPage;

  beforeEach(() => {
    page = new RankingITPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
