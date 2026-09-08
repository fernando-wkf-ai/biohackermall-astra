# Instructions for future maintainers and AI agents

Read README.md before changes. Preserve the broad BiohackerMall identity and bilingual architecture. Do not reopen business strategy.

- Product truth: data/products/*.json. Never duplicate prices/specifications by locale.
- Editorial truth: content/en and content/zh-hk Markdown. Pair only real published translations.
- Run node scripts/content.mjs after content/data changes. Never hand-edit *.generated.json.
- Update verified_date only after checking its source. Preserve null when unverified.
- Keep affiliations independent from comparisons. Use official links when affiliate URLs are absent.
- Preserve full annual charges and integer-cent arithmetic; run tests after calculator changes.
- Keep key text and product tables server-rendered and locale-aware metadata intact.
- CMS authentication and DNS need owner involvement. Never invent repository IDs or credentials.
- Reuse the existing Site project_id; do not create another Site for fixes.

