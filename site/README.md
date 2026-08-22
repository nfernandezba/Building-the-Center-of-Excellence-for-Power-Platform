# NFBA Knowledge Library — Dynamic GitHub Pages site

This folder contains the static NFBA library interface. Publication cards are generated from the `publication.json` file stored in each book or white-paper folder.

## Generate the catalogue

```bash
node scripts/build-catalogue.mjs --site-dir site
```

GitHub Actions runs this command automatically. A pull request validates the catalogue; a push to `main` also deploys the generated `site` directory to GitHub Pages.

## Add a publication

1. Create a folder named `book-XX-slug` or `white-paper-XX-slug`.
2. Add `publication.json` and the referenced cover image.
3. Open a pull request. No HTML changes are required.
