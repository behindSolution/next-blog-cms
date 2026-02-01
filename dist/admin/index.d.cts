import * as react_jsx_runtime from 'react/jsx-runtime';

interface AdminBranding {
    title?: string;
    tagline?: string;
}
interface AdminAppProps {
    branding?: AdminBranding;
}

type TranslateParams = Record<string, string | number>;
type TranslateFn = (key: string, defaultMessage: string, params?: TranslateParams) => string;

interface BlogAdminProps {
    locale?: string;
    messages?: Record<string, string>;
    translate?: TranslateFn;
    branding?: AdminAppProps['branding'];
}
declare const BlogAdmin: ({ locale, messages, translate, branding }: BlogAdminProps) => react_jsx_runtime.JSX.Element;
declare const BlogAdminPage: (props: BlogAdminProps) => react_jsx_runtime.JSX.Element;

export { BlogAdmin, BlogAdminPage, type BlogAdminProps, type TranslateFn, type TranslateParams, BlogAdmin as default };
