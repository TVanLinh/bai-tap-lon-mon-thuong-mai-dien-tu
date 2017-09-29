import { FontendPage } from './app.po';

describe('fontend App', () => {
  let page: FontendPage;

  beforeEach(() => {
    page = new FontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
