export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500
}

export interface HttpErrorOptions {
  status?: HttpStatus;
  code?: string;
  details?: unknown;
}

export class HttpError extends Error {
  status: HttpStatus;
  code?: string;
  details?: unknown;

  constructor(message: string, options: HttpErrorOptions = {}) {
    super(message);
    this.name = 'HttpError';
    this.status = options.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
    this.code = options.code;
    this.details = options.details;
  }
}

export function createResponse<T>(data: T | undefined, init?: ResponseInit): Response {
  const status = init?.status ?? HttpStatus.OK;
  const headers = new Headers(init?.headers ?? {});

  if (status === HttpStatus.NO_CONTENT) {
    headers.delete('Content-Type');
    return new Response(null, {
      ...init,
      status,
      headers
    });
  }

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return new Response(JSON.stringify(data), {
    ...init,
    status,
    headers
  });
}

export function createErrorResponse(error: unknown): Response {
  if (error instanceof HttpError) {
    return createResponse(
      {
        error: {
          message: error.message,
          code: error.code,
          details: error.details
        }
      },
      {
        status: error.status
      }
    );
  }

  console.error('[next-blog-cms] Erro interno na API:', error);

  return createResponse(
    {
      error: {
        message: 'Erro interno do servidor'
      }
    },
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR
    }
  );
}

export function requireMethod(request: Request, methods: string[]) {
  if (!methods.includes(request.method.toUpperCase())) {
    throw new HttpError('Method not allowed', {
      status: HttpStatus.METHOD_NOT_ALLOWED
    });
  }
}

