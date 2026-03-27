const LITELLM_URL = "https://raw.githubusercontent.com/BerriAI/litellm/main/model_prices_and_context_window.json";
export async function fetchLiteLLMData() {
    const response = await fetch(LITELLM_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch LiteLLM data: ${response.status} ${response.statusText}`);
    }
    return (await response.json());
}
//# sourceMappingURL=fetch.js.map