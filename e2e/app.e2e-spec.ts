import { DomoticsWebappPage } from './app.po';

describe('domotics-webapp App', function() {
  let page: DomoticsWebappPage;

  beforeEach(() => {
    page = new DomoticsWebappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
