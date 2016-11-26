import { TestReadingListPage } from './app.po';

describe('test-reading-list App', function() {
  let page: TestReadingListPage;

  beforeEach(() => {
    page = new TestReadingListPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
