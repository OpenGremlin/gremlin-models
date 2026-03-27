import { SUPPORTED_MODES, SUPPORTED_PROVIDERS } from "./providers.js";
const supportedProviderSet = new Set(SUPPORTED_PROVIDERS);
const supportedModeSet = new Set(SUPPORTED_MODES);
export const SAMPLE_SPEC_KEY = "sample_spec";
export function transform(raw) {
    const result = {};
    for (const [key, entry] of Object.entries(raw)) {
        if (key === SAMPLE_SPEC_KEY)
            continue;
        if (!entry || typeof entry !== "object")
            continue;
        if (!supportedProviderSet.has(entry.litellm_provider))
            continue;
        if (!entry.mode || !supportedModeSet.has(entry.mode))
            continue;
        const mode = entry.mode;
        const defaultModalities = mode === "chat" ? ["text"] : undefined;
        let modalities = entry.supported_modalities ?? defaultModalities;
        if (entry.supports_vision && modalities && !modalities.includes("image")) {
            modalities = [...modalities, "image"];
        }
        const model = {
            provider: entry.litellm_provider,
            mode,
        };
        if (entry.max_input_tokens != null)
            model.maxInputTokens = entry.max_input_tokens;
        if (entry.input_cost_per_token != null)
            model.inputCostPerToken = entry.input_cost_per_token;
        if (entry.output_cost_per_token != null)
            model.outputCostPerToken = entry.output_cost_per_token;
        if (modalities)
            model.supportedModalities = modalities;
        const outputModalities = entry.supported_output_modalities ?? defaultModalities;
        if (outputModalities)
            model.supportedOutputModalities = outputModalities;
        if (entry.input_cost_per_image != null)
            model.inputCostPerImage = entry.input_cost_per_image;
        if (entry.input_cost_per_image_token != null)
            model.inputCostPerImageToken = entry.input_cost_per_image_token;
        if (entry.output_cost_per_image != null)
            model.outputCostPerImage = entry.output_cost_per_image;
        if (entry.output_cost_per_image_token != null)
            model.outputCostPerImageToken = entry.output_cost_per_image_token;
        result[key] = model;
    }
    return result;
}
//# sourceMappingURL=transform.js.map