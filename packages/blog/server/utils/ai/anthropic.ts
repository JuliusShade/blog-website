import Anthropic from '@anthropic-ai/sdk';
import { wrapAnthropic, initLogger } from 'braintrust';

let _client: Anthropic | null = null;
let _logger: ReturnType<typeof initLogger> | null = null;

function isBraintrustConfigured(): boolean {
  const result = envSchema.parse(process.env);
  return !!(result.BRAINTRUST_API_KEY && result.BRAINTRUST_PROJECT_NAME);
}

/**
 * Get Braintrust logger for custom traces.
 * Use logger.log() for custom traces (e.g., multimodal inputs, metadata)
 * Returns null if Braintrust is not configured.
 */
export function getBraintrustLogger() {
  if (!isBraintrustConfigured()) return null;
  if (!_logger) {
    const result = envSchema.parse(process.env);
    _logger = initLogger({
      projectName: result.BRAINTRUST_PROJECT_NAME,
      apiKey: result.BRAINTRUST_API_KEY,
    });
  }
  return _logger;
}

export function getAnthropicClient(): Anthropic {
  if (!_client) {
    const result = envSchema.parse(process.env);
    const rawClient = new Anthropic({
      apiKey: result.ANTHROPIC_API_KEY,
    });

    if (isBraintrustConfigured()) {
      getBraintrustLogger();
      _client = wrapAnthropic(rawClient);
    } else {
      _client = rawClient;
    }
  }
  return _client;
}
