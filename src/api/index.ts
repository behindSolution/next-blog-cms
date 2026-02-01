import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

import { createErrorResponse, HttpError, HttpStatus } from '../lib/http';
import { handleRequest } from './router';
import { handlerResultToResponse } from './utils';
import type { HandlerResult } from './types';

export async function blogApiHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await handleRequest({
      method: req.method ?? 'GET',
      url: `${inferProtocol(req)}://${req.headers.host ?? 'localhost'}${req.url ?? ''}`,
      headers: Object.fromEntries(
        Object.entries(req.headers).map(([key, value]) => [key, String(value)])
      ),
      body: req.body,
      query: req.query as Record<string, string | string[]>
    });

    applyHandlerResultToNodeResponse(result, res);
  } catch (error) {
    const response = createErrorResponse(error);
    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    const text = await response.text();
    res.send(text);
  }
}

export async function blogApiHandlerApp(req: NextRequest) {
  try {
    const method = req.method?.toUpperCase() ?? 'GET';

    let body: unknown;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const text = await req.text();
      if (text.trim().length > 0) {
        try {
          body = JSON.parse(text);
        } catch {
          throw new HttpError('Invalid payload', { status: HttpStatus.BAD_REQUEST });
        }
      }
    }

    const result = await handleRequest({
      method,
      url: req.url,
      headers: Object.fromEntries(req.headers.entries()),
      body,
      query: Object.fromEntries(new URL(req.url).searchParams.entries())
    });

    return handlerResultToResponse(result);
  } catch (error) {
    return createErrorResponse(error);
  }
}

function inferProtocol(req: NextApiRequest): string {
  const forwardedProto = req.headers['x-forwarded-proto'];
  if (Array.isArray(forwardedProto)) {
    return forwardedProto[0];
  }
  if (forwardedProto) {
    return forwardedProto;
  }
  const socket = req.socket as { encrypted?: boolean };
  return socket.encrypted ? 'https' : 'http';
}

function applyHandlerResultToNodeResponse(result: HandlerResult, res: NextApiResponse) {
  res.status(result.status);

  if (result.headers) {
    for (const [key, value] of Object.entries(result.headers)) {
      res.setHeader(key, value);
    }
  }

  if (result.cookies?.length) {
    res.setHeader('Set-Cookie', result.cookies);
  }

  if (typeof result.data === 'undefined') {
    res.send('');
  } else {
    res.json(result.data);
  }
}

