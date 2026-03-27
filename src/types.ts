import type { SUPPORTED_MODES } from "./providers.js";

export type ModelMode = (typeof SUPPORTED_MODES)[number];

export interface ModelEntry {
  provider: string;
  mode: ModelMode;
  maxInputTokens?: number;
  inputCostPerToken?: number;
  outputCostPerToken?: number;
  supportedModalities?: string[];
  supportedOutputModalities?: string[];
  inputCostPerImage?: number;
  inputCostPerImageToken?: number;
  outputCostPerImage?: number;
  outputCostPerImageToken?: number;
  maxInputImageSize?: number;
}

export type Augmentation = Partial<Omit<ModelEntry, "provider">>;

export type AugmentationsFile = Record<string, Augmentation>;

export interface LiteLLMEntry {
  litellm_provider: string;
  mode?: string;
  max_input_tokens?: number;
  max_output_tokens?: number;
  max_tokens?: number;
  input_cost_per_token?: number;
  output_cost_per_token?: number;
  supports_vision?: boolean;
  supported_modalities?: string[];
  supported_output_modalities?: string[];
  input_cost_per_image?: number;
  input_cost_per_image_token?: number;
  output_cost_per_image?: number;
  output_cost_per_image_token?: number;
}

export type LiteLLMData = Record<string, LiteLLMEntry>;
