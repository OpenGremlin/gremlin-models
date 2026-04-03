export const SUPPORTED_PROVIDERS = [
  "openai",
  "anthropic",
  "gemini",
  "bedrock",
  "bedrock_converse",
  "bedrock_mantle",
  "xai",
  "mistral",
  "deepseek",
  "groq",
  "perplexity",
  "together_ai",
  "fireworks_ai",
  "minimax",
  "dashscope",
  "cohere",
  "cohere_chat",
] as const;

export type SupportedProvider = (typeof SUPPORTED_PROVIDERS)[number];

export const SUPPORTED_MODES = [
  "chat",
  "image_generation",
  "audio_speech",
] as const;
