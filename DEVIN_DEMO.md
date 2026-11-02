# Devin demo: Add Spanish and Japanese to a Next.js app

**What it shows:** Devin adds an i18n library to a small Next.js site, moves every hard-coded English string into message files, adds Spanish and Japanese and a language switcher, and puts screenshots of all three languages in the PR.

**Needs:** GitHub only

More demos: [devin-advanced-demos](https://github.com/thequantexplorer/devin-advanced-demos)

## The problem

The site has three pages (`/`, `/pricing`, `/about`) and every word on them is typed straight into the code in English. There is no `/es` or `/ja` page and no way to switch language.

`npm test` builds the site, starts it, and checks every page in English, Spanish and Japanese. Today only the English checks pass:

```text
ok 1 - en: / renders
ok 2 - en: / shows the English text
not ok 3 - en: / has a language switcher to the same page
...
not ok 10 - es: /es renders
  error: /es returned 404
...
# tests 30
# pass 6
# fail 24
```

## Set it up

1. Click **Use this template → Create a new repository**, choose your GitHub account or org as the owner, and keep the name `devin-demo-i18n`. The prompt below assumes that name. Use the template rather than a fork: pull requests on a fork go to the original repo by default.
2. In Devin, open [**Settings → Connections → GitHub**](https://app.devin.ai/settings/connections/github) and make sure Devin can access the new repository.
3. Optional: see the failing tests yourself. In your new repo on GitHub, open the **Actions** tab, click **CI**, click **Run workflow**, then click the green **Run workflow** button. The run takes about a minute and ends with a red X. Click it to read the test output. You don't need to run anything on your computer.

## Prompt

Start a new Devin session and paste this. Replace `<you>` with your GitHub user or org.

```text
The Ridgeline Bikes site in https://github.com/<you>/devin-demo-i18n is English only. Every string is hard-coded in the pages under app/ and in the header and footer under components/. Add Spanish (es) and Japanese (ja):

1. Add the next-intl library and move every visible string, including the page titles, into message files for en, es and ja. Write natural translations.
2. Keep English at /, /pricing and /about. Serve Spanish under /es and Japanese under /ja (for example /es/pricing). Set <html lang> to the page's language.
3. Format the prices and the opening date for each language instead of always using en-US.
4. Add a language switcher to the header that links to the same page in the other two languages.
5. Run npm test. It fails today; all 30 tests must pass. Don't change the tests.
6. Open a PR. Then start the site, open the pricing page in English, Spanish and Japanese in your browser, take a screenshot of each, and add all three screenshots to the PR description. If the Japanese text shows as empty boxes, your machine is missing a Japanese font: install one (for example the fonts-noto-cjk package) and take the screenshot again.
```

## What good looks like

- One PR that adds next-intl and `en`, `es` and `ja` message files, with no English text left in the pages or components.
- `npm test` passes (30 of 30) and the **CI** check on the PR is green.
- The PR description has three screenshots of the pricing page: English, Spanish and Japanese, each with the language switcher in the header. The Japanese one shows real Japanese characters, not empty boxes.
