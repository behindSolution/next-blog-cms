'use strict';

var fs = require('fs');
var path = require('path');
var module$1 = require('module');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var fs__default = /*#__PURE__*/_interopDefault(fs);
var path__default = /*#__PURE__*/_interopDefault(path);

// src/config/index.ts
var defaultBlogConfig = {
  database: { path: "./blog.db" },
  languages: { default: "en", available: ["en", "pt"] },
  auth: { jwtSecret: process.env.BLOG_JWT_SECRET ?? "change-me", sessionDuration: 7 },
  theme: { primaryColor: "#3b82f6" },
  ai: {}
};
var cachedConfig = null;
var configFilePath = null;
var configFileTimestamp = null;
var requireFromPath = (filePath) => {
  try {
    const require2 = module$1.createRequire((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.cjs', document.baseURI).href)));
    return require2(filePath);
  } catch (error) {
    if (filePath.endsWith(".cjs")) {
      const code = fs__default.default.readFileSync(filePath, "utf8");
      const module = { exports: {} };
      const func = new Function("module", "exports", "require", code);
      func(module, module.exports, module$1.createRequire(filePath));
      return module.exports;
    }
    throw error;
  }
};
function getBlogConfig() {
  if (cachedConfig && configFilePath && configFileTimestamp) {
    try {
      const currentTimestamp = fs__default.default.statSync(configFilePath).mtimeMs;
      if (currentTimestamp === configFileTimestamp) {
        return cachedConfig;
      }
      console.log("[next-blog-cms] Config file changed, reloading...");
      cachedConfig = null;
    } catch {
      cachedConfig = null;
    }
  }
  const userConfig = loadUserConfig();
  cachedConfig = mergeConfig(defaultBlogConfig, userConfig);
  return cachedConfig;
}
function loadUserConfig() {
  const cwd = process.cwd();
  const candidates = ["blog.config.js", "blog.config.cjs", "blog.config.json"];
  for (const candidate of candidates) {
    const filePath = path__default.default.resolve(cwd, candidate);
    if (!fs__default.default.existsSync(filePath)) {
      continue;
    }
    try {
      if (filePath.endsWith(".json")) {
        const raw = fs__default.default.readFileSync(filePath, "utf8");
        configFilePath = filePath;
        configFileTimestamp = fs__default.default.statSync(filePath).mtimeMs;
        return JSON.parse(raw);
      }
      if (filePath.endsWith(".cjs") || filePath.endsWith(".js")) {
        const loaded = requireFromPath(filePath);
        configFilePath = filePath;
        configFileTimestamp = fs__default.default.statSync(filePath).mtimeMs;
        if (loaded && typeof loaded === "object") {
          console.log("[next-blog-cms] Successfully loaded config from", candidate);
          return loaded.default ?? loaded;
        }
      }
    } catch (error) {
      console.warn(`[next-blog-cms] Unable to load ${candidate}:`, error);
    }
  }
  console.warn("[next-blog-cms] No config file found, using defaults");
  return void 0;
}
function mergeConfig(defaults, overrides) {
  const merged = {
    database: {
      ...defaults.database,
      ...overrides?.database ?? {}
    },
    languages: {
      default: overrides?.languages?.default ?? defaults.languages.default,
      available: overrides?.languages?.available ?? defaults.languages.available
    },
    auth: {
      jwtSecret: overrides?.auth?.jwtSecret ?? defaults.auth.jwtSecret,
      sessionDuration: overrides?.auth?.sessionDuration ?? defaults.auth.sessionDuration
    },
    theme: {
      ...defaults.theme,
      ...overrides?.theme ?? {}
    },
    ai: {
      translator: overrides?.ai?.translator ?? defaults.ai.translator
    }
  };
  if (!merged.languages.available.includes(merged.languages.default)) {
    merged.languages.available = [
      merged.languages.default,
      ...merged.languages.available
    ];
  }
  merged.languages.available = Array.from(
    new Set(merged.languages.available.map((code) => code.trim()).filter(Boolean))
  );
  return merged;
}

exports.defaultBlogConfig = defaultBlogConfig;
exports.getBlogConfig = getBlogConfig;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map