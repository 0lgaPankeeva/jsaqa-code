const { clickElement, getText } = require("./lib/commands.js");
const { selectDateTime, orderTickets, checkSeatIsTaken } = require("./lib/util.js");

let page;

beforeEach(async () => {
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
    page.close();
});

describe("Ticket booking ", () => {
    beforeEach(async () => {
        await page.goto("http://qamid.tmweb.ru/client/index.php", {
            timeout: 60000,
        });
        await clickElement(page, )
    });


    test("Book one seat", async () => {
        await clickElement(page, "page-nav__day-week");
        await clickElement(page, 1, 2);
        await clickElement(page, ".acceptin-button");

        const actual = await getText(page, "h2.ticket__check-title");
        expect(actual).contain("Вы выбрали билеты:");
    }, 60000);

    test("Book one VIP seat", async () => {
        await clickElement(page, "buying-scheme__chair buying-scheme__chair_vip buying-scheme__chair_selected");
        await clickElement(page, 1, 2);
        await clickElement(page, ".acceptin-button");

        const actual = await getText(page, "h2.ticket__check-title");
        expect(actual).contain("Вы выбрали билеты:");
    }, 60000);


    test("Don't booking seat", async () => {
        await clickElement(page, "buying-scheme__chair buying-scheme__chair_standart buying-scheme__chair_taken");

        const isDisabled = await page.$eval("button", (button) => button.disabled);
        expect(isDisabled).to.equal(true);
    }, 60000);
});