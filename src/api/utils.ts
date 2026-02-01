import { createResponse } from '../lib/http';
import type { HandlerResult } from './types';

export function handlerResultToResponse(result: HandlerResult): Response {
  const payload = typeof result.data === 'undefined' ? undefined : result.data;
  const response = createResponse(payload, {
    status: result.status,
    headers: result.headers
  });

  if (result.cookies?.length) {
    for (const cookie of result.cookies) {
      response.headers.append('Set-Cookie', cookie);
    }
  }

  return response;
}

