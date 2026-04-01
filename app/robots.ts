import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Google Search + AI
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Googlebot-Image", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Googlebot-Video", allow: "/" },
      // Bing / Microsoft Copilot
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "msnbot", allow: "/" },
      // OpenAI / ChatGPT
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      // Anthropic / Claude
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "Anthropic-AI", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      // Perplexity
      { userAgent: "PerplexityBot", allow: "/" },
      // xAI / Grok
      { userAgent: "Grok", allow: "/" },
      // Meta AI
      { userAgent: "FacebookBot", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "Meta-ExternalFetcher", allow: "/" },
      // Apple
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      // Amazon
      { userAgent: "Amazonbot", allow: "/" },
      // You.com
      { userAgent: "YouBot", allow: "/" },
      // Cohere
      { userAgent: "cohere-ai", allow: "/" },
      // Diffbot
      { userAgent: "Diffbot", allow: "/" },
      // Common Crawl (trains most LLMs)
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: "https://latinprimesystems.com/sitemap.xml",
    host: "https://latinprimesystems.com",
  };
}
