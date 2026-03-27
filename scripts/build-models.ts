import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { fetchLiteLLMData } from "../src/fetch.js";
import { SAMPLE_SPEC_KEY, transform } from "../src/transform.js";
import type { AugmentationsFile } from "../src/types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

async function main() {
  console.log("Fetching LiteLLM model data...");
  const raw = await fetchLiteLLMData();
  const totalKeys = Object.keys(raw).filter((k) => k !== SAMPLE_SPEC_KEY).length;
  console.log(`Fetched ${totalKeys} model entries`);

  console.log("Transforming to supported providers + modes...");
  const models = transform(raw);
  const modelCount = Object.keys(models).length;
  console.log(`Filtered to ${modelCount} models`);

  const augPath = resolve(ROOT, "augmentations.json");
  const augmentations: AugmentationsFile = JSON.parse(readFileSync(augPath, "utf-8"));
  const augKeys = Object.keys(augmentations);

  let applied = 0;
  for (const [key, aug] of Object.entries(augmentations)) {
    if (models[key]) {
      Object.assign(models[key], aug);
      applied++;
    } else {
      console.log(`  Warning: augmentation key "${key}" not found in models`);
    }
  }

  if (augKeys.length > 0) {
    console.log(`Applied ${applied}/${augKeys.length} augmentations`);
  }

  const outPath = resolve(ROOT, "models.json");
  writeFileSync(outPath, `${JSON.stringify(models, null, 2)}\n`);
  console.log(`Wrote ${outPath} (${modelCount} models)`);
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
