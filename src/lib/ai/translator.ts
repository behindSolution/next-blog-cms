import { getBlogConfig, type BlogAiTranslatorOpenAIConfig } from '../../config';
import { HttpError, HttpStatus } from '../http';
import { isObject } from '../utils';

export interface TranslateContentInput {
  sourceLanguage: string;
  targetLanguages: string[];
  fields: Record<string, string | null | undefined>;
}

export type TranslateContentResult = Record<string, Record<string, string>>;

const DEFAULT_OPENAI_MODEL = 'gpt-4o-mini';

export async function translateContent(
  input: TranslateContentInput
): Promise<TranslateContentResult> {
  if (!input.targetLanguages.length) {
    throw new HttpError('No target languages provided', { status: HttpStatus.BAD_REQUEST });
  }

  const config = getBlogConfig();
  const translator = config.ai?.translator;

  if (!translator) {
    throw new HttpError('AI translation is not configured', { status: HttpStatus.NOT_IMPLEMENTED });
  }

  switch (translator.provider) {
    case 'openai':
      return translateWithOpenAi(input, translator);
    default:
      throw new HttpError('Unsupported AI translation provider', { status: HttpStatus.BAD_REQUEST });
  }
}

async function translateWithOpenAi(
  input: TranslateContentInput,
  config: BlogAiTranslatorOpenAIConfig
): Promise<TranslateContentResult> {
  const apiKey = config.apiKey ?? process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new HttpError('OpenAI API key is not configured', {
      status: HttpStatus.INTERNAL_SERVER_ERROR
    });
  }

  const endpoint = config.baseUrl?.replace(/\/$/, '') ?? 'https://api.openai.com/v1/chat/completions';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: config.model ?? DEFAULT_OPENAI_MODEL,
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that translates blog posts. Respond with a JSON object only.'
        },
        {
          role: 'user',
          content: JSON.stringify({
            sourceLanguage: input.sourceLanguage,
            targetLanguages: input.targetLanguages,
            fields: input.fields
          })
        }
      ]
    })
  });

  if (!response.ok) {
    let reason = response.statusText;
    try {
      const errorPayload = (await response.json()) as { error?: { message?: string } };
      if (errorPayload?.error?.message) {
        reason = errorPayload.error.message;
      }
    } catch {
      // ignore parsing failures
    }

    throw new HttpError(`AI translation request failed: ${reason}`, {
      status: response.status >= 500 ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.BAD_REQUEST
    });
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = payload.choices?.[0]?.message?.content;

  if (!content) {
    throw new HttpError('AI translation response did not include content', {
      status: HttpStatus.INTERNAL_SERVER_ERROR
    });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch (error) {
    throw new HttpError('Failed to parse AI translation response', {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      details: error instanceof Error ? error.message : undefined
    });
  }

  if (!isObject(parsed) || !isObject(parsed.translations)) {
    throw new HttpError('AI translation response has an unexpected format', {
      status: HttpStatus.INTERNAL_SERVER_ERROR
    });
  }

  const translations = Object.entries(parsed.translations as Record<string, unknown>).reduce<
    TranslateContentResult
  >((acc, [language, value]) => {
    if (!isObject(value)) {
      return acc;
    }

    const fields: Record<string, string> = {};
    for (const [key, fieldValue] of Object.entries(value)) {
      if (typeof fieldValue === 'string') {
        fields[key] = fieldValue;
      }
    }

    acc[language] = fields;
    return acc;
  }, {});

  return translations;
}

