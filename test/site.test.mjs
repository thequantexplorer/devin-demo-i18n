// Starts the production build (`next build` runs first via `npm test`) and checks
// every page in every language. Works with any i18n library.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = 3457;
const BASE = `http://127.0.0.1:${PORT}`;
let server;

before(async () => {
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)], { stdio: 'ignore' });
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(BASE);
      return;
    } catch {
      await sleep(500);
    }
  }
  throw new Error('next start did not come up on port ' + PORT);
});

after(() => server?.kill());

const pages = ['/', '/pricing', '/about'];
const locales = ['en', 'es', 'ja'];

// Every English phrase a visitor can see on each page, including the shared header and footer.
const shared = ['Home', 'Pricing', 'About us', 'All rights reserved', 'Questions? Email'];
const english = {
  '/': ['Rent a bike, see the city', 'City bikes and e-bikes by the hour', 'See prices', 'Pick up in minutes', 'Helmet and lock included', 'Free route maps'],
  '/pricing': ['Simple prices', 'No deposit and no hidden fees', 'Hourly', 'Day pass', 'Week pass', 'per hour', 'Book now'],
  '/about': ['family-run shop', 'We opened on', 'Our story', 'Visit us', 'Open every day'],
};
const titles = { '/': 'City bike rentals', '/pricing': 'Pricing', '/about': 'About us' };

// "/" + "es" -> "/es", "/pricing" + "es" -> "/es/pricing". English may live at "/x" or "/en/x".
const url = (page, locale) => (locale === 'en' ? page : `/${locale}${page === '/' ? '' : page}`);
const hrefsFor = (page, locale) => {
  const prefixed = `/${locale}${page === '/' ? '' : page}`;
  const variants = [prefixed, prefixed + '/'];
  if (locale === 'en') variants.push(page);
  return variants;
};

async function load(path) {
  const res = await fetch(BASE + path, { headers: { 'accept-language': 'en' } });
  const html = await res.text();
  const lang = html.match(/<html[^>]*\slang="([^"]+)"/)?.[1];
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<head>[\s\S]*?<\/head>/, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');
  const hrefs = [...html.matchAll(/<a[^>]*\shref="([^"]+)"/g)].map((m) => m[1]);
  return { status: res.status, lang, title, text, hrefs };
}

const has = (text, phrase) => new RegExp(`(^|[^A-Za-z])${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^A-Za-z]|$)`).test(text);

for (const locale of locales) {
  for (const page of pages) {
    const path = url(page, locale);

    test(`${locale}: ${path} renders`, async () => {
      const p = await load(path);
      assert.equal(p.status, 200, `${path} returned ${p.status}`);
      assert.equal(p.lang, locale, `<html lang> on ${path} is "${p.lang}", expected "${locale}"`);
    });

    if (locale === 'en') {
      test(`en: ${path} shows the English text`, async () => {
        const p = await load(path);
        assert.ok(has(p.text, english[page][0]), `missing "${english[page][0]}" on ${path}`);
        assert.ok(p.title.includes(titles[page]), `<title> on ${path} is "${p.title}"`);
      });
    } else {
      test(`${locale}: ${path} has no English text left`, async () => {
        const p = await load(path);
        assert.equal(p.status, 200, `${path} returned ${p.status}`);
        const left = [...shared, ...english[page]].filter((phrase) => has(p.text, phrase));
        assert.deepEqual(left, [], `English text still on ${path}: ${JSON.stringify(left)}`);
        assert.ok(!p.title.includes(titles[page]), `<title> on ${path} is still English: "${p.title}"`);
      });
    }

    if (locale === 'ja') {
      test(`ja: ${path} shows Japanese text`, async () => {
        const p = await load(path);
        assert.match(p.text, /[\u3040-\u30ff\u4e00-\u9fff]/, `no Japanese characters on ${path}`);
      });
    }

    test(`${locale}: ${path} has a language switcher to the same page`, async () => {
      const p = await load(path);
      for (const other of locales.filter((l) => l !== locale)) {
        const wanted = hrefsFor(page, other);
        assert.ok(p.hrefs.some((h) => wanted.includes(h)), `${path} has no link to ${wanted[0]} (found: ${JSON.stringify(p.hrefs)})`);
      }
    });
  }
}
