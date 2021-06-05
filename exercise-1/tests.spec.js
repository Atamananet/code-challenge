const { normalizeUsers, toggleField } = require('./public/data-script');
const puppeteer = require('puppeteer');
const faker = require('faker');

const APP = 'http://localhost:3000/index.html';
let page;
let browser;
const width = 1024;
const height = 768;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`],
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto('http://localhost:3000');
});

afterAll(() => {
  browser.close();
});

describe('UI tests', () => {
  test('displays a user after a click', async () => {
    await page.waitForSelector('.users-container');

    await page.evaluate(() => {
      document.querySelectorAll('.btn-toggle').forEach(button => button.click());
    });

    const isClicked = await page.evaluate(() => (
      document.querySelector('.btn-toggle').classList.contains('btn-toggle_clicked')
    ));
    expect(isClicked).toBe(true);

    const isHidden = await page.evaluate(() => (
      document.querySelector('.addition').classList.contains('hidden')
    ));
    expect(isHidden).toBe(false);
  }, 16000);

  test('displays a user after a click', async () => {
    await page.waitForSelector('.users-container');
    await page.hover('button.btn_primary');
    await page.screenshot({ path: 'hover.png' });
  }, 16000);
});

const getFakeUser = () => ({
  name: faker.name.firstName(),
  id: faker.internet.email(),
  createdAt: faker.date.past(1),
  avatar: faker.internet.avatar()
});

const users = [
  getFakeUser(),
  getFakeUser(),
  getFakeUser(),
];

test('normalizes users data', () => {
  expect(normalizeUsers).toThrow();
  expect(normalizeUsers.bind(null, users)).not.toThrow();
  expect(normalizeUsers([])).toEqual([]);
  expect(normalizeUsers.bind(null, users)).not.toThrow();
});
