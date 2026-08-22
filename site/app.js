const backdrop = document.querySelector("[data-dialog-backdrop]");
const closeButton = document.querySelector("[data-dialog-close]");
const cover = document.querySelector("[data-dialog-cover]");
const kicker = document.querySelector("[data-dialog-kicker]");
const title = document.querySelector("[data-dialog-title]");
const description = document.querySelector("[data-dialog-description]");
const languages = document.querySelector("[data-dialog-languages]");
const links = document.querySelector("[data-dialog-links]");

let publications = [];
let activePublication = null;

function getEdition(publication, language = publication.defaultLanguage) {
  return publication.editions.find((edition) => edition.language === language) ?? publication.editions[0];
}

function renderEdition(publication, edition) {
  cover.src = publication.cover;
  cover.alt = `Cover of ${edition.title}`;
  cover.classList.toggle("is-landscape", publication.type === "solution");
  const kind = publication.type === "book" ? "Book" : publication.type === "white-paper" ? "White paper" : "Solution";
  kicker.textContent = `${kind} ${publication.displayNumber}${publication.version ? ` · ${publication.version}` : ""}${publication.date ? ` · ${publication.date}` : ""}`;
  title.textContent = edition.title;
  description.textContent = edition.description;

  languages.replaceChildren(...publication.editions.map((candidate) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = candidate.status === "coming-soon" ? `${candidate.label} · Coming soon` : candidate.label;
    button.className = candidate.language === edition.language ? "is-active" : "";
    button.setAttribute("aria-pressed", String(candidate.language === edition.language));
    button.addEventListener("click", () => renderEdition(publication, candidate));
    return button;
  }));

  if (edition.links.length === 0) {
    const unavailable = document.createElement("span");
    unavailable.className = "dialog-link-unavailable";
    unavailable.textContent = edition.status === "coming-soon" ? "Edition coming soon" : "Publication link coming soon";
    links.replaceChildren(unavailable);
    return;
  }

  links.replaceChildren(...edition.links.map((link) => {
    const anchor = document.createElement("a");
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.textContent = `${link.label} ↗`;
    return anchor;
  }));
}

function openPublication(publication) {
  activePublication = publication;
  renderEdition(publication, getEdition(publication));
  backdrop.hidden = false;
  closeButton.focus();
}

function closePublication() {
  activePublication = null;
  backdrop.hidden = true;
}

function renderShelf(type) {
  const shelf = document.querySelector(`[data-publication-shelf="${type}"]`);
  const count = document.querySelector(`[data-publication-count="${type}"]`);
  const items = publications.filter((publication) => publication.type === type).sort((left, right) => left.order - right.order);

  count.textContent = String(items.length).padStart(2, "0");
  shelf.replaceChildren(...items.map((publication) => {
    const edition = getEdition(publication);
    const button = document.createElement("button");
    button.className = "cover-button";
    button.type = "button";
    button.setAttribute("aria-label", `Open details for ${edition.title}`);
    button.addEventListener("click", () => openPublication(publication));

    const image = document.createElement("img");
    image.src = publication.cover;
    image.alt = "";
    button.append(image);
    return button;
  }));
}

async function initialiseLibrary() {
  try {
    const response = await fetch("data/catalogue.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Catalogue request failed with ${response.status}`);
    const catalogue = await response.json();
    publications = catalogue.publications;
    renderShelf("book");
    renderShelf("white-paper");
    renderShelf("solution");
  } catch (error) {
    console.error(error);
    document.querySelectorAll("[data-publication-shelf]").forEach((shelf) => {
      shelf.textContent = "The publication catalogue is temporarily unavailable.";
      shelf.classList.add("catalogue-error");
    });
  }
}

closeButton.addEventListener("click", closePublication);
backdrop.addEventListener("mousedown", (event) => { if (event.target === backdrop) closePublication(); });
window.addEventListener("keydown", (event) => { if (event.key === "Escape" && activePublication) closePublication(); });

initialiseLibrary();
