# @gremlin/models

Canonical model registry for Gremlin. Fetches model data from LiteLLM, transforms it into a normalized format, and exports a typed `models.json` catalog with provider, pricing, and capability info.

## Usage

```ts
import { models } from "@gremlin/models";
import type { ModelEntry, SupportedProvider } from "@gremlin/models";
```

## Scripts

- `pnpm build:models` — fetch and rebuild `models.json`
- `pnpm build` — compile TypeScript
- `pnpm lint` — run Biome checks
