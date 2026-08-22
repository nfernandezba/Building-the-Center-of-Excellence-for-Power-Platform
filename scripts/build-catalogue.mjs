import { access, copyFile, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const siteFlagIndex = process.argv.indexOf("--site-dir");
const siteDirectory = siteFlagIndex >= 0 ? process.argv[siteFlagIndex + 1] : "site";

if (!siteDirectory) {
  throw new Error("--site-dir requires a directory path");
}

const siteRoot = path.resolve(root, siteDirectory);
const publicationsRoot = path.join(siteRoot, "assets", "publications");
const dataRoot = path.join(siteRoot, "data");
const directoryPattern = /^(book|white-paper)-\d{2}-[a-z0-9-]+$/;
const allowedTypes = new Set(["book", "white-paper"]);
const allowedStatuses = new Set(["published", "coming-soon", "draft", "hidden"]);

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const entries = await readdir(root, { withFileTypes: true });
const sourceDirectories = entries
  .filter((entry) => entry.isDirectory() && directoryPattern.test(entry.name))
  .map((entry) => entry.name)
  .sort();

assert(sourceDirectories.length > 0, "No publication directories were found");

await rm(publicationsRoot, { recursive: true, force: true });
await mkdir(publicationsRoot, { recursive: true });
await mkdir(dataRoot, { recursive: true });

const publications = [];
const ids = new Set();
const positions = new Set();

for (const directory of sourceDirectories) {
  const sourceRoot = path.join(root, directory);
  const manifestPath = path.join(sourceRoot, "publication.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

  assert(manifest.schemaVersion === 1, `${directory}: unsupported schemaVersion`);
  assert(typeof manifest.id === "string" && manifest.id.length > 0, `${directory}: id is required`);
  assert(!ids.has(manifest.id), `${directory}: duplicate id ${manifest.id}`);
  assert(allowedTypes.has(manifest.type), `${directory}: invalid publication type`);
  assert(Number.isInteger(manifest.order) && manifest.order > 0, `${directory}: order must be a positive integer`);
  assert(allowedStatuses.has(manifest.status), `${directory}: invalid publication status`);
  assert(typeof manifest.cover === "string" && manifest.cover.length > 0, `${directory}: cover is required`);
  assert(Array.isArray(manifest.editions) && manifest.editions.length > 0, `${directory}: at least one edition is required`);

  ids.add(manifest.id);
  const positionKey = `${manifest.type}:${manifest.order}`;
  assert(!positions.has(positionKey), `${directory}: duplicate order ${manifest.order} for ${manifest.type}`);
  positions.add(positionKey);

  if (manifest.status === "draft" || manifest.status === "hidden") continue;

  const languages = new Set();
  for (const edition of manifest.editions) {
    assert(typeof edition.language === "string" && edition.language.length > 0, `${directory}: edition language is required`);
    assert(!languages.has(edition.language), `${directory}: duplicate edition language ${edition.language}`);
    assert(typeof edition.title === "string" && edition.title.length > 0, `${directory}: edition title is required`);
    assert(typeof edition.description === "string" && edition.description.length > 0, `${directory}: edition description is required`);
    assert(allowedStatuses.has(edition.status), `${directory}: invalid edition status`);
    assert(Array.isArray(edition.links), `${directory}: edition links must be an array`);
    languages.add(edition.language);

    for (const link of edition.links) {
      assert(typeof link.label === "string" && link.label.length > 0, `${directory}: link label is required`);
      assert(typeof link.url === "string" && link.url.startsWith("https://"), `${directory}: links must use HTTPS`);
    }
  }

  assert(languages.has(manifest.defaultLanguage), `${directory}: defaultLanguage must match an edition`);

  const coverSource = path.join(sourceRoot, manifest.cover);
  await access(coverSource);
  const coverTargetDirectory = path.join(publicationsRoot, manifest.id);
  await mkdir(coverTargetDirectory, { recursive: true });
  await copyFile(coverSource, path.join(coverTargetDirectory, path.basename(manifest.cover)));

  publications.push({
    ...manifest,
    cover: `assets/publications/${manifest.id}/${path.basename(manifest.cover)}`
  });
}

const typeOrder = { book: 0, "white-paper": 1 };
publications.sort((left, right) => typeOrder[left.type] - typeOrder[right.type] || left.order - right.order);

const catalogue = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  publications
};

await writeFile(path.join(dataRoot, "catalogue.json"), `${JSON.stringify(catalogue, null, 2)}\n`);
console.log(`Generated ${publications.length} publications in ${path.relative(root, siteRoot)}`);
