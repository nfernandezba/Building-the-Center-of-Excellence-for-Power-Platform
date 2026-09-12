# Building the Center of Excellence for Power Platform
### *Construyendo el Centro de Excelencia para Power Platform*

> A practical body of work by **Nicolás Fernández** — books, white papers and solutions
> to design, implement, govern and scale a Power Platform and Copilot Studio Center of Excellence.
>
> *Una colección práctica de **Nicolás Fernández** — libros, white papers y soluciones
> para diseñar, implementar, gobernar y escalar un Centro de Excelencia de Power Platform y Copilot Studio.*

## 🏛️ NFBA Knowledge Library

**→ [nfernandezba.github.io/Building-the-Center-of-Excellence-for-Power-Platform](https://nfernandezba.github.io/Building-the-Center-of-Excellence-for-Power-Platform/)**

Browse every book, white paper and solution on one interactive shelf, generated from this repository.
*Explora todos los libros, white papers y soluciones en una estantería interactiva generada desde este repositorio.*

---

## 📚 Books / Libros

| # | English Title | Título en Español | Resources |
|---|---|---|---|
| 01 | Defining the Framework Structure for the Power Platform CoE | Definiendo la Estructura Marco para el Centro de Excelencia de Power Platform | [📁 Book 01](./book-01-defining-the-framework/) |
| 02 | Copilot Studio and the Future of the Power Platform CoE | Copilot Studio y el Futuro del Centro de Excelencia de Power Platform | [📁 Book 02](./book-02-copilot-studio/) |
| 03–10 | *Coming soon* | *Próximamente* | — |

### 🛒 Get the Books / Consigue los Libros

**Book 01 — Defining the Framework Structure**

| | Kindle | Paperback |
|---|---|---|
| 🇬🇧 English | [Amazon.com](https://www.amazon.com/dp/B0GD8DTL52) | [Amazon.com](https://www.amazon.com/dp/B0GDDRCD2C) |
| 🇪🇸 Español | [Amazon.es](https://www.amazon.es/dp/B0FSDWM77P) | [Amazon.es](https://www.amazon.es/dp/B0FSDWQMHW) |

**Book 02 — Copilot Studio and the Future of the Power Platform CoE**

| | Kindle | Paperback |
|---|---|---|
| 🇬🇧 English | *Coming soon* | *Coming soon* |
| 🇪🇸 Español | [Amazon.com](https://www.amazon.com/dp/B0GV1XXD5Y) | [Amazon.com](https://www.amazon.com/dp/B0GZGL3T1K) |

### 📥 Free Community Downloads / Descargas Gratuitas

Book PDFs are available for a limited time as a contribution to the community.
*Los PDFs de los libros están disponibles por tiempo limitado como aportación a la comunidad.*

→ Check the [Releases](https://github.com/nfernandezba/Building-the-Center-of-Excellence-for-Power-Platform/releases) section for all available downloads.

---

## 📄 White Papers

Each white paper develops one proposition within the framework of the book series. *English only.*
*Cada white paper desarrolla una propuesta concreta dentro del marco de la serie de libros. Solo en inglés.*

| # | Title | Published | Resources |
|---|---|---|---|
| 01 | Designing the Community Hub | August 2026 | [📁 White Paper 01](./white-paper-01-designing-the-community-hub/) |
| 02 | Understanding the Agentic Solution Architecture | August 2026 | [📁 White Paper 02](./white-paper-02-understanding-agentic-architecture/) |
| 03 | Driving Real Innovation in the Agentic Era | September 2026 | [📁 White Paper 03](./white-paper-03-driving-real-innovation/) |
| 04 | Why Power Platform Partners Must Evolve | September 2026 | [📁 White Paper 04](./white-paper-04-partners-must-evolve/) |

---

## 🧰 Solutions / Soluciones

Free tools that put the framework into practice. Each one runs in the browser and lives in its own repository. *English · Español.*
*Herramientas gratuitas que llevan el marco a la práctica. Cada una se ejecuta en el navegador y tiene su propio repositorio.*

| # | Solution | What it does | Links |
|---|---|---|---|
| 01 | Copilot Studio Credits Monitor | Monitor purchased, allocated and consumed Copilot Studio capacity | [Open](https://nfernandezba.github.io/Copilot-Studio-Credits-Monitor/) · [Repo](https://github.com/nfernandezba/Copilot-Studio-Credits-Monitor) |
| 02 | Adoption Strategy Assessment | Evaluate adoption maturity and get a 90-day action plan | [Open](https://nfernandezba.github.io/Power-Platform-Copilot-Studio-Adoption-Strategy-Assessment/) · [Repo](https://github.com/nfernandezba/Power-Platform-Copilot-Studio-Adoption-Strategy-Assessment) |
| 03 | Agent Passport | Design, document and govern enterprise agents across their lifecycle | [Open](https://nfernandezba.github.io/Agent-Passport/) · [Repo](https://github.com/nfernandezba/Agent-Passport) |
| 04 | Tenant Inventory Explorer | Explore Power Platform and Copilot Studio tenant inventory | [Open](https://nfernandezba.github.io/Power-Platform-Tenant-Inventory-Explorer/) · [Repo](https://github.com/nfernandezba/Power-Platform-Tenant-Inventory-Explorer) |
| 05 | Environment Strategy Assessment | Assess your environment strategy's definition, coverage and currency | [Open](https://nfernandezba.github.io/Power-Platform-Copilot-Studio-Environment-Assessment/) · [Repo](https://github.com/nfernandezba/Power-Platform-Copilot-Studio-Environment-Assessment) |

---

## 📁 Repository Structure / Estructura del Repositorio

```
book-XX-slug/          Books        · README, cover, publication.json
white-paper-XX-slug/   White papers · README, cover, publication.json
solution-XX-slug/      Solutions    · README, thumbnail, publication.json
site/                  NFBA Knowledge Library (GitHub Pages)
scripts/               Catalogue generator
```

Every publication folder holds a `publication.json` manifest. On each push to `main`, GitHub Actions runs
`scripts/build-catalogue.mjs`, which validates the manifests and publishes the library — no HTML changes needed.
To add a publication, create a folder following the naming pattern above and open a pull request.
See [`site/README.md`](./site/README.md) for details.

*Cada carpeta de publicación contiene un manifiesto `publication.json`. En cada push a `main`, GitHub Actions valida los
manifiestos y publica la biblioteca, sin tocar HTML. Para añadir una publicación, crea una carpeta con el patrón anterior y abre un pull request.*

---

## 👤 About the Author / Sobre el Autor

**Nicolás Fernández** is a Power Platform and Copilot Studio Practice Lead at HCLTech,
6x Microsoft MVP, and content creator focused on Center of Excellence strategy and governance.

*Nicolás Fernández es Practice Lead de Power Platform y Copilot Studio en HCLTech,
6x Microsoft MVP y creador de contenido especializado en estrategia y gobernanza del Centro de Excelencia.*

- 💼 LinkedIn: [Nico Fernandez](https://www.linkedin.com/in/nfernandezba)
- 🎙️ Podcast: *Coming soon* — *Dentro del COE*
- 📺 YouTube: *Coming soon*

---

## 📜 License

This repository and its downloadable resources are shared under
[Creative Commons Attribution 4.0 International (CC BY 4.0)](./LICENSE).
You are free to share and adapt the material as long as you give appropriate credit.
