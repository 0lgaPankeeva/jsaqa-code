let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("http://github.com/team")
  }, 60000);


  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub', {timeout: 60000});
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content", {timeout: 60000});
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team", {timeout: 60000})
  });

  describe("Should check titles for GitHub pages", () => {
    test("Should check Pricing page", async () => {
      await page.goto("https://github.com/pricing");
      const title = await page.title();
      expect(title).toContain("Pricing · Plans for every developer · GitHub")
    }, 60000);
  
    test("Should check About page", async () => {
      await page.goto("https://github.com/about");
      const title = await page.title();
      expect(title).toContain("About · GitHub")
    }, 60000);
  
    test("Should check Shop page", async () => {
      await page.goto("https://github.com/marketplace");
      const title = await page.title();
      expect(title).toContain("GitHub Marketplace · to improve your workflow · GitHub")
    }, 60000);
  });
});
