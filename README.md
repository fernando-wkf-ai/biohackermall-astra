# BiohackerMall MVP

BiohackerMall is a bilingual product-intelligence platform. Smart rings are its first vertical, not its entire brand.

## Architecture

- Sites scaffold: Vinext / React 19 / TypeScript / Cloudflare-compatible server-rendered pages.
- Shared CSS tokens and small client components. No database, consumer account, payments or analytics.
- Canonical origin: https://biohackermall.com. English is at root; Traditional Chinese is /zh-hk/.
- Middleware sets document language from the URL only, never browser language. Canonicals, hreflang, Open Graph, breadcrumbs, sitemap and robots are generated.
- All current core routes and a single explainer in each language. Unknown or unpublished articles return 404.
- The content loader accepts article, comparison, buying-guide, explainer, product-update, decision-guide and news types.

## Source of truth

Edit only data/products/*.json for product facts. Each mutable fact has value, verified_date and source_url. Unknown battery minimum and unverified dates are null. USD prices are baseline estimates, not live quotes. Oura membership fields were checked against the official membership page on 2026-09-08; the rest remains supplied starting data.

The build generates data/products.generated.json and data/content.generated.json. These are derived bundles: do not edit them. New product records are picked up by the build automatically. Do not paste current prices into articles; link to the product table/tool instead. Official URL, affiliate URL and affiliate status are separate. Calculation code never reads affiliate status or affiliate URL.

## AI publishing workflow

### Local Windows tooling

If the Codex-bundled `pnpm exec` reports that `tsc` or `vinext` is not found despite an installed `node_modules` folder, add the project's local tools to the current PowerShell session before running the existing commands:

```powershell
$env:Path = (Join-Path $PWD 'node_modules/.bin') + ';' + $env:Path
pnpm exec tsc --noEmit
```

Run this from the repository root. It only affects the current shell; no dependency or system-wide settings change is needed. If dependencies are missing, restore them with `pnpm install --frozen-lockfile`.

### Publishing content

1. Add or edit content/en/_.md or content/zh-hk/_.md. Copy the existing frontmatter structure.
2. Set title, slug, translation_key, excerpt, category, type, tags, author, dates, locale, SEO title/description, sources, disclosure flag, schema type and published flag.
3. Paired translations share translation_key; slugs may differ. Only published translations receive links and hreflang entries.
4. Set published: false to unpublish. Run the content build after edits; its manifest powers routes and sitemap.
5. Run pnpm build. Prebuild validates all content and products. Invalid metadata, duplicate routes and malformed sourced facts fail the build.
6. Run pnpm test and pnpm exec tsc --noEmit after calculation/application changes, then deploy the validated source.

Raw HTML in Markdown is disabled. MDX executable content is not accepted. H2/H3 sections, paragraphs, lists and Markdown links work normally. Add future categories through shared templates and navigation; do not create a separate site or locale-specific product store.

## Family editor

Decap CMS collection definitions are generated in public/admin/config.yml. Forms cover Markdown text, titles, SEO, dates, translations, product fields, source URLs and published/unpublished flags. It uses a review workflow and one shared product collection outside the language collections.

Production sign-in is not configured. /admin/ displays its setup state until a real repository and OAuth origin are supplied in cms-settings.json. Never put secrets in this file; it contains only public repository and auth-service identifiers.

Activation requires an authenticated content repository (recommended GitHub), a Decap-compatible OAuth endpoint and a deployment pipeline that rebuilds approved changes. The Sites source repository is a deployment archive, not a GitHub CMS backend. Once connected, a family member signs into /admin/, edits forms, saves drafts and publishes. GitHub push access is required for Decap's GitHub backend. See https://decapcms.org/docs/github-backend/ and https://decapcms.org/docs/intro/.

Until connected, CMS publishing is pending. The editor must never imply an edit was saved or published when it was not.

## Calculator contract

Integer cents for arithmetic; ownership 1–5 years; phone iPhone / Android / Samsung Galaxy; Oura monthly / annual / best value.

Monthly: hardware + max(0, ownership months - included months) × monthly fee.
Annual: hardware + ceil(paid months / 12) × annual fee. No prorating or refunds assumed.
Best: cheaper of uninterrupted monthly and uninterrupted annual billing; no mixed-plan optimization.
No mandatory subscription: hardware only.
Incompatible products remain visible but cannot win lowest compatible cost. Affiliation cannot influence costs.

## Deployment

Publish the validated Cloudflare Worker bundle through Sites. Reuse .openai/hosting.json's project ID. Domain canonicals target BiohackerMall.com; do not connect DNS without explicit domain-owner approval.

Pending launch tasks: domain ownership/DNS approval, public audience activation, complete product fact review, actual Awin affiliate URL, CMS repository/OAuth connection and automated publishing. Never label availability in stock without verification. Field Core Web Vitals cannot be claimed before public traffic exists.
