// ============================================================================
// AI TOOLS DATABASE
// Maps known AI tools/companies to their homepage + documentation URLs.
// Used by the News Page to add the extra "Docs" / "Homepage" links when an
// article is about AI advancements.
// ============================================================================
window.AI_TOOLS = {
  // Anthropic
  "claude":          { homepage: "https://claude.ai",                      docs: "https://docs.claude.com" },
  "anthropic":       { homepage: "https://www.anthropic.com",              docs: "https://docs.claude.com" },

  // OpenAI
  "chatgpt":         { homepage: "https://chatgpt.com",                    docs: "https://platform.openai.com/docs" },
  "openai":          { homepage: "https://openai.com",                     docs: "https://platform.openai.com/docs" },
  "gpt-4":           { homepage: "https://openai.com/gpt-4",               docs: "https://platform.openai.com/docs/models/gpt-4" },
  "gpt-5":           { homepage: "https://openai.com",                     docs: "https://platform.openai.com/docs" },
  "dall-e":          { homepage: "https://openai.com/dall-e-3",            docs: "https://platform.openai.com/docs/guides/images" },
  "sora":            { homepage: "https://openai.com/sora",                docs: "https://platform.openai.com/docs" },

  // Google
  "gemini":          { homepage: "https://gemini.google.com",              docs: "https://ai.google.dev/docs" },
  "bard":            { homepage: "https://gemini.google.com",              docs: "https://ai.google.dev/docs" },
  "google ai":       { homepage: "https://ai.google",                      docs: "https://ai.google.dev/docs" },
  "deepmind":        { homepage: "https://deepmind.google",                docs: "https://ai.google.dev/docs" },

  // Meta
  "llama":           { homepage: "https://llama.meta.com",                 docs: "https://llama.meta.com/docs/overview" },
  "meta ai":         { homepage: "https://ai.meta.com",                    docs: "https://llama.meta.com/docs/overview" },

  // Image / Video
  "midjourney":      { homepage: "https://www.midjourney.com",             docs: "https://docs.midjourney.com" },
  "stable diffusion":{ homepage: "https://stability.ai",                   docs: "https://stability.ai/stable-image" },
  "runway":          { homepage: "https://runwayml.com",                   docs: "https://docs.runwayml.com" },
  "elevenlabs":      { homepage: "https://elevenlabs.io",                  docs: "https://elevenlabs.io/docs" },

  // Coding
  "cursor":          { homepage: "https://cursor.sh",                      docs: "https://docs.cursor.com" },
  "copilot":         { homepage: "https://github.com/features/copilot",    docs: "https://docs.github.com/en/copilot" },
  "github copilot":  { homepage: "https://github.com/features/copilot",    docs: "https://docs.github.com/en/copilot" },
  "windsurf":        { homepage: "https://codeium.com/windsurf",           docs: "https://docs.codeium.com/windsurf/getting-started" },
  "codeium":         { homepage: "https://codeium.com",                    docs: "https://docs.codeium.com" },
  "replit":          { homepage: "https://replit.com",                     docs: "https://docs.replit.com" },

  // Search / Research
  "perplexity":      { homepage: "https://www.perplexity.ai",              docs: "https://docs.perplexity.ai" },
  "you.com":         { homepage: "https://you.com",                        docs: "https://documentation.you.com" },

  // Open / Other LLM providers
  "mistral":         { homepage: "https://mistral.ai",                     docs: "https://docs.mistral.ai" },
  "grok":            { homepage: "https://grok.x.ai",                      docs: "https://docs.x.ai" },
  "xai":             { homepage: "https://x.ai",                           docs: "https://docs.x.ai" },
  "deepseek":        { homepage: "https://www.deepseek.com",               docs: "https://api-docs.deepseek.com" },
  "qwen":            { homepage: "https://qwen.ai",                        docs: "https://qwen.readthedocs.io" },
  "cohere":          { homepage: "https://cohere.com",                     docs: "https://docs.cohere.com" },
  "huggingface":     { homepage: "https://huggingface.co",                 docs: "https://huggingface.co/docs" },
  "hugging face":    { homepage: "https://huggingface.co",                 docs: "https://huggingface.co/docs" },
  "nvidia":          { homepage: "https://www.nvidia.com/en-us/ai/",       docs: "https://docs.nvidia.com" }
};

// ============================================================================
// AI KEYWORD DETECTION
// Generic keywords that indicate an article is about AI (used as a fallback
// when none of the named tools above match).
// ============================================================================
window.AI_KEYWORDS = [
  "artificial intelligence", "machine learning", " ai ", " ai,", " ai.", " ai:",
  "neural network", "deep learning", "large language model", " llm ", " llms ",
  "generative ai", "chatbot", "transformer model", "agentic", "ai agent",
  "ai model", "ai tool", "foundation model", "diffusion model"
];

// ============================================================================
// NEWS SOURCES
// RSS feeds we pull from. We use api.rss2json.com as a free RSS->JSON proxy
// so the browser doesn't hit CORS issues.
// ============================================================================
window.NEWS_SOURCES = [
  { name: "TechCrunch",  url: "https://techcrunch.com/feed/" },
  { name: "The Verge",   url: "https://www.theverge.com/rss/index.xml" },
  { name: "Ars Technica",url: "https://feeds.arstechnica.com/arstechnica/technology-lab" },
  { name: "Wired",       url: "https://www.wired.com/feed/category/business/latest/rss" },
  { name: "MIT Tech Review", url: "https://www.technologyreview.com/feed/" }
];

window.RSS_PROXY = "https://api.rss2json.com/v1/api.json?rss_url=";
