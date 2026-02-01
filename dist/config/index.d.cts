interface BlogDatabaseConfig {
    path?: string;
}
interface BlogLanguagesConfig {
    default: string;
    available: string[];
}
interface BlogAuthConfig {
    jwtSecret: string;
    sessionDuration?: number;
}
interface BlogThemeConfig {
    primaryColor?: string;
}
interface BlogAiTranslatorOpenAIConfig {
    provider: 'openai';
    apiKey?: string;
    model?: string;
    baseUrl?: string;
}
interface BlogAiConfig {
    translator?: BlogAiTranslatorOpenAIConfig;
}
interface BlogConfig {
    database?: BlogDatabaseConfig;
    languages?: BlogLanguagesConfig;
    auth?: BlogAuthConfig;
    theme?: BlogThemeConfig;
    ai?: BlogAiConfig;
}
declare const defaultBlogConfig: Required<BlogConfig>;
declare function getBlogConfig(): Required<BlogConfig>;

export { type BlogAiConfig, type BlogAiTranslatorOpenAIConfig, type BlogAuthConfig, type BlogConfig, type BlogDatabaseConfig, type BlogLanguagesConfig, type BlogThemeConfig, defaultBlogConfig, getBlogConfig };
