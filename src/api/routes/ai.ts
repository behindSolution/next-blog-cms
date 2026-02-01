import { translateContent } from '../../lib/ai/translator';
import { HttpError, HttpStatus } from '../../lib/http';
import { isObject } from '../../lib/utils';
import type { HandlerResult, RequestContext } from '../types';

export async function handleAiRoute(
  req: RequestContext['request'],
  ctx: RequestContext
): Promise<HandlerResult> {
  if (!ctx.user) {
    throw new HttpError('Unauthorized', { status: HttpStatus.UNAUTHORIZED });
  }

  const segments = req.segments.slice(1); // remove 'admin'
  const action = segments[1];

  if (segments[0] === 'ai' && action === 'translate' && req.method === 'POST') {
    return handleTranslate(req);
  }

  throw new HttpError('Route not found', { status: HttpStatus.NOT_FOUND });
}

async function handleTranslate(req: RequestContext['request']): Promise<HandlerResult> {
  const payload = parseTranslateBody(req.body);
  const translations = await translateContent(payload);

  return {
    status: HttpStatus.OK,
    data: {
      translations
    }
  };
}

function parseTranslateBody(body: unknown) {
  if (!isObject(body)) {
    throw new HttpError('Invalid payload', { status: HttpStatus.BAD_REQUEST });
  }

  const sourceLanguage = typeof body.sourceLanguage === 'string' ? body.sourceLanguage.trim() : '';
  if (!sourceLanguage) {
    throw new HttpError('sourceLanguage is required', { status: HttpStatus.BAD_REQUEST });
  }

  const targetLanguages = Array.isArray(body.targetLanguages)
    ? body.targetLanguages.filter((value): value is string => typeof value === 'string' && value.trim())
    : [];

  if (!targetLanguages.length) {
    throw new HttpError('targetLanguages is required', { status: HttpStatus.BAD_REQUEST });
  }

  const fields: Record<string, string> = {};

  if (isObject(body.fields)) {
    for (const [key, value] of Object.entries(body.fields)) {
      if (typeof key === 'string' && key.trim() && typeof value === 'string') {
        fields[key] = value;
      }
    }
  }

  if (Object.keys(fields).length === 0) {
    throw new HttpError('fields must include at least one value', { status: HttpStatus.BAD_REQUEST });
  }

  return {
    sourceLanguage,
    targetLanguages,
    fields
  };
}

