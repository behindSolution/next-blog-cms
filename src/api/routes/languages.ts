import { languageQueries } from '../../db/queries';
import type { HandlerResult, RequestContext } from '../types';
import { HttpError, HttpStatus } from '../../lib/http';
import { upsertLanguageSchema, updateLanguageSchema } from '../../lib/validation';

export async function handleLanguagesRoute(
  req: RequestContext['request'],
  ctx: RequestContext
): Promise<HandlerResult> {
  const isAdmin = req.segments[0] === 'admin';
  const segments = isAdmin ? req.segments.slice(1) : req.segments;

  if (segments.length === 1) {
    if (req.method === 'GET') {
      return handleListLanguages();
    }

    if (isAdmin && req.method === 'POST') {
      ensureAdmin(ctx);
      return handleCreateLanguage(req);
    }
  }

  if (segments.length === 2 && isAdmin) {
    const code = segments[1];

    if (req.method === 'PUT') {
      ensureAdmin(ctx);
      return handleUpdateLanguage(code, req);
    }

    if (req.method === 'DELETE') {
      ensureAdmin(ctx);
      return handleDeleteLanguage(code);
    }
  }

  throw new HttpError('Route not found', { status: HttpStatus.NOT_FOUND });
}

function handleListLanguages(): HandlerResult {
  const languages = languageQueries.listLanguages();

  return {
    status: HttpStatus.OK,
    data: {
      languages
    }
  };
}

function handleCreateLanguage(req: RequestContext['request']): HandlerResult {
  const parsed = upsertLanguageSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError('Invalid data', {
      status: HttpStatus.BAD_REQUEST,
      details: parsed.error.flatten()
    });
  }

  const language = languageQueries.upsertLanguage(parsed.data);

  return {
    status: HttpStatus.CREATED,
    data: {
      language
    }
  };
}

function handleUpdateLanguage(code: string, req: RequestContext['request']): HandlerResult {
  const parsed = updateLanguageSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError('Invalid data', {
      status: HttpStatus.BAD_REQUEST,
      details: parsed.error.flatten()
    });
  }

  const current = languageQueries.getLanguage(code);
  if (!current) {
    throw new HttpError('Language not found', { status: HttpStatus.NOT_FOUND });
  }

  const nextEnabled = parsed.data.enabled ?? current.enabled;
  const nextDefault = parsed.data.isDefault ?? current.isDefault;

  if (current.isDefault && !nextDefault) {
    throw new HttpError('Set another language as default before changing this one', {
      status: HttpStatus.CONFLICT
    });
  }

  if (nextDefault && !nextEnabled) {
    throw new HttpError('The default language must be enabled', {
      status: HttpStatus.CONFLICT
    });
  }

  if (!nextEnabled) {
    const enabledLanguages = languageQueries
      .listLanguages()
      .filter((language) => language.enabled && language.code !== code);

    if (enabledLanguages.length === 0) {
      throw new HttpError('At least one language must remain enabled', {
        status: HttpStatus.CONFLICT
      });
    }
  }

  const language = languageQueries.upsertLanguage({
    code,
    name: parsed.data.name ?? current.name,
    enabled: nextEnabled,
    isDefault: nextDefault
  });

  return {
    status: HttpStatus.OK,
    data: {
      language
    }
  };
}

function handleDeleteLanguage(code: string): HandlerResult {
  const language = languageQueries.getLanguage(code);
  if (!language) {
    throw new HttpError('Language not found', { status: HttpStatus.NOT_FOUND });
  }

  if (language.isDefault) {
    throw new HttpError('Cannot remove the default language', {
      status: HttpStatus.CONFLICT
    });
  }

  const enabledLanguages = languageQueries.listLanguages().filter((lang) => lang.enabled);
  if (enabledLanguages.length <= 1) {
    throw new HttpError('At least one language must remain enabled', {
      status: HttpStatus.CONFLICT
    });
  }

  languageQueries.deleteLanguage(code);

  return {
    status: HttpStatus.NO_CONTENT
  };
}

function ensureAdmin(ctx: RequestContext) {
  if (!ctx.user || ctx.user.role !== 'admin') {
    throw new HttpError('Permission denied', { status: HttpStatus.FORBIDDEN });
  }
}

